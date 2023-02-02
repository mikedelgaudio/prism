import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
} from "firebase/auth";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import {
  ERROR_INVALID_CURRENT_EMAIL,
  ERROR_INVALID_INPUT,
  ERROR_USER_IS_NULL,
} from "../services/errors.service";
import {
  auth,
  db,
  FIREBASE_TASKS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
} from "../services/firebase.service";
import { TOAST_SERVICE } from "../services/toast.service";
import { validString } from "../services/util.service";
import { DEFAULT_PROFILE, DEFAULT_PROFILE_TASKS } from "./firebase.models";
import { validPrismId } from "./firebase.util";

export class FirebaseStore {
  // public profile: UserProfile | null = null;
  public authUser: User | null = null;
  public authLoading = true;
  // public tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);

    auth.onAuthStateChanged((user: User | null) => {
      runInAction(() => {
        this.authUser = user;
        this.authLoading = false;
      });
    });
  }

  get userRef() {
    if (!this.authUser?.uid) return;
    return doc(db, FIREBASE_USERS_COLLECTION, this.authUser?.uid);
  }

  get userTasksRef() {
    if (!this.authUser?.uid) return;
    return collection(
      db,
      `${FIREBASE_USERS_COLLECTION}/${this.authUser?.uid}/${FIREBASE_TASKS_COLLECTION}`,
    );
  }

  async login(email: string, password: string) {
    if (!validString(email) || !validString(password))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return signInWithEmailAndPassword(auth, email, password);
  }

  async logout() {
    return signOut(auth);
  }

  async register(
    email: string,
    password: string,
    prismId: string,
    firstName: string,
    lastName: string,
  ) {
    if (!validString(email) || !validString(password))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    // TODO
    // ! Ensure PrismID is only used once

    if (!validPrismId(prismId))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    try {
      // Promise.all since dependent
      await createUserWithEmailAndPassword(auth, email, password);
      await this.addNewUser(prismId);
      await this.updateDisplayName(firstName, lastName);
      await this.sendVerificationEmail().then(() => {
        const TOAST_ID = "VERIFY_YOUR_EMAIL";
        TOAST_SERVICE.success(TOAST_ID, `Verify your email ${email}`, false);
      });
    } catch (e) {
      return Promise.reject();
    }

    return Promise.resolve();
  }

  private async addNewUser(prismId: string) {
    const newUserProfile = DEFAULT_PROFILE;
    newUserProfile.prismId = prismId;

    try {
      if (!this.userRef || !this.authUser?.uid)
        return Promise.reject({ message: ERROR_USER_IS_NULL });

      await setDoc(this.userRef, newUserProfile);

      DEFAULT_PROFILE_TASKS.forEach(async task => {
        try {
          if (!this.userTasksRef) throw new Error();
          const tasksCollectionRef = doc(this.userTasksRef, task.id);
          await setDoc(tasksCollectionRef, task);
        } catch (e) {
          throw new Error();
        }
      });
    } catch (e) {
      return Promise.reject({ message: ERROR_USER_IS_NULL });
    }

    return Promise.resolve();
  }

  async updateDisplayName(firstName: string, lastName: string) {
    if (!this.authUser) return Promise.reject({ message: ERROR_USER_IS_NULL });

    if (!validString(firstName) || !validString(lastName))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return updateProfile(this.authUser, {
      displayName: `${firstName} ${lastName}`,
    });
  }

  async sendVerificationEmail() {
    if (!this.authUser) return Promise.reject({ message: ERROR_USER_IS_NULL });
    return sendEmailVerification(this.authUser);
  }

  async deleteAccount() {
    if (!this.authUser) return Promise.reject({ message: ERROR_USER_IS_NULL });
    await deleteDoc(doc(db, FIREBASE_USERS_COLLECTION, this.authUser.uid));
    return deleteUser(this.authUser);
  }

  // TODO
  // ! If user stays on a page for too long you may need
  // ! prompt them for re-auth again...
  async reauthUser(email: string, password: string) {
    if (!this.authUser) return Promise.reject({ message: ERROR_USER_IS_NULL });

    if (!validString(email) || !validString(password))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    const credential = EmailAuthProvider.credential(email, password);
    return reauthenticateWithCredential(this.authUser, credential);
  }

  async updateUserPassword(newPassword: string) {
    if (!this.authUser) return Promise.reject({ message: ERROR_USER_IS_NULL });

    if (!validString(newPassword))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return updatePassword(this.authUser, newPassword);
  }

  async updateUserEmail(currentEmail: string, newEmail: string) {
    if (!this.authUser) return Promise.reject({ message: ERROR_USER_IS_NULL });

    if (!validString(currentEmail) || !validString(newEmail))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    // Check if current email input matches current
    if (currentEmail !== this.authUser.email)
      return Promise.reject({ message: ERROR_INVALID_CURRENT_EMAIL });

    await this.sendVerificationEmail();

    return updateEmail(this.authUser, newEmail);
  }
}
