import {
  admin,
  db,
  FIREBASE_TASKS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
} from "../config/firebase.config";
import { googleAuthClient, googleSheetClient } from "../config/google.config";

const computeSheet = async (token: string): Promise<any> => {
  if (googleSheetClient === null || googleAuthClient === null) return;

  const { uid } = await admin.auth().verifyIdToken(token);
  const collectionRef = db.collection(
    `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_TASKS_COLLECTION}`,
  );

  const tasks = await collectionRef.orderBy("side", "asc").get();

  tasks.docs.forEach(task => {
    // This does nothing
    task.data();
  });

  // TODO
  // Check firebase for last uploaded index
  const firebaseLog = [
    {
      id: "123",
      lastUploadDate: "2023-01-26 22:05:05",
      indexInSheet: 88,
    },
  ];

  // const day12312 = {
  //   createdOn: "2023-01-25 22:05:05",
  //   calculated:
  // }

  const sheetName = "Sheet1";
  const defaultRange = "B2:B";
  const timestampRange =
    firebaseLog.length === 0
      ? defaultRange
      : `B${firebaseLog[0].indexInSheet}:B`;

  const fetchLatestTimestamps = await googleSheetClient.spreadsheets.values.get(
    {
      auth: googleAuthClient,
      spreadsheetId: process.env?.GOOGLE_SHEET_ID,
      dateTimeRenderOption: "FORMATTED_STRING",
      majorDimension: "COLUMNS",
      range: `${sheetName}!${timestampRange}`,
      valueRenderOption: "FORMATTED_VALUE",
    },
  );

  if (fetchLatestTimestamps.status !== 200)
    throw new Error("Failed to fetch google api");

  // After fetching, check if was a valid range
  if (fetchLatestTimestamps.data.values === undefined)
    throw new Error("Undefined range, no data found");

  // No data found could be a fresh load of cube
  if (fetchLatestTimestamps.data.values?.length === 0) return;

  // Validate index and timestamp match and data was not out of sync...?
  // if (
  //   fetchLatestTimestamps.data.values?.length > 1 &&
  //   firebaseLog.length > 0 &&
  //   fetchLatestTimestamps.data.values[firebaseLog[0].indexInSheet]
  // )

  return { fetchLatestTimestamps };
};

export { computeSheet };
