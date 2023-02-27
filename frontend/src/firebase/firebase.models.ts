import { FieldValue, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  side: string | null;
  id: string;
  name: string;
  timestamp: FieldValue;
}

export interface DailyUploadSide {
  hour: number;
  minutes: number;
}

export interface DailyUpload {
  title: string;
  createdOn: string;
  lastUpload: string;
  totalTrackedMinutes: number;
  side1Minutes: number;
  side2Minutes: number;
  side3Minutes: number;
  side4Minutes: number;
  side5Minutes: number;
}

export interface WeeklyUploadSide {
  dayOfWeek: string;
  minutes: number;
}

export interface WeeklyUpload {
  weekNumber: number;
  startDate: string;
  endDate: string;
  minutesCombined: number;
  minutesSide1LastWeek: number;
  minutesSide2LastWeek: number;
  minutesSide3LastWeek: number;
  minutesSide4LastWeek: number;
  minutesSide5LastWeek: number;
  minutesSide1ThisWeek: number;
  minutesSide2ThisWeek: number;
  minutesSide3ThisWeek: number;
  minutesSide4ThisWeek: number;
  minutesSide5ThisWeek: number;
}

export interface WeeklyUploadResponse {
  status: string;
  data: WeeklyUpload[];
}

export interface UserProfile {
  prismId: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  prismId: "N/A",
};

export const DEFAULT_PROFILE_TASKS: Task[] = [
  {
    id: uuidv4(),
    side: "1",
    name: "Task A",
    timestamp: serverTimestamp(),
  },
  {
    id: uuidv4(),
    side: "2",
    name: "Task B",
    timestamp: serverTimestamp(),
  },
  {
    id: uuidv4(),
    side: "3",
    name: "Task C",
    timestamp: serverTimestamp(),
  },
  {
    id: uuidv4(),
    side: "4",
    name: "Task D",
    timestamp: serverTimestamp(),
  },
  {
    id: uuidv4(),
    side: "5",
    name: "Task E",
    timestamp: serverTimestamp(),
  },
];
