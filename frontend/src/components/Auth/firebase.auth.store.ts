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
  UserCredential,
} from "firebase/auth";
import { makeAutoObservable } from "mobx";
import {
  ERROR_INVALID_CURRENT_EMAIL,
  ERROR_INVALID_INPUT,
  ERROR_USER_IS_NULL,
} from "../../services/errors.service";
import { auth } from "../../services/firebase.service";
import { validString } from "../../services/util.service";

export class FirebaseAuthStore {
  public currentUser: UserCredential | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get user() {
    return this.currentUser;
  }

  setUser(user: UserCredential | null) {
    console.log(user, "User here");
    if (!user) return;
    this.currentUser = user;
  }

  async register(email: string, password: string) {
    if (!validString(email) || !validString(password))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return createUserWithEmailAndPassword(auth, email, password);
  }

  async login(email: string, password: string) {
    console.log(1);
    if (!validString(email) || !validString(password))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return signInWithEmailAndPassword(auth, email, password);
  }

  async updateDisplayName(firstName: string, lastName: string) {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });
    return updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    });
  }

  async updateUserEmail(currentEmail: string, newEmail: string) {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    if (!validString(currentEmail) || !validString(newEmail))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    // Check if current email input matches current
    if (currentEmail !== auth.currentUser.email)
      return Promise.reject({ message: ERROR_INVALID_CURRENT_EMAIL });

    await this.sendVerificationEmail();

    return updateEmail(auth.currentUser, newEmail);
  }

  async updateUserPassword(newPassword: string) {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    if (!validString(newPassword))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return updatePassword(auth.currentUser, newPassword);
  }

  // TODO: May need to add timer to re-auth
  async reauthUser(email: string, password: string) {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    const credential = EmailAuthProvider.credential(email, password);
    return reauthenticateWithCredential(auth.currentUser, credential);
  }

  async sendVerificationEmail() {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    return sendEmailVerification(auth.currentUser);
  }

  async deleteAccount() {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    return deleteUser(auth.currentUser);
  }

  async logout() {
    return signOut(auth);
  }
}
