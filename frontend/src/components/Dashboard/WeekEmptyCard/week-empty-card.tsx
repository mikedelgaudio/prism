import {
  getEndDateOfWeek,
  getStartDateOfWeek,
  getWeekNumber,
} from "../../../services/util.service";
import { Card } from "../../Shared";
import { RefreshBtn } from "../RefreshBtn";

const WeekEmptyCard = () => {
  const weekNumber = getWeekNumber();
  const year = new Date().getFullYear();
  const startDate = getStartDateOfWeek(weekNumber, year);
  const endDate = getEndDateOfWeek(weekNumber, year);

  return (
    <Card>
      <div>
        <small>Week {getWeekNumber()} Review</small>
        <h2 className="font-bold text-2xl">
          {startDate} - {endDate}
        </h2>
        <p className="text-gray-700 font-semibold text-xl">No data</p>
      </div>

      <div className="py-4 flex items-center justify-center flex-col gap-5">
        <h3>To upload your results, place Prism on its rest side</h3>
        <RefreshBtn iconMode={false} />
      </div>
    </Card>
  );
};

export { WeekEmptyCard };
