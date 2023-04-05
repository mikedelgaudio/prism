import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import {
  DailyUpload,
  DailyUploadSide,
  Task,
  UserProfile,
  WeeklyUpload,
} from "../../firebase/firebase.models";
import { ERROR_USER_IS_NULL, errorToMsg } from "../../services/errors.service";
import {
  db,
  FIREBASE_TASKS_COLLECTION,
  FIREBASE_UPLOADS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
} from "../../services/firebase.service";
import { TOAST_SERVICE } from "../../services/toast.service";
import { convertToQueryTimestamp } from "../../services/util.service";

export class DashboardStore {
  public profile: UserProfile | undefined;
  public tasks: Task[] = [];

  public weeks: WeeklyUpload[] = [];

  public calcState = "idle";
  public profileState = "idle";

  public unsubscribe: Unsubscribe | undefined = undefined;

  private dayLabels: string[] = [];
  public uploads: DailyUpload[] = [];

  constructor() {
    makeAutoObservable(this);

    // Load in day labels
    for (let i = 0; i < 24; i++) {
      const suffix = i < 12 ? "am" : "pm";
      const prefix = i < 12 ? i : i - 12;
      if (prefix === 0) this.dayLabels.push(`12${suffix}`);
      else this.dayLabels.push(`${prefix}${suffix}`);
    }
  }

  get dayLabelList(): string[] {
    return this.dayLabels;
  }

  get docRef() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    return doc(db, FIREBASE_USERS_COLLECTION, userId);
  }

  get tasksRef() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    return collection(
      db,
      `${FIREBASE_USERS_COLLECTION}/${userId}/${FIREBASE_TASKS_COLLECTION}`,
    );
  }

  get uploadsRef() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    return collection(
      db,
      `${FIREBASE_USERS_COLLECTION}/${userId}/${FIREBASE_UPLOADS_COLLECTION}`,
    );
  }

  private getSideRef(timestamp: string) {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const queryTimestamp = convertToQueryTimestamp(timestamp);
    const s1Ref = collection(
      db,
      `${FIREBASE_USERS_COLLECTION}/${userId}/${FIREBASE_UPLOADS_COLLECTION}/${queryTimestamp}/side1`,
    );
    const s2Ref = collection(
      db,
      `${FIREBASE_USERS_COLLECTION}/${userId}/${FIREBASE_UPLOADS_COLLECTION}/${queryTimestamp}/side2`,
    );
    const s3Ref = collection(
      db,
      `${FIREBASE_USERS_COLLECTION}/${userId}/${FIREBASE_UPLOADS_COLLECTION}/${queryTimestamp}/side3`,
    );
    const s4Ref = collection(
      db,
      `${FIREBASE_USERS_COLLECTION}/${userId}/${FIREBASE_UPLOADS_COLLECTION}/${queryTimestamp}/side4`,
    );
    const s5Ref = collection(
      db,
      `${FIREBASE_USERS_COLLECTION}/${userId}/${FIREBASE_UPLOADS_COLLECTION}/${queryTimestamp}/side5`,
    );

    return {
      side1Ref: s1Ref,
      side2Ref: s2Ref,
      side3Ref: s3Ref,
      side4Ref: s4Ref,
      side5Ref: s5Ref,
    };
  }

  async getProfile() {
    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const docRef = doc(db, FIREBASE_USERS_COLLECTION, userId);
      if (!docRef) return Promise.reject({ message: ERROR_USER_IS_NULL });

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists())
        return Promise.reject({ message: ERROR_USER_IS_NULL });

      if (!this.tasksRef) return;
      const q = query(this.tasksRef, orderBy("side", "asc"));
      const usersTasks = await getDocs(q);
      const snap = docSnap.data() as UserProfile;
      runInAction(() => {
        this.tasks = [];
        usersTasks.docs.forEach(task => {
          this.tasks.push(task.data() as Task);
        });
        this.profile = snap;
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_LOAD_ACCOUNT_SETTINGS";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  // TODO
  // Can this be in real time?
  async getSidesData(timestamp: string) {
    try {
      const refs = this.getSideRef(timestamp) ?? null;
      if (!refs) return;

      // If one of these fails it all fails....
      const results = await Promise.all([
        getDocs(query(refs.side1Ref, orderBy("hour", "asc"))),
        getDocs(query(refs.side2Ref, orderBy("hour", "asc"))),
        getDocs(query(refs.side3Ref, orderBy("hour", "asc"))),
        getDocs(query(refs.side4Ref, orderBy("hour", "asc"))),
        getDocs(query(refs.side5Ref, orderBy("hour", "asc"))),
      ]);

      const sideData = {
        side1: results[0].docs.map(doc => doc.data() as DailyUploadSide),
        side2: results[1].docs.map(doc => doc.data() as DailyUploadSide),
        side3: results[2].docs.map(doc => doc.data() as DailyUploadSide),
        side4: results[3].docs.map(doc => doc.data() as DailyUploadSide),
        side5: results[4].docs.map(doc => doc.data() as DailyUploadSide),
      };

      return sideData;
    } catch (e) {
      const TOAST_ID = "FAILED_TO_LOAD_SIDE_DATA";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  async getUploads() {
    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      if (!this.uploadsRef) return;

      const q = query(this.uploadsRef, orderBy("title", "desc"));
      this.unsubscribe = onSnapshot(q, querySnapshot => {
        runInAction(() => {
          // TODO
          // Can this be more efficient?
          this.uploads = [];
          querySnapshot.forEach(doc => {
            this.uploads.push(doc.data() as DailyUpload);
          });
        });
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_LOAD_UPLOADS";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  getUploadByDate(dateTitle: string) {
    return this.uploads.find(upload => {
      return upload.title === dateTitle;
    });
  }
}
