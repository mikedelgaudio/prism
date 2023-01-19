import { observer } from "mobx-react";
import { useContext } from "react";
import { SettingsContext } from "../../settings.context";
import { CubeAssignedItem } from "./CubeAssignedItem";

const CubeAssigned = observer(() => {
  const { settingsStore } = useContext(SettingsContext);
  const tasks = settingsStore.assignedTasks;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col leading-3">
        <h3 className="font-bold text-xl">Assign Tasks to Sides</h3>
        <p>Modify or assign tasks to your Prism</p>
      </div>

      <ol className="flex flex-col gap-6">
        {tasks?.map(task => {
          return (
            <CubeAssignedItem key={`${task.id}-assigned-key`} id={task.id} />
          );
        })}
      </ol>
    </div>
  );
});

export { CubeAssigned };
