import { db } from "../../config/firebase.config";
import type { Task } from "../../models/tasks";
import { convertToDate } from "../../util/util.date";
import {
  getTasksColRef,
  getUploadsColRef,
  getUsersColRef,
} from "../../util/util.firebase";

/**
 * Bad smell?, when the user updates a task this endpoint is called to save the task to the current day
 * @param uid
 * @returns
 */
export async function saveToday(uid: string): Promise<{ status: number }> {
  const uploadsCollectionRef = getUploadsColRef(uid);
  const queryTimestamp = convertToDate(new Date());
  const uploadDoc = uploadsCollectionRef.doc(queryTimestamp);
  const upload = await uploadDoc.get();

  if (!upload.exists) return { status: 200 };

  const tasks = await getTasksColRef(uid).get();
  if (tasks.empty)
    throw new Error(`[ERROR] Failed to get tasks for user ${uid}`);

  const batch = db.batch();

  const taskNames = {
    side1Name: "",
    side2Name: "",
    side3Name: "",
    side4Name: "",
    side5Name: "",
  };

  for (let i = 0; i < tasks.docs.length; i++) {
    const task = tasks.docs[i].data() as Task;
    if (!task.side) continue;
    const taskKey = `side${task.side}Name`;
    taskNames[taskKey as keyof typeof taskNames] = task.name;
  }

  batch.update(uploadDoc, taskNames);
  await batch.commit();

  return { status: 201 };
}

async function saveTasks(): Promise<void> {
  try {
    const users = await getUsersColRef().get();
    if (users.empty) throw new Error("Failed to get users.");

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const queryTimestamp = convertToDate(yesterday);
    const batch = db.batch();

    if (!users.docs.length) return;

    for (let i = 0; i < users.docs.length; i++) {
      const user = users.docs[i];
      const uploadsCollectionRef = getUploadsColRef(user.id);

      // Determine if there is an entry for the previous day
      const uploadDoc = uploadsCollectionRef.doc(queryTimestamp);
      const upload = await uploadDoc.get();

      // If no entry, no work to do
      if (!upload.exists) continue;

      const tasks = await getTasksColRef(user.id).get();
      if (tasks.empty)
        throw new Error(`Failed to get tasks for user ${user.id}`);

      const taskNames = {
        side1Name: "",
        side2Name: "",
        side3Name: "",
        side4Name: "",
        side5Name: "",
      };

      for (let j = 0; j < tasks.docs.length; j++) {
        const task = tasks.docs[j].data() as Task;
        if (!task.side) continue;
        const taskKey = `side${task.side}Name`;
        taskNames[taskKey as keyof typeof taskNames] = task.name;
      }

      batch.update(uploadDoc, taskNames);
    }

    await batch.commit();
  } catch (e) {
    console.error(
      `[ERROR] Failed to run nightly task save. UTC TIME: ${new Date().toUTCString()}`,
      e,
    );
  }
}

export async function saveNightlyTasks(): Promise<void> {
  const schedule = await import("node-schedule");
  const rule = new schedule.RecurrenceRule();
  rule.tz = "EST";
  rule.hour = 0;
  rule.minute = 0;

  schedule.scheduleJob(rule, saveTasks);

  // Ensure shutdown of scheduled tasks when closing the server
  process.on("SIGINT", async () => {
    await schedule.gracefulShutdown();
    process.exit(0);
  });
}
