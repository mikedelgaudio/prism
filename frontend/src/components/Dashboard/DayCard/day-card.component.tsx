import { observer } from "mobx-react";
import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import { DailyUploadSide } from "../../../firebase/firebase.models";
import {
  colors,
  toDateTitle,
  toHoursAndMinutes,
  toLocalDateTime,
} from "../../../services/util.service";
import { Card, Loading } from "../../Shared";
import { DashboardContext } from "../dashboard.context";

const DayCard = observer(({ title }: { title: string }) => {
  const { dashboardStore } = useContext(DashboardContext);

  const upload = dashboardStore.getUploadByDate(title);
  const dateTitle = toDateTitle(title);
  const totalTracked = toHoursAndMinutes(upload?.totalTrackedMinutes ?? 0);
  const side1Tracked = toHoursAndMinutes(upload?.side1Minutes ?? 0);
  const side2Tracked = toHoursAndMinutes(upload?.side2Minutes ?? 0);
  const side3Tracked = toHoursAndMinutes(upload?.side3Minutes ?? 0);
  const side4Tracked = toHoursAndMinutes(upload?.side4Minutes ?? 0);
  const side5Tracked = toHoursAndMinutes(upload?.side5Minutes ?? 0);
  const labels = dashboardStore.dayLabelList;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${dateTitle} Tracked`,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const sideQuery = useQuery(
    `dayQuery${title}`,
    async () => {
      return await dashboardStore.getSidesData(title);
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const data = {
    labels,
    datasets: [
      {
        label: upload?.side1Name,
        data: labels.map((_, index) => {
          return (
            (sideQuery.data?.side1[index] as DailyUploadSide)?.minutes ?? 0
          );
        }),
        backgroundColor: `${colors.indigo[400]}`,
      },
      {
        label: upload?.side2Name,
        data: labels.map((_, index) => {
          return (
            (sideQuery.data?.side2[index] as DailyUploadSide)?.minutes ?? 0
          );
        }),
        backgroundColor: `${colors.indigo[300]}`,
      },
      {
        label: upload?.side3Name,
        data: labels.map((_, index) => {
          return (
            (sideQuery.data?.side3[index] as DailyUploadSide)?.minutes ?? 0
          );
        }),
        backgroundColor: `${colors.indigo[600]}`,
      },
      {
        label: upload?.side4Name,
        data: labels.map((_, index) => {
          return (
            (sideQuery.data?.side4[index] as DailyUploadSide)?.minutes ?? 0
          );
        }),
        backgroundColor: `${colors.indigo[800]}`,
      },
      {
        label: upload?.side5Name,
        data: labels.map((_, index) => {
          return (
            (sideQuery.data?.side5[index] as DailyUploadSide)?.minutes ?? 0
          );
        }),
        backgroundColor: `${colors.indigo[900]}`,
      },
    ],
  };

  return (
    <Card>
      {sideQuery.isSuccess ? (
        <>
          <div>
            <small>Day in Review</small>
            <h2 className="font-bold text-2xl">{dateTitle}</h2>
            <p className="text-gray-700 font-semibold text-xl">
              {totalTracked.hours}h {totalTracked.minutes}m tracked
            </p>
          </div>

          <div className="py-4 flex items-center justify-center">
            <div className="lg:max-w-4xl max-w-full w-full">
              <Bar options={options} data={data} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4">
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">{upload?.side1Name}</h3>
              <p className="text-xl">
                {side1Tracked.hours}h {side1Tracked.minutes}m
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">{upload?.side2Name}</h3>
              <p className="text-xl">
                {side2Tracked.hours}h {side2Tracked.minutes}m
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">{upload?.side3Name}</h3>
              <p className="text-xl">
                {side3Tracked.hours}h {side3Tracked.minutes}m
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">{upload?.side4Name}</h3>
              <p className="text-xl">
                {side4Tracked.hours}h {side4Tracked.minutes}m
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">{upload?.side5Name}</h3>
              <p className="text-xl">
                {side5Tracked.hours}h {side5Tracked.minutes}m
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">Total time</h3>
              <p className="text-xl">
                {totalTracked.hours}h {totalTracked.minutes}m
              </p>
            </div>
          </div>
          <small className="text-gray-500">
            Updated {toLocalDateTime(upload?.lastUpload ?? "")}
          </small>
        </>
      ) : (
        <Loading />
      )}
    </Card>
  );
});

export { DayCard };
