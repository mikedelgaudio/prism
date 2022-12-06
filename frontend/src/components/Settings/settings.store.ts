import { makeAutoObservable, toJS } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { ToastService } from "../../services/toast.service";

export interface Task {
  side: string | null;
  id: string;
  name: string;
  color: string;
}

export class SettingsStore {
  // ! Populate from database
  public tasksPool: Task[] = [
    {
      side: "1",
      id: "1-t",
      name: "Task A",
      color: "#ff0000",
    },
    {
      side: "2",
      id: "2-t",
      name: "Task B",
      color: "#0002fe",
    },
    {
      side: "3",
      id: "3-t",
      name: "Task C",
      color: "#03480e",
    },
    {
      side: "4",
      id: "4-t",
      name: "Task D",
      color: "#ca6e04",
    },
    {
      side: "5",
      id: "5-t",
      name: "Task E",
      color: "#9808fe",
    },
  ];

  constructor(private readonly toastService: ToastService) {
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
      color: "#eee",
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

  assignTask(fromId: string | undefined, toId: string | undefined) {
    if (!fromId || !toId) return;

    const toTask = this.getTaskById(toId);
    const fromTask = this.getTaskById(fromId);

    if (!toTask || !fromTask) return;

    const prev = { ...fromTask };
    const next = { ...toTask };

    fromTask.id = next.id;
    fromTask.name = next.name;
    fromTask.color = prev.color;
    toTask.id = prev.id;
    toTask.name = prev.name;
    toTask.color = next.color;
  }
}
