import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { ToastService } from "../../services/toast.service";
import { validString } from "../../services/util.service";

export interface User {
  id: string | null;
  firstName: string;
  lastName: string;
  email: string;
  prismId: string | null;
  progressEmail: boolean;
  timeToStand: boolean;
}

export class AuthStore {
  public userProfile: User = {
    id: uuidv4(),
    firstName: "Mike",
    lastName: "DelGaudio",
    email: "mdelgaud@stevens.edu",
    prismId: uuidv4(),
    progressEmail: false,
    timeToStand: true,
  };

  constructor(private readonly toastService: ToastService) {
    makeAutoObservable(this);
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

  changeEmail(newEmail: string | undefined) {
    // ! Add error handling and db call
    if (!validString(newEmail)) return;
    this.userProfile.email = newEmail ?? "";

    const TOAST_ID = "EMAIL_CHANGE";
    this.toastService.success(
      TOAST_ID,
      "Successfully changed account email",
      true,
    );
  }

  resetPasswordAuth(
    currentPassword: string | undefined,
    newPassword: string | undefined,
  ) {
    if (!validString(currentPassword) || !validString(newPassword)) return;

    const TOAST_ID = "RESET_PASSWORD_AUTH";

    // Verify current password

    // Update to new password

    // Confirm change

    this.toastService.success(
      TOAST_ID,
      "Successfully updated account password.",
      true,
    );
  }

  disconnectPrism() {
    const TOAST_ID = "DISCONNECT_PRISM";

    // Send to request to DB
    // Reset UI to onboarding UI

    this.toastService.success(
      TOAST_ID,
      "Successfully disconnected Prism.",
      true,
    );
  }

  deleteAccount() {
    const TOAST_ID = "DELETE_ACCOUNT";

    // Send request to DB (ensure full data removal)

    // Logout user

    this.toastService.success(
      TOAST_ID,
      "Successfully deleted your account.",
      true,
    );
  }
}
