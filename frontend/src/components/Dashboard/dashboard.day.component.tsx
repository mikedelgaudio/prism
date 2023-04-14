import { observer } from "mobx-react";
import { useContext } from "react";
import { useTitle } from "../../hooks/use-title";
import { toDateTitle } from "../../services/util.service";
import { Loading } from "../Shared";
import { DayCard } from "./DayCard";
import { DayEmptyCard } from "./DayEmptyCard";
import { Dashboard } from "./dashboard.component";
import { DashboardContext } from "./dashboard.context";

const DashboardDay = observer(() => {
  useTitle("Day Dashboard");

  const { dashboardStore } = useContext(DashboardContext);

  const renderEmptyCard = (
    <>
      {dashboardStore.uploads.some(upload => {
        return (
          toDateTitle(upload.title) === toDateTitle(new Date().toISOString())
        );
      }) || dashboardStore.uploads.length === 0 ? (
        <></>
      ) : (
        <DayEmptyCard />
      )}
    </>
  );

  return (
    <Dashboard>
      {dashboardStore.profileState === "success" &&
      dashboardStore.calcState === "success" ? (
        <>
          {renderEmptyCard}
          {dashboardStore.uploads.map(upload => {
            return <DayCard key={upload.title} title={upload.title} />;
          })}
        </>
      ) : (
        <Loading />
      )}
    </Dashboard>
  );
});

export { DashboardDay };
