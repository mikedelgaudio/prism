import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

interface Task {
  side: string | null;
  id: string;
  name: string;
}

export class SettingsStore {
  // ! Populate from database
  public tasksPool: Task[] = [
    {
      side: null,
      id: "123",
      name: "Study 1",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  get tasks() {
    return this.tasksPool;
  }

  addTask() {
    const task: Task = {
      side: null,
      id: uuidv4(),
      name: "New Task",
    };

    this.tasks.unshift(task);
  }

  editTaskName(id: string, newName: string) {
    // ! Do database change or error handling here
    const index = this.tasks.findIndex(task => task.id === id);
    this.tasks[index].name = newName;
  }

  deleteTask(id: string) {
    // ! Do database change or error handling here
    this.tasks.filter(task => task.id !== id && task.side === null);
  }
}
