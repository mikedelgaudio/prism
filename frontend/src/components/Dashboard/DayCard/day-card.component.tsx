import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { colors } from "../../../services/util.service";
import { SettingsContext } from "../../Settings/settings.context";
import { Card } from "../../Shared";
import { DashboardContext } from "../dashboard.context";

const DayCard = () => {
  const { dashboardStore } = useContext(DashboardContext);
  const { settingsStore } = useContext(SettingsContext);

  const tasks = settingsStore.assignedTasks;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "November 2, 2022 Tracked",
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

  const labels = [];
  for (let i = 0; i < 24; i++) {
    const suffix = i < 12 ? "am" : "pm";
    const prefix = i < 12 ? i : i - 12;
    if (prefix === 0) labels.push(`12${suffix}`);
    else labels.push(`${prefix}${suffix}`);
  }

  const side1Breakdown = new Array(24).fill(0);
  const MINUTES_IN_HOUR = 60;

  // Must guarantee that all data is associated with particular day
  dashboardStore.rawData.map(upload => {
    upload.side1.map(record => {
      const day = new Date(record.trackingStartTime);
      const timeSpent = Math.ceil(
        (record.trackingEndTime - record.trackingStartTime) / 60000,
      );

      // Calculate total time spent during recorded side
      side1Breakdown[day.getHours()] += timeSpent;
    });
  });

  // Distribute load
  for (let i = 0; i < side1Breakdown.length; i++) {
    const slot = side1Breakdown[i];
    if (side1Breakdown[i] > MINUTES_IN_HOUR) {
      const remainder =
        slot >= MINUTES_IN_HOUR
          ? Math.abs(slot - MINUTES_IN_HOUR)
          : slot % MINUTES_IN_HOUR;

      side1Breakdown[i] = 60;

      if (i + 1 < 24) side1Breakdown[i + 1] += remainder;
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Study Chemical Engineering",
        data: side1Breakdown,
        backgroundColor: `${colors.indigo[400]}`,
      },
      // {
      //   label: "Watch YouTube",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 288 })),
      //   backgroundColor: `${colors.indigo[300]}`,
      // },
      // {
      //   label: "Hang with Friends",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 288 })),
      //   backgroundColor: `${colors.indigo[600]}`,
      // },
      // {
      //   label: "Read Book",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 288 })),
      //   backgroundColor: `${colors.indigo[800]}`,
      // },
      // {
      //   label: "Study Math",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 288 })),
      //   backgroundColor: `${colors.indigo[900]}`,
      // },
    ],
  };

  return (
    <Card>
      <div>
        <small>Day in Review</small>
        <h2 className="font-bold text-2xl">Wednesday, November 2, 2022</h2>
        <p className="text-gray-700 font-semibold text-xl">6h 35m tracked</p>
      </div>

      <div className="py-4">
        <Bar options={options} data={data} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">
            Study for Chemical Engineering
          </h3>
          <p className="text-xl">1h 4m</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">
            Study for Chemical Engineering
          </h3>
          <p className="text-xl">1h 4m</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">
            Study for Chemical Engineering
          </h3>
          <p className="text-xl">1h 4m</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">
            Study for Chemical Engineering
          </h3>
          <p className="text-xl">1h 4m</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">
            Study for Chemical Engineering
          </h3>
          <p className="text-xl">1h 4m</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">Total time</h3>
          <p className="text-xl">6h 35m</p>
        </div>
      </div>
      <small className="text-gray-500">Updated today at 10:16 PM</small>
    </Card>
  );
};

export { DayCard };
