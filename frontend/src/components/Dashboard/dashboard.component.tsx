import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { observer } from "mobx-react";
import { useContext } from "react";
import { DashboardErrorBoundary } from "../../error-boundaries";
import { DashboardContext } from "./dashboard.context";
import { DayCard } from "./DayCard";
import { EmptyCard } from "./EmptyCard";
import { Header } from "./Header";
import { WeekCard } from "./WeekCard/week-card.component";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = observer(() => {
  const { dashboardStore } = useContext(DashboardContext);

  return (
    <DashboardErrorBoundary>
      <section id="home" className="relative py-6 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header />
          <section className="flex flex-col gap-6 py-6">
            {dashboardStore.dayView ? (
              <>
                <EmptyCard />
                <DayCard />
              </>
            ) : (
              <>
                {/* <EmptyCard /> */}
                <WeekCard />
              </>
            )}
          </section>
        </div>
      </section>
    </DashboardErrorBoundary>
  );
});

export { Dashboard };
