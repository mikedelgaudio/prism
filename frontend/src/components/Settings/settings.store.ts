import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { Task, UserProfile } from "../../firebase/firebase.models";
import { errorToMsg, ERROR_USER_IS_NULL } from "../../services/errors.service";
import {
  db,
  FIREBASE_TASKS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
} from "../../services/firebase.service";
import { TOAST_SERVICE } from "../../services/toast.service";

export class SettingsStore {
  public profile: UserProfile | undefined;
  public tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
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

  get assignedTasks() {
    return this.tasks?.filter(task => task.side !== null);
  }

  async getProfile() {
    try {
      if (!this.docRef) return Promise.reject({ message: ERROR_USER_IS_NULL });
      const docSnap = await getDoc(this.docRef);

      if (!docSnap.exists())
        return Promise.reject({ message: ERROR_USER_IS_NULL });
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (!userId) return;
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

  getTaskById(id: string): Task | undefined {
    return this.tasks?.find(task => task.id === id);
  }

  clearProfile() {
    this.profile = undefined;
    this.tasks = [];
  }

  async addTask() {
    const task: Task = {
      side: null,
      id: uuidv4(),
      name: "New Task",
      timestamp: serverTimestamp(),
    };

    try {
      if (!this.tasksRef) throw new Error();
      const tasksCollectionRef = doc(this.tasksRef, task.id);
      await setDoc(tasksCollectionRef, task);
      runInAction(() => {
        this.tasks.push(task);
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_ADD_TASK";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  async editTaskName(id: string | undefined, newName: string | undefined) {
    if (!id || !newName || !this.tasks) return;

    try {
      if (!this.tasksRef) throw new Error();
      const tasksCollectionRef = doc(this.tasksRef, id);
      await updateDoc(tasksCollectionRef, {
        name: newName,
      });

      const index = this.tasks.findIndex(task => task.id === id);

      runInAction(() => {
        this.tasks[index].name = newName;
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_EDIT_TASK";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  async deleteTask(id: string | undefined) {
    if (!id || !this.tasks) return;
    if (this.getTaskById(id)?.side !== null) return;

    try {
      if (!this.tasksRef) throw new Error();
      await deleteDoc(doc(this.tasksRef, id));

      runInAction(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
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
        fromTask.side = prev.side;
        toTask.id = prev.id;
        toTask.name = prev.name;
        toTask.side = next.side;
      });

      if (!this.tasksRef) throw new Error();
      await setDoc(doc(this.tasksRef, fromTask.id), fromTask);
      await setDoc(doc(this.tasksRef, toTask.id), toTask);
    } catch (e) {
      const TOAST_ID = "FAILED_TO_ASSIGN_TASK";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  async disconnectPrism() {
    try {
      if (!this.docRef) throw new Error();
      await updateDoc(this.docRef, {
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

  async addPrismId(prismId: string) {
    try {
      if (!this.docRef) throw new Error();
      await updateDoc(this.docRef, {
        prismId: prismId,
      });

      runInAction(() => {
        if (this.profile?.prismId !== "" && !this.profile?.prismId) return;
        this.profile.prismId = prismId;
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_ADD_PRISM_ID";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }
}
