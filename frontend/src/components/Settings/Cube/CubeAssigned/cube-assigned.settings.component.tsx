import { observer } from "mobx-react";
import { CubeAssignedItem } from "./CubeAssignedItem";

const CubeAssigned = observer(() => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col leading-3">
        <h3 className="font-bold text-xl">Assign Tasks to Sides</h3>
        <p>Modify or assign tasks to your Prism</p>
      </div>

      <ol className="flex flex-col gap-6">
        <CubeAssignedItem />
        <CubeAssignedItem />
        <CubeAssignedItem />
        <CubeAssignedItem />
        <CubeAssignedItem />
      </ol>
    </div>
  );
});

export { CubeAssigned };
