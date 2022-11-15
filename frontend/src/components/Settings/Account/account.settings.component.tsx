import { observer } from "mobx-react";
import { Card } from "../../Shared";

const Account = observer(() => {
  return (
    <Card className="gap-6">
      <h2 className="font-bold text-3xl">Account</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <dl className="max-w-md text-slate-900 divide-y divide-slate-200">
          <div className="flex flex-col pb-3">
            <dt className="mb-1 text-slate-500 md:text-lg">Name</dt>
            <dd className="text-lg font-semibold text-slate-800">
              Mike DelGaudio
            </dd>
          </div>
          <div className="flex flex-col py-3">
            <dt className="mb-1 text-slate-500 md:text-lg">Email address</dt>
            <dd className="text-lg font-semibold text-slate-800">
              mdelgaud@stevens.edu
            </dd>
          </div>
          <div className="flex flex-col pt-3">
            <dt className="mb-1 text-slate-500 md:text-lg">Prism serial</dt>
            <dd className="text-lg font-semibold text-slate-800">
              7e16bfa3-d7a1-4450-8f67-caa22b9261c5
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
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  className="sr-only peer"
                />
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
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle2"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex flex-col leading-5">
                <span>Change email</span>
                <small>Need to update your email?</small>
              </div>

              <button className="underline hover:no-underline">Change</button>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex flex-col leading-5">
                <span>Reset password</span>
                <small>Forgot your password?</small>
              </div>

              <button className="underline hover:no-underline">Reset</button>
            </li>
          </ul>

          <div className="flex flex-col gap-4 border-2 border-red-400 p-6 rounded-xl">
            <h3 className="font-bold">Danger zone</h3>
            <ul className="flex flex-col gap-4 text-lg">
              <li className="flex justify-between items-center">
                <div className="flex flex-col leading-5">
                  <span>Disconnect Prism</span>
                  <small>
                    Removes connection between your Prism and account
                  </small>
                </div>

                <button className="underline hover:no-underline">
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

                <button className="underline hover:no-underline">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
});

export { Account };
