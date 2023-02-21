import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseContextNew } from "../../firebase/firebase.context.new";
import "./navbar.component.css";

const Navbar = observer(() => {
  const [toggled, setToggle] = useState(false);
  const { firebaseStore } = useContext(FirebaseContextNew);

  const navigated = () => {
    if (toggled) setToggle(toggled => (toggled = !toggled));
  };

  const authLinks = (
    <>
      <li>
        <NavLink
          className="rounded sm:text-base text-xl font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800	 focus:ring-offset-2"
          to="/dashboard/day"
          onClick={navigated}
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          className="rounded sm:text-base text-xl font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          to="/settings"
          onClick={navigated}
        >
          Settings
        </NavLink>
      </li>
    </>
  );

  const unAuthLinks = (
    <>
      <li>
        <a
          className="rounded sm:text-base text-xl font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          href="https://prismproductivity.com"
        >
          What's Prism?
        </a>
      </li>
    </>
  );

  const links = () => {
    return (
      <>
        {firebaseStore.authUser ? authLinks : unAuthLinks}

        {firebaseStore.authUser ? (
          <li>
            <NavLink
              className="flex items-center justify-center rounded-xl border border-slate-900 bg-transparent px-5 py-2 text-base font-semibold leading-7 text-slate-900 transition-all duration-200 hover:bg-slate-900 hover:text-white focus:bg-slate-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 w-full sm:w-auto"
              to="/logout"
              onClick={navigated}
            >
              Logout
            </NavLink>
          </li>
        ) : (
          <li>
            <a
              className="flex items-center justify-center rounded-xl border border-slate-900 bg-transparent px-5 py-2 text-base font-semibold leading-7 text-slate-900 transition-all duration-200 hover:bg-slate-900 hover:text-white focus:bg-slate-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 w-full sm:w-auto"
              href="mailto:prism@delgaudio.dev"
              onClick={navigated}
            >
              Contact
            </a>
          </li>
        )}
      </>
    );
  };

  const hamburgerMenu = () => {
    return (
      <>
        <div
          className={`hamburger-menu-button ${toggled ? "open" : ""} `}
          onClick={() => setToggle(toggled => (toggled = !toggled))}
        >
          <div className="hamburger-menu" />
        </div>
      </>
    );
  };

  return (
    <div className="py-4 bg-slate-50 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap items-center justify-between gap-4 w-auto">
          <NavLink
            className="flex items-center gap-2 text-xl  font-semibold rounded focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
            to="/"
          >
            <div aria-hidden={true}>
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 460.01 460.02"
                className="w-[30px] md:w-[45px]"
                aria-hidden={true}
              >
                <path
                  d="M446.35,93.99L239.34,1.98c-5.95-2.65-12.75-2.65-18.7,0L13.64,93.99c-.46,.21-.78,.55-1.24,.81-.64,.32-1.33,.53-1.93,.92-.51,.35-.9,.78-1.38,1.15-1.68,1.25-3.16,2.76-4.37,4.46-.46,.64-.94,1.22-1.36,1.86-.68,1.22-1.27,2.48-1.75,3.8-.21,.62-.53,1.2-.71,1.82-.58,2.02-.88,4.11-.9,6.21v230.01c0,9.11,5.34,17.32,13.66,21.02l207.01,92c2.99,1.33,6.16,1.98,9.34,1.98,3.2-.08,6.35-.83,9.25-2.21l.09,.23,207.01-92c8.31-3.69,13.67-11.93,13.66-21.02V115.01c0-9.09-5.35-17.34-13.66-21.02ZM230.01,48.19l150.38,66.82-150.38,66.82-30.08-13.36-120.27-53.45L230.01,48.19ZM46,330.09V150.41l161,71.55v179.66S46,330.09,46,330.09Zm207.01,71.53V221.96l161-71.55v179.68l-161,71.53Z"
                  style={{ fill: "#4d82c3" }}
                />
              </svg>
            </div>
            <div className="flex flex-col leading-4 ">
              <span className="font-extrabold text-[#4d82c3] uppercase ">
                Prism
              </span>
              <div>
                <span className="font-semibold uppercase text-slate-900">
                  productivity
                </span>
              </div>
            </div>
          </NavLink>
          <nav className="sm:block hidden">
            <ul className="flex list-none items-center gap-9">{links()}</ul>
          </nav>
          <span className="sm:hidden block">{hamburgerMenu()}</span>
        </div>
        {toggled ? (
          <nav className="sm:hidden block">
            <ul className="grid list-none flex-col items-start px-1 py-5 gap-4">
              {links()}
            </ul>
          </nav>
        ) : null}
      </div>
    </div>
  );
});

export { Navbar };
