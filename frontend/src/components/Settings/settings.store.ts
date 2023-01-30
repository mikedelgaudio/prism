import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
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

  get tasks() {
    return this.profile?.sides;
  }

  get docRef() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    return doc(db, FIREBASE_USERS_COLLECTION, userId);
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
      const tasksInCollection = collection(db, `users/${userId}/tasks`);
      // const q = query(tasksInCollection, orderBy("createdAt"));
      const tasks = await getDocs(tasksInCollection);
      // console.log(tasksInCollection, q, tasks, tasks.docs);
      tasks.docs.forEach(task => {
        // console.log(task.data());
      });

      const snap = docSnap.data() as UserProfile;
      runInAction(() => {
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
  }

  async addTask() {
    const task: Task = {
      side: null,
      id: uuidv4(),
      name: "New Task",
      color: "#eee",
    };

    try {
      if (!this.docRef) throw new Error();
      await updateDoc(this.docRef, {
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
      if (!this.docRef) throw new Error();
      let index = 0;
      const updatedTasks = this.tasks.map((task, i) => {
        if (task.id === id) {
          index = i;
          task.name = newName;
        }
        return task;
      });

      await updateDoc(this.docRef, {
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
      if (!this.docRef) throw new Error();
      await updateDoc(this.docRef, {
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

      if (!this.docRef) throw new Error();
      await updateDoc(this.docRef, {
        sides: this.tasks,
      });
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
