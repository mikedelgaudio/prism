import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle.hook";
import { AuthLayout } from "../../Shared";

const Login = observer(() => {
  useTitle("Login - Prism");

  // const navigate = useNavigate();
  // const { currentUser, login } = useAuth();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Let's get started
      </h1>
      <form className="flex flex-col gap-8 pt-3">
        <div className="flex flex-col gap-2 leading-3">
          <label className="required" htmlFor="email">
            Email
          </label>
          <input
            className="border border-slate-400 p-2 rounded-md"
            id="email"
            type={"email"}
            autoComplete="email"
            required={true}
            placeholder="your-email@email.com"
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
            />
            <a className="underline hover:opacity-70" href="/reset-password">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
            Login
          </button>
          <div className="flex gap-1">
            <p>Need an account?</p>
            <Link className="underline hover:opacity-70" to={"/register"}>
              Register
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
});
export { Login };
