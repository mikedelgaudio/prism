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
  modified: boolean;
}

interface WeeklyUpload {
  weekNumber: number;
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

export type { DailyUpload, WeeklyUpload };
