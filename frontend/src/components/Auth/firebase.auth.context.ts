import { createContext, useContext } from "react";
import { FirebaseAuthStore } from "./firebase.auth.store";

interface IStoreContext {
  store: FirebaseAuthStore;
}

const store = new FirebaseAuthStore();

const FirebaseAuthContext = createContext<IStoreContext>({
  store,
});

export function useFirebaseAuth_N() {
  return useContext(FirebaseAuthContext);
}
