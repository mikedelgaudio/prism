import {
  db,
  FIREBASE_USERS_COLLECTION,
  FIREBASE_WEEKS_COLLECTION,
} from "../../config/firebase.config";
import type { WeeklyUploadSide } from "../../models/upload";
import { toWeekKey } from "../../util/util.firebase";

const getWeeklySideData = async (
  uid: string,
  weekNumber: string,
  year: string,
  sideNumber: string,
): Promise<WeeklyUploadSide[]> => {
  const key = toWeekKey(weekNumber, year);

  const ref = db.collection(
    `${FIREBASE_USERS_COLLECTION}/${uid}/${FIREBASE_WEEKS_COLLECTION}/${key}/side${sideNumber}`,
  );

  const res = await ref.get();

  return res.docs.map(doc => doc.data()) as WeeklyUploadSide[];
};

export { getWeeklySideData };
