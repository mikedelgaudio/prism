import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { ERROR_INVALID_INPUT } from "../services/errors.service";
import { auth } from "../services/firebase.service";
import { validString } from "../services/util.service";
import { Task, UserProfile } from "./firebase.models";
import { validPrismId } from "./firebase.util";

export class FirebaseStore {
  public profile: UserProfile | null = null;
  public authUser: User | null = null;
  public tasks: Task[] = [];
  public authLoading = true;

  constructor() {
    makeAutoObservable(this);

    auth.onAuthStateChanged((user: User | null) => {
      this.authUser = user;
      this.authLoading = false;
    });
  }

  async login(email: string, password: string) {
    if (!validString(email) || !validString(password))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return signInWithEmailAndPassword(auth, email, password);
  }

  async logout() {
    return signOut(auth);
  }

  async register(email: string, password: string, prismId: string) {
    if (!validString(email) || !validString(password))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    // TODO
    // ! Ensure PrismID is only used once

    if (!validPrismId(prismId))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return createUserWithEmailAndPassword(auth, email, password);
  }
}
