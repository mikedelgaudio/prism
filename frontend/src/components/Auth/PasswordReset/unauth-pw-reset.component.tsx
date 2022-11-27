import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const UnauthPwReset = observer(() => {
  return (
    <form className="flex flex-col gap-8 pt-3">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p>If your account exists, you'll receive an email to reset.</p>
          <label className="required" htmlFor="email">
            Email
          </label>
          <input
            className="border border-slate-400 p-2 rounded-md"
            id="email"
            type={"email"}
            required={true}
          />
        </div>
        {/* <div className="flex flex-col gap-2">
          <label className="required" htmlFor="password">
            Password
          </label>
          <input
            className="border border-slate-400 p-2 rounded-md"
            id="password"
            type={"password"}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="required" htmlFor="password-confirm">
            Confirm Password
          </label>
          <input
            className="border border-slate-400 p-2 rounded-md"
            id="password-confirm"
            type={"password"}
            required={true}
          />
        </div> */}
      </div>

      <div className="flex flex-col gap-1">
        <button className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
          Request
        </button>
        <div className="flex gap-1">
          <p>Change your mind?</p>

          <Link className="underline hover:opacity-70" to={"/login"}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
});

export { UnauthPwReset };
