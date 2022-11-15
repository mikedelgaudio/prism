import { observer } from "mobx-react";
import { Helmet } from "react-helmet";
import { Dashboard } from "./dashboard.component";
import { DayCard } from "./DayCard";
import { EmptyCard } from "./EmptyCard";

const DashboardDay = observer(() => {
  return (
    <>
      <Helmet>
        <title>Day Dashboard - Prism</title>
      </Helmet>
      <Dashboard>
        <EmptyCard />
        <DayCard />
      </Dashboard>
    </>
  );
});

export { DashboardDay };
