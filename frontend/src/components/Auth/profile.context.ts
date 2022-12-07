import { createContext } from "react";
import { ProfileStore } from "./profile.store";

interface IStoreContext {
  profileStore: ProfileStore;
}

const profileStore = new ProfileStore();

export const ProfileContext = createContext<IStoreContext>({ profileStore });
