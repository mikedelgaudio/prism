import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../Shared";

const UnauthPwReset = observer(() => {
  // TODO
  // ! This functionality won't work without custom backend
  // ! https://stackoverflow.com/questions/51325629/firebase-how-to-send-a-password-reset-email-backend-with-nodejs
  // ! https://stackoverflow.com/questions/68114469/firebase-auth-update-not-signed-in-user-password-without-use-sendpasswordres
  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Reset Password
      </h1>
      <form className="flex flex-col gap-8 pt-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p>If your account exists, you'll receive an email to reset.</p>
            <p className="text-red-800">
              At this time, we are unable to process password resets without
              logging in.
            </p>
            <label className="required" htmlFor="email">
              Email
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="email"
              type={"email"}
              required={true}
              disabled={true}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            disabled={true}
          >
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
    </AuthLayout>
  );
});

export { UnauthPwReset };
