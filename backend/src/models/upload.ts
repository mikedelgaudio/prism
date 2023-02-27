import type { FieldValue } from "firebase-admin/firestore";

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
}

interface WeeklyUpload {
  weekNumber: number;
  startDate: string;
  endDate: string;
  minutesCombined: FieldValue;
  side1Minutes: FieldValue;
  side2Minutes: FieldValue;
  side3Minutes: FieldValue;
  side4Minutes: FieldValue;
  side5Minutes: FieldValue;
  uploaded: string;
}

export type { DailyUpload, WeeklyUpload };
