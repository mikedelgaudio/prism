import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { makeAutoObservable, runInAction } from "mobx";
import { Task, UserProfile } from "../../firebase/firebase.models";
import { errorToMsg, ERROR_USER_IS_NULL } from "../../services/errors.service";
import {
  db,
  FIREBASE_TASKS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
} from "../../services/firebase.service";
import { TOAST_SERVICE } from "../../services/toast.service";

export interface IRawUploadedSide {
  trackingStartTime: number;
  trackingEndTime: number;
}

export interface IRawUploadedDay {
  uploadDate: number;
  side1: IRawUploadedSide[];
  side2: IRawUploadedSide[];
  side3: IRawUploadedSide[];
  side4: IRawUploadedSide[];
  side5: IRawUploadedSide[];
  lastUploadDate: number;
}

export interface IDayChartBreakdown {
  title: string;
  date: string;
  side1: number[];
  side2: number[];
  side3: number[];
  side4: number[];
  side5: number[];
  lastUploadTime: string;
}

// Ideal data format

export class DashboardStore {
  // Such as translate date to "1/4/23"
  private readonly DATE_FORMAT = new Intl.DateTimeFormat("en-us", {
    dateStyle: "short",
  });

  public profile: UserProfile | undefined;
  public tasks: Task[] = [];

  private dayLabels: string[] = [];

  public raw_data: IRawUploadedDay[] = [
    {
      uploadDate: 1672885784803,
      side1: [
        {
          trackingStartTime: 1672885784803,
          trackingEndTime: 1672887451432,
        },
        {
          trackingStartTime: 1672885784803,
          trackingEndTime: 1672887451432,
        },
        {
          trackingStartTime: 1672885784803,
          trackingEndTime: 1672887451432,
        },
      ],
      side2: [],
      side3: [],
      side4: [],
      side5: [],
      lastUploadDate: 1670378682337,
    },
  ];

  public dayCharts: IDayChartBreakdown[] = [];

  public dayChartBreakdown: IDayChartBreakdown = {
    title: "N/A",
    date: this.DATE_FORMAT.format(new Date()),
    side1: new Array(24).fill(0),
    side2: new Array(24).fill(0),
    side3: new Array(24).fill(0),
    side4: new Array(24).fill(0),
    side5: new Array(24).fill(0),
    lastUploadTime: this.DATE_FORMAT.format(new Date()),
  };

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

  get rawData(): IRawUploadedDay[] {
    return this.raw_data;
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
        this.profile = snap;
      });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_LOAD_ACCOUNT_SETTINGS";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
  }

  get assignedTasks() {
    return this.tasks.filter(task => task.side !== null);
  }

  distributeTimeLoad(sideSlot: number[]) {
    // const side1Breakdown = new Array(24).fill(0);
    // const MINUTES_IN_HOUR = 60;

    // // Must guarantee that all data is associated with particular day
    // dashboardStore.rawData.map(upload => {
    //   upload.side1.map(record => {
    //     const day = new Date(record.trackingStartTime);
    //     const timeSpent = Math.ceil(
    //       (record.trackingEndTime - record.trackingStartTime) / 60000,
    //     );

    //     // Calculate total time spent during recorded side
    //     side1Breakdown[day.getHours()] += timeSpent;
    //   });
    // });

    const MINUTES_IN_HOUR = 60;
    for (let i = 0; i < sideSlot.length; i++) {
      const slot = sideSlot[i];
      if (sideSlot[i] > MINUTES_IN_HOUR) {
        const remainder =
          slot >= MINUTES_IN_HOUR
            ? Math.abs(slot - MINUTES_IN_HOUR)
            : slot % MINUTES_IN_HOUR;

        sideSlot[i] = 60;

        if (i + 1 < 24) sideSlot[i + 1] += remainder;
      }
    }
  }
}
