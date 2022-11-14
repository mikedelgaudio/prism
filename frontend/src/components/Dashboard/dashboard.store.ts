import { makeAutoObservable } from "mobx";

export class DashboardStore {
  public dayView: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  changeView() {
    this.dayView = !this.dayView;
  }
}
