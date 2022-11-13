import { createContext } from "react";
import { DashboardStore } from "./dashboard.store";

interface IStoreContext {
  dashboardStore: DashboardStore;
}

const dashboardStore = new DashboardStore();

export const DashboardContext = createContext<IStoreContext>({
  dashboardStore,
});
