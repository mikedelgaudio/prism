import { observer } from "mobx-react";
import { FormEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, unauthPostRequest } from "../../../services/api.service";
import { TOAST_SERVICE } from "../../../services/toast.service";
import { AuthLayout } from "../../Shared";

const UnauthPwReset = observer(() => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const mutation = useMutation((email: string) => {
    return unauthPostRequest(`${API_URL}/profile/unauth-reset`, {
      email: email,
    });
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(email);
    (e.target as HTMLFormElement).reset();
    setEmail("");
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      const TOAST_ID = "SUCCESS_REQUEST_PW";
      TOAST_SERVICE.success(
        TOAST_ID,
        "Successfully requested password reset. Please check your email.",
        true,
      );
      navigate("/login");
    }
  }, [mutation.isSuccess]);

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Reset Password
      </h1>
      <p>If your account exists, you'll receive an email to reset.</p>
      <form className="flex flex-col gap-8 pt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="required" htmlFor="email">
              Email
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="email"
              type={"email"}
              required={true}
              onChange={e => setEmail(e.target.value)}
              disabled={mutation.isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Requesting..." : "Request"}
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
