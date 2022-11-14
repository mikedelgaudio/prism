import { observer } from "mobx-react";
import { Dashboard } from "./dashboard.component";
import { DayCard } from "./DayCard";
import { EmptyCard } from "./EmptyCard";

const DashboardDay = observer(() => {
  return (
    <Dashboard>
      <EmptyCard />
      <DayCard />
    </Dashboard>
  );
});

export { DashboardDay };
