interface DailyUpload {
  title: string;
  createdOn: string;
  lastUpload: string;
  totalTrackedMinutes: number;
  side1Minutes: number;
  side2Minutes: number;
  side3Minutes: number;
  side4Minutes: number;
  side5Minutes: number;
  side1Name: string;
  side2Name: string;
  side3Name: string;
  side4Name: string;
  side5Name: string;
  modified: boolean;
}

interface WeeklyUploadSide {
  dayOfWeekIndex: number;
  dayOfWeekName: string;
  minutes: number;
}

interface WeeklyUpload {
  weekNumber: number;
  year: number;
  startDate: string;
  endDate: string;
  minutesCombined: number;
  side1Minutes: number;
  side2Minutes: number;
  side3Minutes: number;
  side4Minutes: number;
  side5Minutes: number;
  uploaded: string;
}

export type { DailyUpload, WeeklyUpload, WeeklyUploadSide };
