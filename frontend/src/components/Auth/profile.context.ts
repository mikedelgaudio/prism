import { createContext } from "react";
import { TOAST_SERVICE } from "../../services/toast.service";
import { ProfileStore } from "./profile.store";

interface IStoreContext {
  profileStore: ProfileStore;
}

const profileStore = new ProfileStore(TOAST_SERVICE);

export const ProfileContext = createContext<IStoreContext>({ profileStore });
