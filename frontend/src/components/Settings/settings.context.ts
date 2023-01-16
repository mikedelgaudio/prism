import { createContext } from "react";
import { SettingsStore } from "./settings.store";

interface IStoreContext {
  settingsStore: SettingsStore;
}

const settingsStore = new SettingsStore();

export const SettingsContext = createContext<IStoreContext>({
  settingsStore,
});
