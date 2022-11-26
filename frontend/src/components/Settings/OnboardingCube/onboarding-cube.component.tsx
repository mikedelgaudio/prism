import { observer } from "mobx-react";
import { Card } from "../../Shared";

const OnboardingCube = observer(() => {
  return (
    <Card className="gap-6">
      <div className="border-b-2 pb-3 border-slate-500">
        <h2 className="font-bold text-3xl">Setup your Prism</h2>
      </div>

      <div className="flex flex-col gap-14"></div>
    </Card>
  );
});

export { OnboardingCube };
