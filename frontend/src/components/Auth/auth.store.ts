import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
export class AuthStore {
  public user = {
    id: uuidv4(),
    firstName: "Mike",
    lastName: "DelGaudio",
  };

  constructor() {
    makeAutoObservable(this);
  }
}
