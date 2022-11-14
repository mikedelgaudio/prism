import { faker } from "@faker-js/faker";
import { Line } from "react-chartjs-2";
import { Card } from "../../Shared";

const WeekCard = () => {
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
      <div>
        <small className="text-base">Week 44 Review</small>
        <h2 className="font-bold text-2xl">October 30 - November 5</h2>
        <p className="text-gray-700 font-semibold text-xl">6h 35m tracked</p>
      </div>

      <div className="py-4">
        <Line data={data} options={options} />
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

export { WeekCard };
