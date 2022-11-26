import { createContext } from "react";
import { TOAST_SERVICE } from "../../services/toast.service";
import { SettingsStore } from "./settings.store";

interface IStoreContext {
  settingsStore: SettingsStore;
}

const settingsStore = new SettingsStore(TOAST_SERVICE);

export const SettingsContext = createContext<IStoreContext>({
  settingsStore,
});
