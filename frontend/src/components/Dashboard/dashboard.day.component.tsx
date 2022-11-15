import { observer } from "mobx-react";
import { useTitle } from "../../hooks/useTitle.hook";
import { Dashboard } from "./dashboard.component";
import { DayCard } from "./DayCard";
import { EmptyCard } from "./EmptyCard";

const DashboardDay = observer(() => {
  useTitle("Day Dashboard - Prism");

  return (
    <Dashboard>
      <EmptyCard />
      <DayCard />
    </Dashboard>
  );
});

export { DashboardDay };
