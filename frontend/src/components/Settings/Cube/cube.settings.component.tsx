import { observer } from "mobx-react";
import { Card } from "../../Shared";
import { CubeDiagnosticListItem } from "./CubeDiagnosticListItem/cube-diagnostic-list-item.settings.componet";
import { CubeListItem } from "./CubeListItem";

const Cube = observer(() => {
  return (
    <Card className="gap-6">
      <div>
        <h2 className="font-bold text-3xl">Your Prism</h2>
        <p>Customize five sides to your liking</p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CubeListItem />
        <CubeListItem />
        <CubeListItem />
        <CubeListItem />
        <CubeListItem />
        <CubeDiagnosticListItem />
      </ul>
    </Card>
  );
});

export { Cube };
