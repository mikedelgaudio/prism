import { observer } from "mobx-react";
import { ChangeEvent, useState } from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { WeeklyUpload } from "../../../firebase/firebase.models";
import { API_URL, getRequest } from "../../../services/api.service";
import { colors, toHoursAndMinutes } from "../../../services/util.service";
import { Card } from "../../Shared";
import { LoadingGraph } from "../../Shared/loading-graph.component";

const WeekCard = observer(({ week }: { week: WeeklyUpload }) => {
  const [sideNumber, setSideNumber] = useState(1);
  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSideNumber(p => (p = +e.target.value));
  };

  const { data, isLoading } = useQuery(
    ["task", sideNumber],
    async () => {
      const res = await getRequest(
        `${API_URL}/dashboards/week/${week.weekNumber}/${week.year}/${sideNumber}`,
      );
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const selectField = (
    <div className="flex flex-col gap-2 leading-3 w-full min-w-[10rem]">
      <label
        className="required sr-only"
        htmlFor={`${week.weekNumber}-${week.uploaded}-assigned`}
      >
        Selected Task
      </label>
      <select
        className="block w-full px-3 py-1.5 text-xl font-bold text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id={`${week.weekNumber}-${week.uploaded}-assigned`}
        value={sideNumber}
        onChange={handleSelection}
      >
        <option key={`${week.uploaded}-${week.year}-1-option-key`} value={1}>
          Side 1
        </option>
        <option key={`${week.uploaded}-${week.year}-1-option-key`} value={2}>
          Side 2
        </option>
        <option key={`${week.uploaded}-${week.year}-1-option-key`} value={3}>
          Side 3
        </option>
        <option key={`${week.uploaded}-${week.year}-1-option-key`} value={4}>
          Side 4
        </option>
        <option key={`${week.uploaded}-${week.year}-1-option-key`} value={5}>
          Side 5
        </option>
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

  const totalThisWeek = toHoursAndMinutes(week?.minutesCombined ?? 0);

  const render = () => {
    const key = `side${sideNumber}Minutes`;
    const time = toHoursAndMinutes(+week[key as keyof WeeklyUpload]);
    return (
      <>
        {time.hours}h {time.minutes}m
      </>
    );
  };

  return (
    <Card>
      <div className="flex justify-between align-center sm:flex-row sm:gap-0 flex-col gap-3">
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

      <div className="py-4 flex items-center justify-center">
        {!isLoading ? (
          <div className="lg:max-w-4xl max-w-full w-full">
            <Line
              data={{
                labels,
                datasets: [
                  {
                    label: "This week",
                    data: labels.map((_, index) => {
                      return data[index]?.minutes ?? 0;
                    }),
                    backgroundColor: `${colors.indigo[600]}`,
                    borderColor: `${colors.indigo[600]}`,
                  },
                ],
              }}
              options={options}
            />
          </div>
        ) : (
          <LoadingGraph />
        )}
      </div>
      <div className="border-b-2 py-4">
        <span className="font-bold text-xl">Side {sideNumber}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">Total this week</h3>
          <p className="text-xl">{render()}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">Total last week</h3>
          <p className="text-xl">0h 0m</p>
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
