import { observer } from "mobx-react";

const CubeAssigned = observer(() => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col leading-3">
        <h3 className="font-bold text-xl">Assign Tasks to Sides</h3>
        <p>Modify or assign tasks to your Prism</p>
      </div>

      {/* <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CubeTaskItem />
      </ul> */}
    </div>
  );
});

export { CubeAssigned };
