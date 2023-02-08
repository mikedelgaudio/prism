import dotenv from "dotenv";
import admin, { type ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

const serviceAccount: ServiceAccount = JSON.parse(
  process.env?.FIREBASE_ADMIN_CREDENTIALS ?? "{}",
);

// Init App
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.info("[FIREBASE] Successful connection.");
} catch (e) {
  console.info(
    "[FIREBASE] Error - Failed to connect to Firebase. Check env keys.",
  );
}

// Firestore object
const db = getFirestore();

// Collection Names
const FIREBASE_USERS_COLLECTION = "users";
const FIREBASE_TASKS_COLLECTION = "tasks";
const FIREBASE_UPLOADS_COLLECTION = "uploads";

export {
  admin,
  db,
  FIREBASE_USERS_COLLECTION,
  FIREBASE_TASKS_COLLECTION,
  FIREBASE_UPLOADS_COLLECTION,
};
