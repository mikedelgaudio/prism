import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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

  addTask() {
    const task: Task = {
      side: null,
      id: uuidv4(),
      name: "New Task",
      color: "#eee",
    };

    // ! Arguably don't push to DB on blank entry?
    this.tasks?.unshift(task);
  }

  editTaskName(id: string | undefined, newName: string | undefined) {
    if (!id || !newName || !this.profile?.sides) return;
    // ! Do database change or error handling here
    const index = this.profile.sides.findIndex(task => task.id === id);
    this.profile.sides[index].name = newName;
  }

  deleteTask(id: string | undefined) {
    if (!id || !this.profile?.sides) return;
    // ! Do database change or error handling here
    if (this.getTaskById(id)?.side === null) {
      this.profile.sides = this.profile.sides.filter(task => task.id !== id);
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
