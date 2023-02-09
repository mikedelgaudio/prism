import { observer } from "mobx-react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useTitle } from "../../hooks/use-title";
import { API_URL, getRequest } from "../../services/api.service";
import { Loading } from "../Shared";
import { Dashboard } from "./dashboard.component";
import { DashboardContext } from "./dashboard.context";
import { DayCard } from "./DayCard";
import { EmptyCard } from "./EmptyCard";

const DashboardDay = observer(() => {
  useTitle("Day Dashboard - Prism");

  const { dashboardStore } = useContext(DashboardContext);

  const { data, status, refetch } = useQuery(
    "loadProfile",
    async () => {
      await Promise.allSettled([dashboardStore.getProfile()]);
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  // If last entry !== today (meaning no data) then display empty card to prompt upload
  // Otherwise for loop over google sheet data

  // Infinite lazy load cards in?

  return (
    <Dashboard>
      {status === "success" ? (
        <>
          <EmptyCard />
          <DayCard />
        </>
      ) : (
        <Loading />
      )}
    </Dashboard>
  );
});

export { DashboardDay };
