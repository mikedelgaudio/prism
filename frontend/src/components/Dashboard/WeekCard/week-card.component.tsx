import { faker } from "@faker-js/faker";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import { WeeklyUpload } from "../../../firebase/firebase.models";
import { toHoursAndMinutes } from "../../../services/util.service";
import { Card } from "../../Shared";
import { DashboardContext } from "../dashboard.context";

const WeekCard = observer(({ week }: { week: WeeklyUpload }) => {
  const { dashboardStore } = useContext(DashboardContext);
  const tasks = dashboardStore.assignedTasks;

  const totalThisWeek = toHoursAndMinutes(week?.minutesCombined ?? 0);

  const [selectedId, setSelectedId] = useState(tasks[0]?.id ?? "");
  const handleSelection = (e: any) => {
    setSelectedId(prev => (prev = e.target.value));
  };

  const selectField = (
    <div className="flex flex-col gap-2 leading-3 w-full xl:w-96">
      <label
        className="required sr-only"
        htmlFor={`${week.weekNumber}-${week.uploaded}-assigned`}
      >
        Selected Task
      </label>
      <select
        className="block w-full px-3 py-1.5 min-w-[10rem] text-xl font-bold text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id={`${week.weekNumber}-${week.uploaded}-assigned`}
        value={selectedId}
        onChange={handleSelection}
      >
        {tasks?.map(task => {
          return (
            <option key={`${task.side}-${task.id}-option-key`} value={task.id}>
              {task.name}
            </option>
          );
        })}
      </select>
    </div>
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Week ${week.weekNumber} Review`,
      },
    },
  };

  const labels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "This week",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "#6A5BFF ",
        borderColor: "#6A5BFF",
      },
      {
        label: "Previous week",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "#088F8F",
      },
    ],
  };

  return (
    <Card>
      <div className="flex justify-between align-center">
        <div>
          <small className="text-base">Week {week.weekNumber} Review</small>
          <h2 className="font-bold text-2xl">
            {week.startDate} - {week.endDate}
          </h2>
          <p className="text-gray-700 font-semibold text-xl">
            {totalThisWeek.hours}h {totalThisWeek.minutes}m all sides
          </p>
        </div>
        <div className="flex items-center flex-col">
          <small className="text-base">Selected Task</small>
          {selectField}
        </div>
      </div>

      <div className="py-4">
        <Line data={data} options={options} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">Total this week</h3>
          <p className="text-xl">1h 4m</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">Total last week</h3>
          <p className="text-xl">9h 4m</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">All sides</h3>
          <p className="text-xl">
            {totalThisWeek.hours}h {totalThisWeek.minutes}m
          </p>
        </div>
      </div>
    </Card>
  );
});

export { WeekCard };
