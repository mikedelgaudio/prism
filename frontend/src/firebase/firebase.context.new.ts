import { createContext } from "react";
import { FirebaseStore } from "./firebase.store";

interface IStoreContext {
  firebaseStore: FirebaseStore;
}

const firebaseStore = new FirebaseStore();

export const FirebaseContextNew = createContext<IStoreContext>({
  firebaseStore,
});
