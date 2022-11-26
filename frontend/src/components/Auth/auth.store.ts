import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { ToastService } from "../../services/toast.service";
export class AuthStore {
  public user = {
    id: uuidv4(),
    firstName: "Mike",
    lastName: "DelGaudio",
  };

  constructor(private readonly toastService: ToastService) {
    makeAutoObservable(this);
  }
}
