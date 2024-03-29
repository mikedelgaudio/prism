import { observer } from "mobx-react";
import { useContext } from "react";
import { SettingsContext } from "../../settings.context";
import { CubeTaskItem } from "./CubeTaskItem";

const CubeTasks = observer(() => {
  const { settingsStore } = useContext(SettingsContext);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center flex-col sm:flex-row">
        <div className="flex flex-col leading-4">
          <h3 className="font-bold text-xl">Tasks Pool</h3>
          <p>Update, add, or delete items in your task pool</p>{" "}
        </div>

        <button
          className="underline hover:no-underline"
          onClick={async () => await settingsStore.addTask()}
        >
          Add task
        </button>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsStore.tasks?.length !== 0 ? (
          settingsStore.tasks?.map(task => {
            return <CubeTaskItem key={`${task.id}-item`} id={task.id} />;
          })
        ) : (
          <p className="font-semibold">No tasks found</p>
        )}
      </ul>
    </div>
  );
});

export { CubeTasks };
