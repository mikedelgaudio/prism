import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { Card } from "../../Shared";
import { SettingsContext } from "../settings.context";
import { CubeAssigned } from "./CubeAssigned";
import { CubeTasks } from "./CubeTasks";

const Cube = observer(() => {
  const { settingsStore } = useContext(SettingsContext);

  useEffect(() => {
    (async () => settingsStore.getTasks())();
  }, []);

  return (
    <Card className="gap-6">
      <div className="border-b-2 pb-3 border-slate-500">
        <h2 className="font-bold text-3xl">Your Prism</h2>
      </div>

      <div className="flex flex-col gap-14">
        <CubeTasks />
        {settingsStore.tasks.length !== 0 ? <CubeAssigned /> : <></>}
      </div>
    </Card>
  );
});

export { Cube };
