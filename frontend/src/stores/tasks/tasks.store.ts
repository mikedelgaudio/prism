import { makeAutoObservable } from "mobx";
import { Task } from "../../firebase/firebase.models";
import { API_URL, getRequest } from "../../services/api.service";

export class TasksStore {
  public tasksData: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get tasks() {
    return this.tasksData;
  }

  async getTasks() {
    return getRequest(`${API_URL}/settings/tasks`);
  }
}
