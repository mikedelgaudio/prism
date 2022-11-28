import { observer } from "mobx-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../../../hooks/use-title";
import { TOAST_SERVICE } from "../../../services/toast.service";
import { AuthLayout } from "../../Shared";
import { useFirebaseAuth } from "../firebase.context";

const ReAuth = observer(({ toRoute }: { toRoute: string }) => {
  useTitle("Verify it's you - Prism");

  const navigate = useNavigate();
  const { currentUser, reauthUser } = useFirebaseAuth();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (reauthUser) await reauthUser(password);
      navigate(toRoute);
    } catch (e: any) {
      let errorMsg =
        "Unexpected error logging you in again. Please refresh the page and try again.";
      if (
        e?.message === "Firebase: Error (auth/wrong-password)." ||
        e?.message === "Firebase: Error (auth/user-not-found)."
      ) {
        errorMsg = "Invalid email or password";
      }
      const TOAST_ID = "FAILED_TO_REAUTH";
      TOAST_SERVICE.error(TOAST_ID, errorMsg, true);
    }

    (e.target as HTMLFormElement).reset();
    setPassword("");
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Verify it's you
      </h1>
      <form className="flex flex-col gap-8 pt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 leading-3">
          <label className="required" htmlFor="email">
            Email
          </label>
          <input
            className="border border-slate-400 p-2 rounded-md"
            id="email"
            type={"email"}
            value={currentUser?.email ?? ""}
          />
        </div>
        <div className="flex flex-col gap-2 leading-3">
          <label className="required" htmlFor="password">
            Password
          </label>
          <div className="flex flex-col gap-2">
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="password"
              type={"password"}
              autoComplete="current-password"
              required={true}
              onChange={e => setPassword(e.target.value)}
            />
            <a className="underline hover:opacity-70" href="/reset-password">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            Verify
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

export { ReAuth };
