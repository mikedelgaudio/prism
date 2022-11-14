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
import { GenericErrorBoundary } from "../../error-boundaries";
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

const Dashboard = observer(({ children }: any) => {
  return (
    <GenericErrorBoundary>
      <div id="home" className="relative py-6 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header />
          <div className="flex flex-col gap-6 py-6">{children}</div>
        </div>
      </div>
    </GenericErrorBoundary>
  );
});

export { Dashboard };
