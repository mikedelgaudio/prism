import dotenv from "dotenv";
import admin, { type ServiceAccount } from "firebase-admin";

dotenv.config();

const serviceAccount: ServiceAccount = JSON.parse(
  process.env?.FIREBASE_ADMIN_CREDENTIALS ?? "{}",
);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  // eslint-disable-next-line no-console
  console.log("[FIREBASE] Successful connection.");
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(
    "[FIREBASE] Error - Failed to connect to Firebase. Check env keys.",
  );
}

export { admin };
