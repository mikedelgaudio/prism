import { observer } from "mobx-react";

const DashboardErrorComponent = observer(() => {
  return (
    <div className="relative py-6  bg-slate-100">
      <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold ">Something went wrong...</h1>
        <p>Please refresh the page.</p>
      </div>
    </div>
  );
});

export { DashboardErrorComponent };
