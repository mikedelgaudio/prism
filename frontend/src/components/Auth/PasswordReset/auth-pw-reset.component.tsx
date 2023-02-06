import { observer } from "mobx-react-lite";
import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContextNew } from "../../../firebase/firebase.context.new";
import { errorToMsg } from "../../../services/errors.service";
import { TOAST_SERVICE } from "../../../services/toast.service";
import { AuthLayout } from "../../Shared";
import { ReAuth } from "../Login";

const AuthPwReset = observer(() => {
  const navigate = useNavigate();
  const { firebaseStore } = useContext(FirebaseContextNew);

  const [reauth, setReauth] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== newPasswordConfirm) {
      const TOAST_ID = "PASSWORD_NO_MATCH";
      TOAST_SERVICE.error(TOAST_ID, "Passwords do not match", true);
      return;
    }

    try {
      setLoading(true);
      await firebaseStore.updateUserPassword(newPassword);
      const TOAST_ID = "SUCCESS_UPDATE_PASSWORD";
      TOAST_SERVICE.success(TOAST_ID, "Successfully updated password.", true);
      navigate("/settings");
    } catch (e: any) {
      const TOAST_ID = "FAILED_TO_UPDATE_PASSWORD";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }

    (e.target as HTMLFormElement).reset();
    setNewPassword("");
    setNewPasswordConfirm("");
    setLoading(false);
  };

  const resetPwForm = (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Reset Password
      </h1>
      <form className="flex flex-col gap-8 pt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="required" htmlFor="password">
              New Password
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="password"
              type={"password"}
              required={true}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="required" htmlFor="password-confirm">
              Confirm New Password
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="password-confirm"
              type={"password"}
              required={true}
              onChange={e => setNewPasswordConfirm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            Reset
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

  return (
    <>
      {reauth ? (
        <ReAuth toRoute="/reset-password" setReauth={setReauth} />
      ) : (
        resetPwForm
      )}
    </>
  );
});

export { AuthPwReset };
