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
  sides: Task[];
}

export const DEFAULT_PROFILE: UserProfile = {
  prismId: "N/A",
  progressEmail: false,
  timeToStand: false,
  sides: [
    {
      side: "1",
      id: "1-t",
      name: "Task A",
      color: "#ff0000",
    },
    {
      side: "2",
      id: "2-t",
      name: "Task B",
      color: "#0002fe",
    },
    {
      side: "3",
      id: "3-t",
      name: "Task C",
      color: "#03480e",
    },
    {
      side: "4",
      id: "4-t",
      name: "Task D",
      color: "#ca6e04",
    },
    {
      side: "5",
      id: "5-t",
      name: "Task E",
      color: "#9808fe",
    },
  ],
};

export const DEFAULT_PROFILE_TASKS: Task[] = [
  {
    side: "1",
    id: "1-t",
    name: "Task A",
    color: "#ff0000",
  },
  {
    side: "2",
    id: "2-t",
    name: "Task B",
    color: "#0002fe",
  },
  {
    side: "3",
    id: "3-t",
    name: "Task C",
    color: "#03480e",
  },
  {
    side: "4",
    id: "4-t",
    name: "Task D",
    color: "#ca6e04",
  },
  {
    side: "5",
    id: "5-t",
    name: "Task E",
    color: "#9808fe",
  },
];
