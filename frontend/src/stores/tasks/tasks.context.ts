import { createContext } from "react";
import { TasksStore } from "./tasks.store";

interface IStoreContext {
  tasksStore: TasksStore;
}

const tasksStore = new TasksStore();

export const TasksContext = createContext<IStoreContext>({
  tasksStore,
});
