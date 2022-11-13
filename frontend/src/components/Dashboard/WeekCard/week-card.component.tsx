import { faker } from "@faker-js/faker";
import { Bar } from "react-chartjs-2";

const WeekCard = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col bg-white text-base p-9 rounded-xl shadow-lg">
      <div>
        <small>Week in Review</small>
        <h2 className="font-bold text-2xl">Wednesday, November 2, 2022 - </h2>
        <p className="text-gray-700 font-semibold text-xl">6h 35m tracked</p>
      </div>

      <div className="py-4">
        <Bar options={options} data={data} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-4">
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
      </div>
      <small className="text-gray-500">Updated today at 10:16 PM</small>
    </div>
  );
};

export { WeekCard };
