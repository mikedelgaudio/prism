import type {
  CollectionReference,
  DocumentData,
} from "firebase-admin/firestore";
import {
  db,
  FIREBASE_TASKS_COLLECTION,
  FIREBASE_UPLOADS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
  FIREBASE_WEEKS_COLLECTION,
} from "../config/firebase.config";

function getUsersColRef(): CollectionReference<DocumentData> {
  return db.collection(`${FIREBASE_USERS_COLLECTION}`);
}

const getUploadsColRef = (uid: string): CollectionReference<DocumentData> => {
  return db.collection(
    `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_UPLOADS_COLLECTION}`,
  );
};

const getWeeksColRef = (uid: string): CollectionReference<DocumentData> => {
  return db.collection(
    `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_WEEKS_COLLECTION}`,
  );
};

function getTasksColRef(uid: string): CollectionReference<DocumentData> {
  return db.collection(
    `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_TASKS_COLLECTION}`,
  );
}

const toWeekKey = (weekNumber: string, year: string): string => {
  return `week_${weekNumber}_${year}`;
};

export {
  getUploadsColRef,
  getWeeksColRef,
  toWeekKey,
  getUsersColRef,
  getTasksColRef,
};
