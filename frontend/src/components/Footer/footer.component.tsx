import { observer } from "mobx-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseContextNew } from "../../firebase/firebase.context.new";

const Footer = observer(() => {
  const { firebaseStore } = useContext(FirebaseContextNew);

  const authLinks = (
    <>
      <li>
        <NavLink
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800	 focus:ring-offset-2"
          to={"/dashboard/day"}
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          to={"/settings"}
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
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          href="https://sd.delgaudio.dev"
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

        <li>
          <a
            className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
            href="mailto:mdelgaud@stevens.edu"
            target="_blank"
          >
            Contact
          </a>
        </li>
      </>
    );
  };
  return (
    <section className="relative py-12 bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-col">
          <NavLink
            className="text-3xl lg:text-4xl font-semibold rounded text-slate-900 transition-all duration-200 hover:text-opacity-50 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
            to={"/"}
          >
            Prism
          </NavLink>
          <nav className="pt-1">
            <ul className="flex list-none items-center gap-9">{links()}</ul>
          </nav>
          <p className="text-slate-500 pt-6  text-sm">Made in Hoboken, NJ</p>
        </div>
      </div>
    </section>
  );
});

export { Footer };
