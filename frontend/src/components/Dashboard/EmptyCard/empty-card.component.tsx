import { Card } from "../../Shared";

const EmptyCard = () => {
  const DATE_FORMAT = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
  });

  return (
    <Card>
      <div>
        <small>Day in Review</small>
        <h2 className="font-bold text-2xl">{DATE_FORMAT.format(new Date())}</h2>
        <p className="text-gray-700 font-semibold text-xl">No data</p>
      </div>

      <div className="py-4 flex items-center justify-center">
        <h3>To upload your results, place Prism on its rest side</h3>
      </div>
    </Card>
  );
};

export { EmptyCard };
