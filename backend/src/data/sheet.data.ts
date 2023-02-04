import { googleAuthClient, googleSheetClient } from "../config/google.config";

const computeSheet = async (): Promise<any> => {
  if (googleSheetClient === null || googleAuthClient === null) return;

  // const metaData = await googleSheetClient.spreadsheets.get({
  //   auth: googleAuthClient,
  //   spreadsheetId: process.env?.GOOGLE_SHEET_ID,
  // });

  const getRowsOfA = await googleSheetClient.spreadsheets.values.get({
    auth: googleAuthClient,
    spreadsheetId: process.env?.GOOGLE_SHEET_ID,
    range: "Sheet1!A2:A",
  });

  return { getRowsOfA };
};

export { computeSheet };
