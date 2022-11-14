import { observer } from "mobx-react";
import { Dashboard } from "./dashboard.component";
import { WeekCard } from "./WeekCard/week-card.component";

const DashboardWeek = observer(() => {
  return (
    <Dashboard>
      <WeekCard />
      <WeekCard />
    </Dashboard>
  );
});

export { DashboardWeek };
