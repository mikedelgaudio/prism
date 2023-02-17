import { FieldValue, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  side: string | null;
  id: string;
  name: string;
  timestamp: FieldValue;
}

export interface UploadSnapshot {
  title: string;
  lastUpload: string;
  createdOn: string;
}

export interface UserProfile {
  prismId: string;
  progressEmail: boolean;
  timeToStand: boolean;
}

export const DEFAULT_PROFILE: UserProfile = {
  prismId: "N/A",
  progressEmail: false,
  timeToStand: false,
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
