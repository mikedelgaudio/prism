import { makeAutoObservable, toJS } from "mobx";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  side: string | null;
  id: string;
  name: string;
}

export class SettingsStore {
  // ! Populate from database
  public tasksPool: Task[] = [
    {
      side: "1",
      id: "1-t",
      name: "Task 1",
    },
    {
      side: "2",
      id: "2-t",
      name: "Task 2",
    },
    {
      side: "3",
      id: "3-t",
      name: "Task 3",
    },
    {
      side: "4",
      id: "4-t",
      name: "Task 4",
    },
    {
      side: "5",
      id: "5-t",
      name: "Task 5",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  get tasks() {
    return this.tasksPool;
  }

  get assignedTasks() {
    return this.tasks.filter(task => task.side !== null);
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  addTask() {
    const task: Task = {
      side: null,
      id: uuidv4(),
      name: "New Task",
    };

    // ! Arguably don't push to DB on blank entry?
    this.tasks.unshift(task);
  }

  editTaskName(id: string | undefined, newName: string | undefined) {
    if (!id || !newName) return;
    // ! Do database change or error handling here
    const index = this.tasks.findIndex(task => task.id === id);
    this.tasksPool[index].name = newName;
    console.log(toJS(this.tasks), toJS(this.tasksPool));
  }

  deleteTask(id: string | undefined) {
    console.log(id);
    if (!id) return;
    // ! Do database change or error handling here
    if (this.getTaskById(id)?.side === null) {
      this.tasksPool = this.tasks.filter(task => task.id !== id);
    }
    console.log(toJS(this.tasks), toJS(this.tasksPool));
  }
}
