import { observer } from "mobx-react";

const CubeTasks = observer(() => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex flex-col leading-3">
          <h3 className="font-bold text-xl">Modify Task Pool</h3>
          <p>Update, add, or delete items in your task pool</p>{" "}
        </div>

        <button>Add task</button>
      </div>

      {/* <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <li className="flex gap-4 p-6 bg-slate-100 rounded-xl"></li>
      </ul> */}
    </div>
  );
});

export { CubeTasks };
