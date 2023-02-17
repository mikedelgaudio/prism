import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Unsubscribe,
} from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import {
  Task,
  UploadSnapshot,
  UserProfile,
} from "../../firebase/firebase.models";
import { errorToMsg, ERROR_USER_IS_NULL } from "../../services/errors.service";
import {
  db,
  FIREBASE_TASKS_COLLECTION,
  FIREBASE_UPLOADS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
} from "../../services/firebase.service";
import { TOAST_SERVICE } from "../../services/toast.service";

export class DashboardStore {
  public profile: UserProfile | undefined;
  public tasks: Task[] = [];
  public assignedTasksData: Task[] = [];

  public calcState = "idle";
  public profileState = "idle";

  public unsubscribe: Unsubscribe | undefined = undefined;

  private dayLabels: string[] = [];

  public uploads: UploadSnapshot[] = [];

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
      const usersTasks = await getDocs(this.tasksRef);
      const snap = docSnap.data() as UserProfile;
      runInAction(() => {
        this.tasks = [];
        usersTasks.docs.forEach(task => {
          this.tasks.push(task.data() as Task);
        });
        this.assignedTasksData = this.tasks.filter(task => task.side !== null);
        this.profile = snap;
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_LOAD_ACCOUNT_SETTINGS";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  async getUploads() {
    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      if (!this.uploadsRef) return;
      const q = query(this.uploadsRef);
      this.unsubscribe = onSnapshot(q, querySnapshot => {
        runInAction(() => {
          // TODO
          // Can this be more efficient?
          this.uploads = [];
          querySnapshot.forEach(doc => {
            this.uploads.push(doc.data());
          });
        });
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_LOAD_ACCOUNT_SETTINGS";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  get assignedTasks() {
    return this.assignedTasksData;
  }
}
