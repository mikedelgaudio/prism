import { createContext } from "react";
import { TOAST_SERVICE } from "../../services/toast.service";
import { AuthStore } from "./auth.store";

interface IStoreContext {
  authStore: AuthStore;
}

const authStore = new AuthStore(TOAST_SERVICE);

export const AuthContext = createContext<IStoreContext>({
  authStore,
});
