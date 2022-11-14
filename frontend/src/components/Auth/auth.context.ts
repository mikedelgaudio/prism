import { createContext } from "react";
import { AuthStore } from "./auth.store";

interface IStoreContext {
  authStore: AuthStore;
}

const authStore = new AuthStore();

export const AuthContext = createContext<IStoreContext>({
  authStore,
});
