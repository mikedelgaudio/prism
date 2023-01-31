import { v4 as uuidv4 } from "uuid";

export interface Task {
  side: string | null;
  id: string;
  name: string;
  color: string;
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
    color: "#ff0000",
  },
  {
    id: uuidv4(),
    side: "2",
    name: "Task B",
    color: "#0002fe",
  },
  {
    id: uuidv4(),
    side: "3",
    name: "Task C",
    color: "#03480e",
  },
  {
    id: uuidv4(),
    side: "4",
    name: "Task D",
    color: "#ca6e04",
  },
  {
    id: uuidv4(),
    side: "5",
    name: "Task E",
    color: "#9808fe",
  },
];
