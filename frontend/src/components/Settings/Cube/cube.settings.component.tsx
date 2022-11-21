import { observer } from "mobx-react";
import { Card } from "../../Shared";
import { CubeAssigned } from "./CubeAssigned/cube-assigned.settings.component";
import { CubeTasks } from "./CubeTasks";

const Cube = observer(() => {
  return (
    <Card className="gap-6">
      <div className="border-b-2 pb-3 border-slate-500">
        <h2 className="font-bold text-3xl">Your Prism</h2>
      </div>

      <CubeTasks />
      <CubeAssigned />
    </Card>
  );
});

export { Cube };
