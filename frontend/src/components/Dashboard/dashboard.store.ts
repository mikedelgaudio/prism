import { makeAutoObservable } from "mobx";

interface DashboardState {
  dayView: boolean;
}

export class DashboardStore {
  public dayView: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  changeView() {
    console.log("g");
    this.dayView = !this.dayView;
    console.log(this.dayView);
  }
}
