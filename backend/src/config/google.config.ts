import dotenv from "dotenv";
import type { GoogleAuth } from "google-auth-library";
import { google, type sheets_v4 } from "googleapis";

let googleAuthClient: GoogleAuth | null = null;
let googleSheetClient: sheets_v4.Sheets | null = null;
const GOOGLE_SHEET_NAME = "Testing";

const googleConfig = async (): Promise<any> => {
  try {
    dotenv.config();

    // Create auth object for Google
    const serviceAccount = JSON.parse(
      process.env?.GOOGLE_APP_CREDENTIALS ?? "",
    );

    googleAuthClient = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await googleAuthClient.getClient();

    // Instance of Google Sheets API
    googleSheetClient = google.sheets({ version: "v4", auth: client });

    console.info("[GOOGLE SHEET API] Successful connection.");
  } catch (e) {
    console.info(
      "[GOOGLE SHEET API] Error - Failed to connect to Google Sheet API. Check env keys.",
    );
  }
};

export { googleConfig, googleSheetClient, googleAuthClient, GOOGLE_SHEET_NAME };
