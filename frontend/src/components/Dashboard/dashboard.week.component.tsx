import { observer } from "mobx-react";
import { Helmet } from "react-helmet";
import { Dashboard } from "./dashboard.component";
import { WeekCard } from "./WeekCard/week-card.component";

const DashboardWeek = observer(() => {
  return (
    <>
      <Helmet>
        <title>Week Dashboard - Prism</title>
      </Helmet>
      <Dashboard>
        <WeekCard />
        <WeekCard />
      </Dashboard>
    </>
  );
});

export { DashboardWeek };
