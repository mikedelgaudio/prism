import { observer } from "mobx-react";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FirebaseContextNew } from "../../../firebase/firebase.context.new";

const Header = observer(() => {
  const { pathname } = useLocation();
  const weekView = pathname === "/dashboard/week";

  const { firebaseStore } = useContext(FirebaseContextNew);

  const btnStyle =
    "flex items-center justify-center rounded-xl border border-slate-900 px-5 py-3 text-base lg:text-xl font-semibold leading-7 transition-all duration-200 hover:bg-slate-900 hover:text-white focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2";

  return (
    <div className="flex flex-col gap-6 border-b-2 pb-6 border-slate-500 md:gap-0 md:flex-row md:justify-between md:items-center">
      <div className="flex flex-col gap-0">
        <div className="leading-3">
          <small className="font-bold pl-1 uppercase tracking-widest">
            Dashboard
          </small>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
            {weekView
              ? "Week review"
              : `Great to see you ${firebaseStore.authUser?.displayName ?? ""}`}
          </h1>
        </div>

        {weekView ? (
          <p className="pl-1">Track your improvement</p>
        ) : (
          <p className="pl-1">Here's how you're doing daily</p>
        )}
      </div>
      <div className="flex gap-4 justify-center md:justify-start">
        <NavLink
          className={({ isActive }) =>
            isActive || pathname === "/"
              ? `${btnStyle} bg-slate-900 text-white`
              : `${btnStyle} bg-transparent text-slate-900`
          }
          to={"/dashboard/day"}
        >
          Day
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${btnStyle} bg-slate-900 text-white`
              : `${btnStyle} bg-transparent text-slate-900`
          }
          to={"/dashboard/week"}
        >
          Week
        </NavLink>
      </div>
    </div>
  );
});

export { Header };
