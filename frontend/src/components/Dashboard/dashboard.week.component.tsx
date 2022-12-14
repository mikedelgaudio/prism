import { observer } from "mobx-react";
import { useTitle } from "../../hooks/use-title";
import { Dashboard } from "./dashboard.component";
import { WeekCard } from "./WeekCard/week-card.component";

const DashboardWeek = observer(() => {
  useTitle("Week Dashboard - Prism");

  return (
    <Dashboard>
      <WeekCard />
      <WeekCard />
    </Dashboard>
  );
});

export { DashboardWeek };
