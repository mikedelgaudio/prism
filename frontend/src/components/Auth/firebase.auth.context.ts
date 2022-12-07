import { createContext } from "react";
import { FirebaseAuthStore } from "./firebase.auth.store";

interface IStoreContext {
  firebaseAuthStore: FirebaseAuthStore;
}

const firebaseAuthStore = new FirebaseAuthStore();

export const FirebaseAuthContext = createContext<IStoreContext>({
  firebaseAuthStore,
});
