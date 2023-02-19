import type { DailyUpload } from "./upload";

interface SideProfile {
  minutes: number;
}

interface SideHours {
  0: SideProfile;
  1: SideProfile;
  2: SideProfile;
  3: SideProfile;
  4: SideProfile;
  5: SideProfile;
  6: SideProfile;
  7: SideProfile;
  8: SideProfile;
  9: SideProfile;
  10: SideProfile;
  11: SideProfile;
  12: SideProfile;
  13: SideProfile;
  14: SideProfile;
  15: SideProfile;
  16: SideProfile;
  17: SideProfile;
  18: SideProfile;
  19: SideProfile;
  20: SideProfile;
  21: SideProfile;
  22: SideProfile;
  23: SideProfile;
}

interface Day {
  metadata: DailyUpload;
  side1: SideHours;
  side2: SideHours;
  side3: SideHours;
  side4: SideHours;
  side5: SideHours;
}

interface Days {
  uploadedToday: boolean;
  days: Day[];
}

export type { Days, Day, SideHours, SideProfile };
