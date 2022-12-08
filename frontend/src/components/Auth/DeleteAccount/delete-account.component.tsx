import { observer } from "mobx-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../../firebase/firebase.context";
import { useTitle } from "../../../hooks/use-title";
import { errorToMsg } from "../../../services/errors.service";
import { TOAST_SERVICE } from "../../../services/toast.service";
import { AuthLayout } from "../../Shared";
import { ReAuth } from "../Login";

const DeleteAccount = observer(() => {
  useTitle("Delete Account - Prism");

  const navigate = useNavigate();
  const { deleteAccount } = useFirebaseAuth();

  const [reauth, setReauth] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (deleteAccount) await deleteAccount();
      else throw new Error();

      // TODO
      // ! Must disconnect Prism too

      const TOAST_ID = "SUCCESS_DELETE_ACCOUNT";
      TOAST_SERVICE.success(TOAST_ID, "Successfully deleted account.", true);
      navigate("/login");
    } catch (e: any) {
      const TOAST_ID = "FAILED_TO_DELETE_ACCOUNT";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }

    (e.target as HTMLFormElement).reset();
    setLoading(false);
  };

  const confirmDeleteLayout = (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Delete Account
      </h1>
      <form className="flex flex-col gap-8 pt-3" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-xl">
            Are you sure you want to delete your account?
          </h2>
          <p>
            Deleting your account removes all of your data and disconnects your
            Prism.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            Delete
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
        <ReAuth toRoute="/delete-account" setReauth={setReauth} />
      ) : (
        confirmDeleteLayout
      )}
    </>
  );
});

export { DeleteAccount };
