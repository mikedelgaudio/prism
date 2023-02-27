import { FieldValue } from "firebase-admin/firestore";
import {
  db,
  FIREBASE_UPLOADS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
  FIREBASE_WEEKS_COLLECTION,
  type admin,
} from "../config/firebase.config";
import type { DailyUpload, WeeklyUpload } from "../models/upload";
import {
  getDayOfWeekByNum,
  getEndDateOfWeek,
  getStartDateOfWeek,
} from "../util/util.date";

const weeksColRef = (
  uid: string,
): admin.firestore.CollectionReference<admin.firestore.DocumentData> => {
  return db.collection(
    `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_WEEKS_COLLECTION}`,
  );
};

const getDayOfWeek = (date?: string): number => {
  let d;
  if (date) d = new Date(date);
  else d = new Date();
  return d.getDay();
};

const toWeekKey = (weekNumber: number): string => {
  const year = new Date().getFullYear();
  return `week_${weekNumber}_${year}`;
};

const getWeekNumber = (date?: string): number => {
  let currentDate = new Date();
  if (date) currentDate = new Date(date);
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
  );
  const weekNumber = Math.ceil(days / 7);
  return weekNumber;
};

const getDailyUploads = async (uid: string): Promise<DailyUpload[]> => {
  const uploadsColRef = db.collection(
    `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_UPLOADS_COLLECTION}`,
  );
  const uploadsResponse = await uploadsColRef.get();
  return uploadsResponse.docs.map(doc => doc.data()) as DailyUpload[];
};

const getWeeklyUploads = async (uid: string): Promise<WeeklyUpload[]> => {
  const uploadsColRef = db.collection(
    `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_WEEKS_COLLECTION}`,
  );

  const uploadsResponse = await uploadsColRef.orderBy("endDate", "asc").get();
  return uploadsResponse.docs.map(doc => doc.data()) as WeeklyUpload[];
};

const computeWeeks = async (uid: string): Promise<any> => {
  const uploads = await getDailyUploads(uid);

  // TODO
  // Exceptions will not be caught due to closure
  for (const upload of uploads) {
    const weekNumberForUpload = getWeekNumber(upload.title);
    const year = new Date(upload.title).getFullYear();
    const key = toWeekKey(weekNumberForUpload);
    const weekRef = weeksColRef(uid);
    const doc = await weekRef.doc(key).get();
    const uploadDayOfWeek = getDayOfWeek(upload.title);
    const batch = db.batch();

    if (!doc.exists) {
      const weekEntry: WeeklyUpload = {
        weekNumber: weekNumberForUpload,
        startDate: getStartDateOfWeek(weekNumberForUpload, year),
        endDate: getEndDateOfWeek(weekNumberForUpload, year),
        minutesCombined: FieldValue.increment(upload.totalTrackedMinutes),
        side1Minutes: FieldValue.increment(0),
        side2Minutes: FieldValue.increment(0),
        side3Minutes: FieldValue.increment(0),
        side4Minutes: FieldValue.increment(0),
        side5Minutes: FieldValue.increment(0),
        uploaded: new Date().toISOString(),
      };
      batch.set(weekRef.doc(key), weekEntry);

      const keys = {
        side1Minutes: 0,
        side2Minutes: 0,
        side3Minutes: 0,
        side4Minutes: 0,
        side5Minutes: 0,
      };

      // Create docs for sides and days
      for (let i = 1; i <= 5; i++) {
        const sideRef = db.collection(
          `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_WEEKS_COLLECTION}/${key}/side${i}`,
        );

        const sideKey = `side${i}Minutes`;

        keys[sideKey as keyof typeof keys] =
          +upload[sideKey as keyof DailyUpload];

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          // Get the minutes for the side
          let minutes = 0;

          if (dayOfWeek === uploadDayOfWeek) {
            minutes = +upload[sideKey as keyof DailyUpload];
          }

          const dayOfWeekName = getDayOfWeekByNum(dayOfWeek);

          batch.set(sideRef.doc(dayOfWeekName), {
            day: dayOfWeekName,
            minutes,
          });
        }
      }

      batch.update(weekRef.doc(key), {
        ...keys,
      });

      await batch.commit();
    } else {
      // Calculate the new values
      console.info(key, "Doc did exist");

      const data = doc.data();
      if (data?.minutesCombined === upload.totalTrackedMinutes) {
        console.info("IS EQUAL");
        continue;
      }

      console.info(
        `Week ${weekNumberForUpload}`,
        data?.minutesCombined,
        upload.totalTrackedMinutes,
        "DID NOT HIT",
      );

      const keys = {
        side1Minutes: 0,
        side2Minutes: 0,
        side3Minutes: 0,
        side4Minutes: 0,
        side5Minutes: 0,
      };

      for (let i = 1; i <= 5; i++) {
        const sideRef = db.collection(
          `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_WEEKS_COLLECTION}/${key}/side${i}`,
        );

        const sideKey = `side${i}Minutes`;

        keys[sideKey as keyof typeof keys] =
          +upload[sideKey as keyof DailyUpload];

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          // Get the minutes for the side
          let minutes = 0;

          if (dayOfWeek === uploadDayOfWeek) {
            minutes = +upload[sideKey as keyof DailyUpload];
          }

          const dayOfWeekName = getDayOfWeekByNum(dayOfWeek);

          batch.update(sideRef.doc(dayOfWeekName), {
            minutes,
          });
        }
      }

      // TODO
      // Determine sum of all minutes
      batch.update(weekRef.doc(key), {
        ...keys,
      });

      await batch.commit();
    }
  }

  return { status: "OK" };
};

export { computeWeeks, getWeeklyUploads };
