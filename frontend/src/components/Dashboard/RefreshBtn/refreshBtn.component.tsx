import { observer } from "mobx-react";

const RefreshBtn = observer(({ iconMode = false }: { iconMode: boolean }) => {
  const message = iconMode ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 20q-3.35 0-5.675-2.325Q4 15.35 4 12q0-3.35 2.325-5.675Q8.65 4 12 4q1.725 0 3.3.713q1.575.712 2.7 2.037V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2Q13.625 6 12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325Q14.75 20 12 20Z"
      />
    </svg>
  ) : (
    <>Reload data</>
  );

  return (
    <button
      className="flex items-center justify-center rounded-xl border border-slate-900 py-1 px-2 text-base font-semibold leading-7 transition-all duration-200 hover:bg-slate-900 hover:text-white focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-white"
      onClick={() => window.location.reload()}
    >
      {message}
    </button>
  );
});

export { RefreshBtn };
