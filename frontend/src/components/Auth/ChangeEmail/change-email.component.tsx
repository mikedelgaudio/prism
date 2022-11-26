import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle.hook";
import { AuthLayout } from "../../Shared";

const ChangeEmail = observer(() => {
  useTitle("Change Email - Prism");

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Change Email
      </h1>
      <form className="flex flex-col gap-8 pt-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="required" htmlFor="current-email">
              Current Email
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="current-email"
              type={"email"}
              required={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="required" htmlFor="new-email">
              New Email
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="new-email"
              type={"email"}
              required={true}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
            Change
          </button>
          <div className="flex gap-1">
            <p>Change your mind?</p>
            <Link className="underline hover:opacity-70" to={"/settings"}>
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
});

export { ChangeEmail };
