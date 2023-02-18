import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useContext } from "react";
import { useTitle } from "../../hooks/use-title";
import { toDateTitle } from "../../services/util.service";
import { Loading } from "../Shared";
import { Dashboard } from "./dashboard.component";
import { DashboardContext } from "./dashboard.context";
import { DayCard } from "./DayCard";
import { EmptyCard } from "./EmptyCard";

const DashboardDay = observer(() => {
  useTitle("Day Dashboard - Prism");

  const { dashboardStore } = useContext(DashboardContext);

  const renderEmptyCard = (
    <>
      {dashboardStore.uploads.find(upload => {
        console.log(upload);
        return (
          toDateTitle(upload.title) !== toDateTitle(new Date().toISOString())
        );
      }) ? (
        <EmptyCard />
      ) : (
        <></>
      )}
    </>
  );

  console.log(toJS(dashboardStore.uploads));

  return (
    <Dashboard>
      {true ? (
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
