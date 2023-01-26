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
    return this.profile?.sides;
  }

  get assignedTasks() {
    return this.tasks?.filter(task => task.side !== null);
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks?.find(task => task.id === id);
  }

  clearProfile() {
    this.profile = undefined;
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

  async editTaskName(id: string | undefined, newName: string | undefined) {
    if (!id || !newName || !this.profile?.sides || !this.tasks) return;

    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const docRef = doc(db, FIREBASE_USERS_COLLECTION, userId);
      let index = 0;
      const updatedTasks = this.tasks.map((task, i) => {
        if (task.id === id) {
          index = i;
          task.name = newName;
        }
        return task;
      });

      await updateDoc(docRef, {
        sides: updatedTasks,
      });

      runInAction(() => {
        if (!this.profile?.sides) return;
        this.profile.sides[index].name = newName;
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_EDIT_TASK";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
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

  async assignTask(fromId: string | undefined, toId: string | undefined) {
    if (!fromId || !toId) return;
    if (fromId === toId) return;
    try {
      const toTask = this.getTaskById(toId);
      const fromTask = this.getTaskById(fromId);

      if (!toTask || !fromTask) throw new Error();

      runInAction(() => {
        const prev = { ...fromTask };
        const next = { ...toTask };

        fromTask.id = next.id;
        fromTask.name = next.name;
        fromTask.color = prev.color;
        toTask.id = prev.id;
        toTask.name = prev.name;
        toTask.color = next.color;
      });

      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const docRef = doc(db, FIREBASE_USERS_COLLECTION, userId);
      await updateDoc(docRef, {
        sides: this.tasks,
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_ASSIGN_TASK";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  async disconnectPrism() {
    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const docRef = doc(db, FIREBASE_USERS_COLLECTION, userId);
      await updateDoc(docRef, {
        prismId: "",
      });

      runInAction(() => {
        if (!this.profile?.prismId) return;
        this.profile.prismId = "";
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_ASSIGN_TASK";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }
}
