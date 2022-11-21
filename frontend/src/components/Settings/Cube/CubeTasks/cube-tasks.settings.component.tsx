import { observer } from "mobx-react";
import { CubeTaskItem } from "./CubeTaskItem";

const CubeTasks = observer(() => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col leading-3">
          <h3 className="font-bold text-xl">Tasks Pool</h3>
          <p>Update, add, or delete items in your task pool</p>{" "}
        </div>

        <button className="underline hover:no-underline">Add task</button>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CubeTaskItem />
        <CubeTaskItem />
        <CubeTaskItem />
        <CubeTaskItem />
        <CubeTaskItem />
        <CubeTaskItem />
        <CubeTaskItem />
        <CubeTaskItem />
      </ul>
    </div>
  );
});

export { CubeTasks };
