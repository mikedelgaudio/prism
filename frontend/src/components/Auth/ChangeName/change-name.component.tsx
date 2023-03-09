import { observer } from "mobx-react";
import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContextNew } from "../../../firebase/firebase.context.new";
import { useTitle } from "../../../hooks/use-title";
import { errorToMsg } from "../../../services/errors.service";
import { TOAST_SERVICE } from "../../../services/toast.service";
import { AuthLayout } from "../../Shared";

const ChangeName = observer(() => {
  useTitle("Change Name");

  const navigate = useNavigate();
  const { firebaseStore } = useContext(FirebaseContextNew);

  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (firebaseStore.authUser?.displayName !== newName) {
        setLoading(true);
        await firebaseStore.updateDisplayName(newName);
        const TOAST_ID = "SUCCESS_UPDATE_NAME";
        TOAST_SERVICE.success(TOAST_ID, "Successfully updated name.", true);
      }

      navigate("/settings");
    } catch (e: any) {
      const TOAST_ID = "FAILED_TO_UPDATE_EMAIL";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }

    (e.target as HTMLFormElement).reset();
    setNewName("");
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Change Name
      </h1>
      <form className="flex flex-col gap-8 pt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="required" htmlFor="new-name">
              New Name
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="new-name"
              type={"text"}
              required={true}
              onChange={e => setNewName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
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

export { ChangeName };
