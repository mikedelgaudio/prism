import { getAuth } from "firebase/auth";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { Task, UserProfile } from "../../firebase/firebase.models";
import { errorToMsg, ERROR_USER_IS_NULL } from "../../services/errors.service";
import { db, FIREBASE_USERS_COLLECTION } from "../../services/firebase.service";
import { TOAST_SERVICE } from "../../services/toast.service";

export class SettingsStore {
  public profile: UserProfile | undefined;

  constructor() {
    makeAutoObservable(this);
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

      const snap = docSnap.data() as UserProfile;
      runInAction(() => {
        this.profile = snap;
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_LOAD_ACCOUNT_SETTINGS";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  get tasks() {
    // if (Array.isArray(this.profile?.sides)) {
    return this.profile?.sides;
    // }

    // ! Build logic to recover gracefully but notify the user?
    // const auth = getAuth();
    // const userId = auth.currentUser?.uid;
    // if (!userId) return;
    // const docRef = doc(db, FIREBASE_USERS_COLLECTION, userId);
    // Tasks pool/sides corrupted (reformat)
    // if (this.) this.tasks = [];
  }

  get assignedTasks() {
    return this.tasks?.filter(task => task.side !== null);
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks?.find(task => task.id === id);
  }

  async addTask() {
    const task: Task = {
      side: null,
      id: uuidv4(),
      name: "New Task",
      color: "#eee",
    };

    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const docRef = doc(db, FIREBASE_USERS_COLLECTION, userId);
      await updateDoc(docRef, {
        sides: arrayUnion(task),
      });

      runInAction(() => {
        this.profile?.sides?.unshift(task);
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_ADD_TASK";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  editTaskName(id: string | undefined, newName: string | undefined) {
    if (!id || !newName || !this.profile?.sides) return;
    // ! Do database change or error handling here
    const index = this.profile.sides.findIndex(task => task.id === id);
    this.profile.sides[index].name = newName;
  }

  async deleteTask(id: string | undefined) {
    if (!id || !this.tasks || !this.profile) return;
    if (this.getTaskById(id)?.side !== null) return;

    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const docRef = doc(db, FIREBASE_USERS_COLLECTION, userId);
      await updateDoc(docRef, {
        sides: this.tasks.filter(task => task.id !== id),
      });
      runInAction(() => {
        if (!this.profile?.sides || !this.tasks) return;
        this.profile.sides = this.tasks.filter(task => task.id !== id);
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_DELETE_TASK";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  assignTask(fromId: string | undefined, toId: string | undefined) {
    if (!fromId || !toId) return;

    const toTask = this.getTaskById(toId);
    const fromTask = this.getTaskById(fromId);

    if (!toTask || !fromTask) return;

    const prev = { ...fromTask };
    const next = { ...toTask };

    fromTask.id = next.id;
    fromTask.name = next.name;
    fromTask.color = prev.color;
    toTask.id = prev.id;
    toTask.name = prev.name;
    toTask.color = next.color;
  }
}
