import type { FieldValue } from "firebase-admin/firestore";

export interface Task {
  side: string | null;
  id: string;
  name: string;
  timestamp: FieldValue;
}
