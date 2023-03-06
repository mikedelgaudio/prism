import { Card } from "../../Shared";
import { RefreshBtn } from "../RefreshBtn";

const DayEmptyCard = () => {
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

      <div className="py-4 flex items-center justify-center flex-col gap-5">
        <h3>To upload your results, place Prism on its rest side</h3>
        <RefreshBtn iconMode={false} />
      </div>
    </Card>
  );
};

export { DayEmptyCard };
