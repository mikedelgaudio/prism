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
