import { observer } from "mobx-react";

const CubeDiagnosticListItem = observer(() => {
  return (
    <li
      className="flex flex-col gap-4 p-6 bg-slate-100 rounded-xl"
      aria-expanded={false}
    >
      <p>Power</p>
      <p>Lights</p>
      <p>Buzzer</p>
    </li>
  );
});

export { CubeDiagnosticListItem };
