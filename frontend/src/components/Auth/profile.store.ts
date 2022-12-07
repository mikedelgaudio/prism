import { doc, DocumentData, DocumentReference } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import {
  auth,
  db,
  FIREBASE_USER_COLLECTION,
} from "../../services/firebase.service";
import { TOAST_SERVICE } from "../../services/toast.service";

export interface User {
  prismId: string | null;
  progressEmail: boolean;
  timeToStand: boolean;
}

export class ProfileStore {
  public userProfile: User = {
    prismId: uuidv4(),
    progressEmail: false,
    timeToStand: true,
  };

  private userDocRef: DocumentReference<DocumentData> | undefined;

  constructor() {
    makeAutoObservable(this);
    try {
      console.log(auth);
      if (!1) throw new Error();
      this.userDocRef = doc(db, FIREBASE_USER_COLLECTION, "1");
    } catch (e) {
      TOAST_SERVICE.error("TODO", "Unable to get user profile", false);
    }
  }

  get user() {
    return this.userProfile;
  }

  toggleProgressEmail() {
    // ! Add error handling and db call
    this.userProfile.progressEmail = !this.user.progressEmail;
  }

  toggleTimeToStand() {
    // ! Add error handling and db call
    this.userProfile.timeToStand = !this.user.timeToStand;
  }

  disconnectPrism() {
    const TOAST_ID = "DISCONNECT_PRISM";

    if (this.user.prismId === null) {
      TOAST_SERVICE.error(
        TOAST_ID,
        "Error: No prism found with account.",
        true,
      );
      return;
    }

    // Send to request to DB
    // Reset UI to onboarding UI

    this.userProfile.prismId = null;

    TOAST_SERVICE.success(TOAST_ID, "Successfully disconnected Prism.", true);
  }

  deleteAccount() {
    const TOAST_ID = "DELETE_ACCOUNT";

    // Send request to DB (ensure full data removal)

    // Logout user

    TOAST_SERVICE.success(TOAST_ID, "Successfully deleted your account.", true);
  }
}
