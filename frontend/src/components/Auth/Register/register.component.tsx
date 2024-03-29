import { observer } from "mobx-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContextNew } from "../../../firebase/firebase.context.new";
import { useTitle } from "../../../hooks/use-title";
import { errorToMsg } from "../../../services/errors.service";
import { TOAST_SERVICE } from "../../../services/toast.service";
import { AuthLayout } from "../../Shared";

const Register = observer(() => {
  useTitle("Register");
  const navigate = useNavigate();
  const { firebaseStore } = useContext(FirebaseContextNew);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [prismId, setPrismId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firebaseStore.authUser) {
      navigate("/");
    }
  }, [firebaseStore.authUser, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const TOAST_ID = "PASSWORD_NO_MATCH";
      TOAST_SERVICE.error(TOAST_ID, "Passwords do not match", true);
      return;
    }

    try {
      setLoading(true);
      await firebaseStore.register(email, password, prismId, name);

      // TODO Use React Mutation to ensure finished
      navigate("/dashboard/day");
    } catch (e) {
      try {
        await firebaseStore.deleteAccount();
      } catch (e) {
        console.warn("Failed to rollback");
      }

      const TOAST_ID = "FAILED_TO_REGISTER";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }

    (e.target as HTMLFormElement).reset();
    setName("");
    setEmail("");
    setPassword("");
    setPrismId("");
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Create an account
      </h1>
      <form className="flex flex-col gap-8 pt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 leading-3">
          <h2 className="font-semibold text-2xl">How we'll greet you</h2>

          <label className="required" htmlFor="name">
            Name
          </label>
          <input
            className="border border-slate-400 p-2 rounded-md"
            id="lastName"
            type={"text"}
            required={true}
            placeholder="Joe Smith"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 leading-3">
          <h2 className="font-semibold text-2xl">How you'll login</h2>
          <div className="flex flex-col gap-2">
            <label className="required" htmlFor="email">
              Email
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="email"
              type={"email"}
              required={true}
              autoComplete="email"
              placeholder="your-email@email.com"
              onChange={e => setEmail(e.target.value)}
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
              autoComplete="current-password"
              required={true}
              onChange={e => setPassword(e.target.value)}
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
              autoComplete="current-password"
              required={true}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-2xl">Register your Prism</h2>
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
              onChange={e => setPrismId(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            Create
          </button>
          <div className="flex gap-1">
            <Link className="underline hover:opacity-70" to={"/login"}>
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
});
export { Register };
