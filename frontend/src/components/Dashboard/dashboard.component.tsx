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
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { ReactNode, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { GenericErrorBoundary } from "../../error-boundaries";
import { API_URL, getRequest } from "../../services/api.service";
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

  const calcQuery = useQuery(
    "calculateProfileOnClick",
    async () => {
      await getRequest(`${API_URL}/dashboards/calculate`);
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const profileQuery = useQuery(
    "loadProfile",
    async () => {
      await Promise.allSettled([
        dashboardStore.getProfile(),
        dashboardStore.getUploads(),
      ]);
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    runInAction(() => {
      dashboardStore.profileState = profileQuery.status;
      dashboardStore.calcState = calcQuery.status;
    });
    return () => {
      // if (dashboardStore.unsubscribe) {
      //   console.warn("CLEANUP");
      //   dashboardStore.unsubscribe();
      // }
    };
  }, [profileQuery.status, calcQuery.status]);

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
