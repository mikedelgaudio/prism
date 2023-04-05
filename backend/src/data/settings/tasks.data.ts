import { db } from "../../config/firebase.config";
import type { Task } from "../../models/tasks";
import { convertToDate } from "../../util/util.date";
import {
  getTasksColRef,
  getUploadsColRef,
  getUsersColRef,
} from "../../util/util.firebase";

async function saveTasks(): Promise<void> {
  const users = await getUsersColRef().get();
  if (users.empty) throw new Error("Failed to get users.");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const queryTimestamp = convertToDate(yesterday);
  const batch = db.batch();

  for (let i = 0; i < users.docs.length; i++) {
    const user = users.docs[i];
    const uploadsCollectionRef = getUploadsColRef(user.id);

    // Determine if there is an entry for the previous day
    const uploadDoc = uploadsCollectionRef.doc(queryTimestamp);
    const upload = await uploadDoc.get();

    // If no entry, no work to do
    if (!upload.exists) continue;

    const tasks = await getTasksColRef(user.id).get();
    if (tasks.empty) throw new Error(`Failed to get tasks for user ${user.id}`);

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
