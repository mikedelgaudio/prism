import {
  db,
  FIREBASE_UPLOADS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
  FIREBASE_WEEKS_COLLECTION,
} from "../config/firebase.config";
import type { DailyUpload, WeeklyUpload } from "../models/upload";
import {
  convertToDate,
  getDayOfWeekByDate,
  getDayOfWeekByNum,
  getEndDateOfWeek,
  getStartDateOfWeek,
  getWeekNumber,
} from "../util/util.date";
import { getWeeksColRef, toWeekKey } from "../util/util.firebase";
import { getUploadsColRef } from "./sheet.mvp.data";

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

const computeWeeks = async (uid: string): Promise<{ status: string }> => {
  const uploads = await getDailyUploads(uid);

  // TODO
  // Exceptions will not be caught due to closure
  for (const upload of uploads) {
    const weekRef = getWeeksColRef(uid);
    const weekNumberForUpload = getWeekNumber(upload.title);
    const key = toWeekKey(weekNumberForUpload);
    const doc = await weekRef.doc(key).get();
    const year = new Date(upload.title).getFullYear();
    const dayOfWeekIndex = getDayOfWeekByDate(upload.title);
    const batch = db.batch();

    if (!doc.exists) {
      // Week does NOT Exist

      const weekEntry: WeeklyUpload = {
        weekNumber: weekNumberForUpload,
        startDate: getStartDateOfWeek(weekNumberForUpload, year),
        endDate: getEndDateOfWeek(weekNumberForUpload, year),
        minutesCombined: upload.totalTrackedMinutes,
        side1Minutes: upload.side1Minutes,
        side2Minutes: upload.side2Minutes,
        side3Minutes: upload.side3Minutes,
        side4Minutes: upload.side4Minutes,
        side5Minutes: upload.side5Minutes,
        uploaded: new Date().toISOString(),
      };
      batch.set(weekRef.doc(key), weekEntry);

      // Create docs for sides and days
      for (let i = 1; i <= 5; i++) {
        const sideRef = db.collection(
          `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_WEEKS_COLLECTION}/${key}/side${i}`,
        );

        const sideKey = `side${i}Minutes`;

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          // Get the minutes for the side
          let minutes = 0;

          if (dayOfWeek === dayOfWeekIndex) {
            minutes = +upload[sideKey as keyof DailyUpload];
          }

          const dayOfWeekName = getDayOfWeekByNum(dayOfWeek);

          batch.set(sideRef.doc(dayOfWeekName), {
            day: dayOfWeekName,
            minutes,
          });
        }
      }

      // Toggle modified flag on DailyUpload
      const queryTimestamp = convertToDate(upload.title);
      const uploadRef = getUploadsColRef(uid).doc(queryTimestamp);
      batch.update(uploadRef, {
        modified: false,
      });
      await batch.commit();
    } else {
      // Week DOES Exist

      if (!upload.modified) continue;
      const data = doc.data() as WeeklyUpload;

      // TODO Turn into FieldValues?
      const keys = {
        minutesCombined: data.minutesCombined + upload.totalTrackedMinutes,
        side1Minutes: data.side1Minutes + upload.side1Minutes,
        side2Minutes: data.side2Minutes + upload.side2Minutes,
        side3Minutes: data.side3Minutes + upload.side3Minutes,
        side4Minutes: data.side4Minutes + upload.side4Minutes,
        side5Minutes: data.side5Minutes + upload.side5Minutes,
      };

      for (let i = 1; i <= 5; i++) {
        const sideRef = db.collection(
          `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_WEEKS_COLLECTION}/${key}/side${i}`,
        );
        const sideKey = `side${i}Minutes`;

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          // Get the minutes for the side
          let minutes = 0;

          if (dayOfWeek === dayOfWeekIndex) {
            minutes = +upload[sideKey as keyof DailyUpload];
          }

          const dayOfWeekName = getDayOfWeekByNum(dayOfWeek);

          batch.update(sideRef.doc(dayOfWeekName), {
            minutes,
          });
        }
      }

      batch.update(weekRef.doc(key), {
        ...keys,
      });

      // Toggle modified flag on DailyUpload
      const queryTimestamp = convertToDate(upload.title);
      const uploadRef = getUploadsColRef(uid).doc(queryTimestamp);
      batch.update(uploadRef, {
        modified: false,
      });
      await batch.commit();
    }
  }

  return { status: "OK" };
};

export { computeWeeks, getWeeklyUploads };
