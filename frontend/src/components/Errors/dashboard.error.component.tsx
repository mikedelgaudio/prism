import { observer } from "mobx-react";

const DashboardErrorComponent = observer(() => {
  return (
    <>
      <h1>Something went wrong...</h1>
      <p>Please refresh the page.</p>
    </>
  );
});

export { DashboardErrorComponent };
