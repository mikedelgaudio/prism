import { FieldValue } from "firebase-admin/firestore";
import {
  admin,
  db,
  FIREBASE_UPLOADS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
} from "../config/firebase.config";
import { googleAuthClient, googleSheetClient } from "../config/google.config";
import type { DailyUpload } from "../models/upload";
import { convertToDate, convertToHour } from "../util/util.date";
import { convertSideNameTemp } from "../util/util.sides";

// TODO
// Errors are not being caught, must protect
const computeSheetMVP = async (token: string): Promise<any> => {
  if (!googleSheetClient || !googleAuthClient) return;

  const ranges = ["A2:A", "B2:B", "C2:C"];
  const fetchLatestTimestamps =
    await googleSheetClient.spreadsheets.values.batchGet({
      auth: googleAuthClient,
      spreadsheetId: process.env?.GOOGLE_SHEET_ID,
      dateTimeRenderOption: "FORMATTED_STRING",
      majorDimension: "COLUMNS",
      ranges,
      valueRenderOption: "UNFORMATTED_VALUE",
    });

  if (fetchLatestTimestamps.status !== 200)
    throw new Error("Failed to fetch google api");

  // After fetching, check if was a valid range
  if (
    !fetchLatestTimestamps.data.valueRanges ||
    fetchLatestTimestamps.data.valueRanges.length !== 3
  )
    throw new Error("Undefined range, no data found");

  const sideIdRange: string[] =
    fetchLatestTimestamps.data.valueRanges[0]?.values?.[0] ?? [];
  const timestampRange: string[] =
    fetchLatestTimestamps.data.valueRanges[1]?.values?.[0] ?? [];
  const minutesRange: number[] =
    fetchLatestTimestamps.data.valueRanges[2]?.values?.[0] ?? [];

  if (!sideIdRange.length || !timestampRange.length || !minutesRange.length)
    throw new Error("One or more ranges empty");

  const { uid } = await admin.auth().verifyIdToken(token);
  const uploadsCollectionRef = db.collection(
    `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_UPLOADS_COLLECTION}`,
  );

  // For each timestamp
  timestampRange.forEach(async (timestamp: string, timestampIndex: number) => {
    // Convert to date string key
    const queryTimestamp = convertToDate(timestamp);

    // Search by date string key in firebase/firestore
    const docRef = await uploadsCollectionRef.doc(queryTimestamp).get();

    const batch = db.batch();
    const sideName = convertSideNameTemp(sideIdRange[timestampIndex]);
    const minutesTracked = minutesRange[timestampIndex];
    const hourTrackingStarted = convertToHour(timestamp);

    if (!docRef.exists) {
      // Create a new object in the collection
      const upload: DailyUpload = {
        title: timestamp,
        createdOn: new Date().toUTCString(),
        lastUpload: new Date().toUTCString(),
      };

      batch.set(uploadsCollectionRef.doc(queryTimestamp), upload);

      console.info(`Writing... ${queryTimestamp} doc to DB...`);

      // Create collections for side1 through side 5
      for (let i = 1; i <= 5; i++) {
        const uploadsSidesRef = db.collection(
          `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_UPLOADS_COLLECTION}/${queryTimestamp}/side${i}`,
        );
        // For each collection create docs from 0 through 24 to represent hours
        for (let hour = 0; hour < 25; hour++) {
          let minutes = 0;

          if (sideName === `side${i}` && hourTrackingStarted === hour) {
            minutes = minutesTracked;
          }

          if (minutes !== 0)
            console.info(
              `At ${queryTimestamp} at hour ${hour.toString()} on side${i}, user now has ${minutes} minutes.`,
            );

          batch.set(uploadsSidesRef.doc(hour.toString()), {
            minutes,
          });
        }
      }
      await batch.commit();
    } else {
      // Calculate the new values and update and replace the object currently in firestore...
      if (sideName === "N/A")
        throw new Error("Sheet has new names unrecognized");

      const d = docRef.data() as DailyUpload;
      if (new Date(d.lastUpload) < new Date(timestamp)) {
        const uploadsSidesRef = db.collection(
          `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_UPLOADS_COLLECTION}/${queryTimestamp}/${sideName}`,
        );
        batch.update(uploadsSidesRef.doc(hourTrackingStarted.toString()), {
          minutes: FieldValue.increment(minutesTracked),
        });

        const isEndOfList = timestampIndex === timestampRange.length - 1;
        if (isEndOfList) {
          const uploadsRef = db.collection(
            `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_UPLOADS_COLLECTION}`,
          );
          batch.update(uploadsRef.doc(queryTimestamp), {
            lastUpload: timestamp,
          });
        }
        await batch.commit();
      }
    }
  });

  return { status: "OK" };
};

export { computeSheetMVP };
