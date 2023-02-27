import { faker } from "@faker-js/faker";
import { observer } from "mobx-react";
import { Line } from "react-chartjs-2";
import { WeeklyUpload } from "../../../firebase/firebase.models";
import { Card } from "../../Shared";

const WeekCard = observer(({ week }: { week: WeeklyUpload }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Week 44 Review",
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
          <p className="text-gray-700 font-semibold text-xl">6h 35m tracked</p>
        </div>
        <div>
          <small className="text-base">Compare Tasks</small>

          <label className="required sr-only" htmlFor={`assigned`}>
            Assigned Task
          </label>
          <select
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={"test"}
          >
            <option key={"test"} value={"test"}>
              Task A
            </option>
          </select>
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
          <h3 className="font-semibold text-xl">Total combined</h3>
          <p className="text-xl">10h 8m</p>
        </div>
        {/* 
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl">Total this week</h3>
          <p className="text-xl">1h 4m</p>
        </div> */}
      </div>
      <small className="text-gray-500">Updated today at 10:16 PM</small>
    </Card>
  );
});

export { WeekCard };
