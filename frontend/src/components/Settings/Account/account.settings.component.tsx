import { observer } from "mobx-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../../firebase/firebase.context";
import { TOAST_SERVICE } from "../../../services/toast.service";
import { Card } from "../../Shared";
import { SettingsContext } from "../settings.context";

const Account = observer(() => {
  const { currentUser, sendVerificationEmail, profile } = useFirebaseAuth();
  const { settingsStore } = useContext(SettingsContext);

  // TODO
  // ! Update a11y on toggle switches

  const verifyEmail = async () => {
    try {
      if (sendVerificationEmail)
        await sendVerificationEmail().then(() => {
          const TOAST_ID = "VERIFY_YOUR_EMAIL";
          TOAST_SERVICE.success(
            TOAST_ID,
            `Verify your email ${currentUser?.email}`,
            false,
          );
        });
    } catch (e) {
      const TOAST_ID = "FAILED_TO_SEND_EMAIL";
      TOAST_SERVICE.error(TOAST_ID, "Failed to send email", true);
    }
  };

  return (
    <Card className="gap-6">
      <div className="border-b-2 pb-3 border-slate-500">
        <h2 className="font-bold text-3xl">Account</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <dl className="max-w-md text-slate-900 divide-y divide-slate-200">
          <div className="flex flex-col pb-3">
            <dt className="mb-1 text-slate-500 md:text-lg">Name</dt>
            <dd className="text-lg font-semibold text-slate-800">
              {currentUser?.displayName ?? "N/A"}
            </dd>
          </div>
          <div className="flex flex-col py-3">
            <dt className="mb-1 text-slate-500 md:text-lg">Email address</dt>
            <dd className="text-lg font-semibold text-slate-800">
              {currentUser?.email ?? "N/A"}{" "}
              {currentUser?.emailVerified ? (
                <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                  Verified
                </span>
              ) : (
                <>
                  <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                    Not verified
                  </span>
                  <button
                    className="text-sm underline hover:no-underline"
                    onClick={() => verifyEmail()}
                  >
                    Resend
                  </button>
                </>
              )}
            </dd>
          </div>
          <div className="flex flex-col pt-3">
            <dt className="mb-1 text-slate-500 md:text-lg">Prism serial</dt>
            <dd className="text-lg font-semibold text-slate-800">
              {settingsStore?.profile?.prismId}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-4 text-lg ">
            <li className="flex justify-between items-center">
              <div className="flex flex-col leading-5">
                <span>Weekly progress emails</span>
                <small>Email notifications of your weekly progress</small>
              </div>

              <label
                htmlFor="default-toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                {/* <input
                  type="checkbox"
                  id="default-toggle"
                  className="sr-only peer"
                  checked={profile?.progressEmail}
                  // onChange={() => profileStore.toggleProgressEmail()}
                /> */}
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex flex-col leading-5">
                <span>Time to stand reminder</span>
                <small>Buzz reminder to stand each hour</small>
              </div>

              <label
                htmlFor="default-toggle2"
                className="inline-flex relative items-center cursor-pointer"
              >
                {/* <input
                  type="checkbox"
                  id="default-toggle2"
                  className="sr-only peer"
                  checked={profile?.timeToStand}
                  // onChange={() => profileStore.toggleTimeToStand()}
                /> */}
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex flex-col leading-5">
                <span>Change email</span>
                <small>Need to update your email?</small>
              </div>
              <Link
                className="underline hover:no-underline"
                to={"/change-email"}
              >
                Change
              </Link>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex flex-col leading-5">
                <span>Reset password</span>
                <small>Forgot your password?</small>
              </div>
              <Link
                className="underline hover:no-underline"
                to={"/reset-password"}
              >
                Reset
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-2 border-red-400 p-6 rounded-xl">
        <h3 className="font-bold">Danger zone</h3>
        <ul className="flex flex-col gap-4 text-lg">
          <li className="flex justify-between items-center">
            <div className="flex flex-col leading-5">
              <span>Disconnect Prism</span>
              <small>Removes connection between your Prism and account</small>
            </div>

            <button
              className="underline hover:no-underline disabled:opacity-50 disabled:no-underline"
              // onClick={() => profileStore.disconnectPrism()}
              disabled={profile?.prismId === ""}
            >
              Disconnect
            </button>
          </li>
          <li className="flex justify-between items-center">
            <div className="flex flex-col leading-5">
              <span>Delete account</span>
              <small>
                Removes all account data and resets Prism connection
              </small>
            </div>
            <Link
              className="underline hover:no-underline"
              to={"/delete-account"}
            >
              Delete
            </Link>
          </li>
        </ul>
      </div>
    </Card>
  );
});

export { Account };
