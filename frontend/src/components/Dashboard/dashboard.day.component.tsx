import { observer } from "mobx-react";
import { useTitle } from "../../hooks/use-title";
import { Dashboard } from "./dashboard.component";
import { DayCard } from "./DayCard";
import { EmptyCard } from "./EmptyCard";

const DashboardDay = observer(() => {
  useTitle("Day Dashboard - Prism");

  // If last entry !== today (meaning no data) then display empty card to prompt upload
  // Otherwise for loop over google sheet data

  // Fetch

  return (
    <Dashboard>
      <EmptyCard />
      <DayCard />
    </Dashboard>
  );
});

export { DashboardDay };
