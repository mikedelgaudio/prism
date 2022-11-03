import { DayCard } from "./DayCard";

const Dashboard = () => {
  return (
    <>
      <section id="home" className="relative py-6 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
                Welcome Mike
              </h1>
              <p className="pl-1">You got this today!</p>
            </div>
            <div className="flex gap-4">
              {/* Disabled when in day view, otherwise allow them to swap views? */}
              <button
                disabled={true}
                className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-base lg:text-xl font-semibold leading-7 text-white disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:hover:text-white transition-all  duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
              >
                Day
              </button>
              <button className="flex items-center justify-center rounded-xl border border-slate-900 bg-transparent px-5 py-2 text-base lg:text-xl font-semibold leading-7 text-slate-900 transition-all duration-200 hover:bg-slate-900 hover:text-white focus:bg-slate-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 w-full sm:w-auto">
                Week
              </button>
            </div>
          </div>

          <section className="py-6">
            <DayCard />
          </section>
        </div>
      </section>
    </>
  );
};

export { Dashboard };
