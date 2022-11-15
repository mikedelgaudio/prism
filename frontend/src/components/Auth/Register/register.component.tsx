import { Link } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle.hook";

const Register = () => {
  useTitle("Register Prism");
  return (
    <section
      id="home"
      className="relative py-12 sm:py-16 lg:pt-10 lg:pb-30 xl:pt-20 xl:pb-36 bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-5 flex-col lg:flex-row lg:gap-20 items-center justify-center">
          <div className="max-w-md sm:max-w-xl w-full">
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
              Create an account
            </h1>
            <form className="flex flex-col gap-8 pt-3">
              <div className="flex flex-col gap-2 leading-3">
                <h2 className="font-semibold text-xl">How we'll greet you</h2>
                <label className="required" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="border border-slate-400 p-2 rounded-md"
                  id="firstName"
                  type={"text"}
                  required={true}
                  placeholder="Joe"
                />
                <label className="required" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="border border-slate-400 p-2 rounded-md"
                  id="lastName"
                  type={"text"}
                  required={true}
                  placeholder="Blow"
                />
              </div>

              <div className="flex flex-col gap-3 leading-3">
                <h2 className="font-semibold text-xl">How you'll login</h2>
                <div className="flex flex-col gap-2">
                  <label className="required" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="border border-slate-400 p-2 rounded-md"
                    id="email"
                    type={"email"}
                    required={true}
                    placeholder="your-email@email.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
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
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-xl">Register your Prism</h2>
                <div className="flex flex-col gap-2 leading-3">
                  <label className="required" htmlFor="serial">
                    Serial number
                  </label>
                  <input
                    className="border border-slate-400 p-2 rounded-md"
                    id="serial"
                    type={"text"}
                    required={true}
                    placeholder="XXXX-XXXX-XXXX"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <button className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
                  Create
                </button>
                <div className="flex gap-1">
                  <Link className="underline hover:opacity-70" to={"/login"}>
                    Already have an account?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export { Register };
