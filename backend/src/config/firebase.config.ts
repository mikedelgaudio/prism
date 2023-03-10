import dotenv from "dotenv";
import admin, { type ServiceAccount } from "firebase-admin";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let db: Firestore;

async function initFirebase(): Promise<void> {
  dotenv.config();

  const serviceAccount: ServiceAccount = JSON.parse(
    process.env?.FIREBASE_ADMIN_CREDENTIALS ?? "{}",
  );

  // Init App
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    db = getFirestore();

    console.info("[FIREBASE] Successful connection.");
  } catch (e) {
    console.info("[FIREBASE] Connection failed.", e);
  }
}

// Collection Names
const FIREBASE_USERS_COLLECTION = "users";
const FIREBASE_TASKS_COLLECTION = "tasks";
const FIREBASE_UPLOADS_COLLECTION = "uploads";
const FIREBASE_WEEKS_COLLECTION = "weeks";

export {
  initFirebase,
  admin,
  db,
  FIREBASE_USERS_COLLECTION,
  FIREBASE_TASKS_COLLECTION,
  FIREBASE_UPLOADS_COLLECTION,
  FIREBASE_WEEKS_COLLECTION,
};
