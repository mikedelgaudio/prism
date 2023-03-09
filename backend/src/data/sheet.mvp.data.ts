import { FieldValue } from "firebase-admin/firestore";
import type { GaxiosResponse } from "gaxios";
import type { sheets_v4 } from "googleapis";
import {
  db,
  FIREBASE_UPLOADS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
} from "../config/firebase.config";
import {
  googleAuthClient,
  googleSheetClient,
  GOOGLE_SHEET_NAME,
} from "../config/google.config";
import type { DailyUpload } from "../models/upload";
import { convertToDate, convertToHour } from "../util/util.date";
import { getUploadsColRef } from "../util/util.firebase";
import { convertSideName } from "../util/util.sides";

const computeSheetMVP = async (uid: string): Promise<{ status: string }> => {
  if (!googleSheetClient || !googleAuthClient)
    throw new Error("No sheet or auth client to make request");

  const ranges = [
    `${GOOGLE_SHEET_NAME}!A:A`,
    `${GOOGLE_SHEET_NAME}!B:B`,
    `${GOOGLE_SHEET_NAME}!C:C`,
  ];

  let fetchLatestTimestamps: null | GaxiosResponse<sheets_v4.Schema$BatchGetValuesResponse> =
    null;

  try {
    fetchLatestTimestamps =
      await googleSheetClient.spreadsheets.values.batchGet({
        auth: googleAuthClient,
        spreadsheetId: process.env?.GOOGLE_SHEET_ID,
        dateTimeRenderOption: "FORMATTED_STRING",
        majorDimension: "COLUMNS",
        ranges,
        valueRenderOption: "UNFORMATTED_VALUE",
      });
  } catch (e) {
    throw new Error("Failed to fetch data from sheet");
  }

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
    return { status: "NO_UPDATE" };

  const uploadsCollectionRef = getUploadsColRef(uid);

  for (
    let timestampIndex = 0;
    timestampIndex < timestampRange.length;
    timestampIndex++
  ) {
    // Convert to date string key
    const timestamp = timestampRange[timestampIndex];
    const queryTimestamp = convertToDate(timestamp);

    console.info(`Timestamp: ${timestamp}`);
    console.info(`Query Timestamp: ${queryTimestamp}`);

    // Search by date string key in firebase/firestore
    const docRef = await uploadsCollectionRef.doc(queryTimestamp).get();

    const batch = db.batch();
    const sideName = convertSideName(sideIdRange[timestampIndex]);
    const minutesTracked = minutesRange[timestampIndex];
    const hourTrackingStarted = convertToHour(timestamp);

    console.info(
      `Side name ${sideName} / Minutes tracked ${minutesTracked} / HourTrackingStarted ${hourTrackingStarted}`,
    );

    if (!docRef.exists) {
      // Create a new object in the collection
      const upload: DailyUpload = {
        title: timestamp,
        createdOn: new Date().toUTCString(),
        lastUpload: new Date().toUTCString(),
        totalTrackedMinutes: 0,
        side1Minutes: 0,
        side2Minutes: 0,
        side3Minutes: 0,
        side4Minutes: 0,
        side5Minutes: 0,
        modified: true,
      };

      batch.set(uploadsCollectionRef.doc(queryTimestamp), upload);

      console.info(`Writing... ${queryTimestamp} doc to DB...`);

      // Create collections for side1 through side 5
      for (let i = 1; i <= 5; i++) {
        const uploadsSidesRef = db.collection(
          `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_UPLOADS_COLLECTION}/${queryTimestamp}/side${i}`,
        );

        // For each collection create docs from 0 through 24 to represent hours
        for (let hour = 0; hour < 24; hour++) {
          let minutes = 0;
          if (sideName === `side${i}` && hourTrackingStarted === hour) {
            minutes = minutesTracked;
          }
          if (minutes !== 0)
            console.info(
              `At ${queryTimestamp} at hour ${hour.toString()} on side${i}, user now has ${minutes} minutes.`,
            );

          batch.set(uploadsSidesRef.doc(hour.toString()), {
            hour,
            minutes,
          });
        }
      }

      const sideMinutes = {
        side1: 0,
        side2: 0,
        side3: 0,
        side4: 0,
        side5: 0,
      };

      sideMinutes[sideName as keyof typeof sideMinutes] += minutesTracked;

      // Update total time
      batch.update(uploadsCollectionRef.doc(queryTimestamp), {
        totalTrackedMinutes: FieldValue.increment(minutesTracked),
        side1Minutes: FieldValue.increment(sideMinutes.side1),
        side2Minutes: FieldValue.increment(sideMinutes.side2),
        side3Minutes: FieldValue.increment(sideMinutes.side3),
        side4Minutes: FieldValue.increment(sideMinutes.side4),
        side5Minutes: FieldValue.increment(sideMinutes.side5),
      });
      await batch.commit();
    } else {
      // Calculate the new values and update and replace the object currently in firestore...

      // Side name in sheet is an invalid title
      if (sideName === "N/A") continue;

      // Reference to the firestore object of the sideName
      const uploadsSidesRef = db.collection(
        `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_UPLOADS_COLLECTION}/${queryTimestamp}/${sideName}`,
      );

      // For the side X, increase the minutes of the object for hour X
      batch.update(uploadsSidesRef.doc(hourTrackingStarted.toString()), {
        minutes: FieldValue.increment(minutesTracked),
      });

      const sideMinutes = {
        side1: 0,
        side2: 0,
        side3: 0,
        side4: 0,
        side5: 0,
      };

      sideMinutes[sideName as keyof typeof sideMinutes] += minutesTracked;

      batch.update(uploadsCollectionRef.doc(queryTimestamp), {
        totalTrackedMinutes: FieldValue.increment(minutesTracked),
        side1Minutes: FieldValue.increment(sideMinutes.side1),
        side2Minutes: FieldValue.increment(sideMinutes.side2),
        side3Minutes: FieldValue.increment(sideMinutes.side3),
        side4Minutes: FieldValue.increment(sideMinutes.side4),
        side5Minutes: FieldValue.increment(sideMinutes.side5),
        modified: true,
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

  try {
    // After processing data to Firestore, clear the sheet
    await googleSheetClient.spreadsheets.values.clear({
      auth: googleAuthClient,
      spreadsheetId: process.env?.GOOGLE_SHEET_ID,
      range: `${GOOGLE_SHEET_NAME}!A:C`,
    });
  } catch (e) {
    throw new Error("Failed to clear sheet");
  }

  return { status: "OK" };
};

export { computeSheetMVP, getUploadsColRef };
