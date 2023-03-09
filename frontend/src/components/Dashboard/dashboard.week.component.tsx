import { observer } from "mobx-react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { WeeklyUploadResponse } from "../../firebase/firebase.models";
import { useTitle } from "../../hooks/use-title";
import { API_URL, getRequest } from "../../services/api.service";
import { Loading } from "../Shared";
import { Dashboard } from "./dashboard.component";
import { DashboardContext } from "./dashboard.context";
import { WeekCard } from "./WeekCard/week-card.component";
import { WeekEmptyCard } from "./WeekEmptyCard/week-empty-card";

const DashboardWeek = observer(() => {
  useTitle("Week Dashboard");
  const { dashboardStore } = useContext(DashboardContext);

  const query = useQuery(
    "weeks",
    async () => {
      const res = (await getRequest(
        `${API_URL}/dashboards/weeks`,
      )) as WeeklyUploadResponse;

      dashboardStore.weeks = res.data;

      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const render = (
    <>
      {query.data?.length === 0 ? <WeekEmptyCard /> : <></>}
      {query.data?.map(week => {
        return (
          <WeekCard key={`${week.weekNumber}-${week.uploaded}`} week={week} />
        );
      })}
    </>
  );

  return <Dashboard>{query.isSuccess ? render : <Loading />}</Dashboard>;
});

export { DashboardWeek };
