import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { observer } from "mobx-react";
import { ReactNode, useContext, useEffect } from "react";
import { GenericErrorBoundary } from "../../error-boundaries";
import { DashboardContext } from "./dashboard.context";
import { Header } from "./Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
);

const Dashboard = observer(({ children }: { children: ReactNode }) => {
  const { dashboardStore } = useContext(DashboardContext);

  useEffect(() => {
    (async () => dashboardStore.getProfile())();
  }, []);

  return (
    <GenericErrorBoundary>
      <div className="relative py-6 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header />
          <div className="flex flex-col gap-6 py-6">{children}</div>
        </div>
      </div>
    </GenericErrorBoundary>
  );
});

export { Dashboard };
