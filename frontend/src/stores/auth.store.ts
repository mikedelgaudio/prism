import { makeAutoObservable } from "mobx";

export class AuthStore {
  public state: any = {
    userId: null,
    token: null,
  };

  constructor() {
    makeAutoObservable(this);
  }
}
