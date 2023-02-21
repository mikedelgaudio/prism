import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FirebaseContextNew } from "../../../firebase/firebase.context.new";
import { useTitle } from "../../../hooks/use-title";
import { TOAST_SERVICE } from "../../../services/toast.service";
import { AuthLayout } from "../../Shared";

const Logout = observer(() => {
  useTitle("Logged out - Prism");

  const navigate = useNavigate();
  const { firebaseStore } = useContext(FirebaseContextNew);

  useEffect(() => {
    async function handleLogout() {
      try {
        await firebaseStore.logout();
        const TOAST_ID = "SUCCESS_LOGOUT";
        TOAST_SERVICE.success(TOAST_ID, "Successfully logged out.", true);
      } catch {
        const TOAST_ID = "FAILED_TO_LOGOUT";
        TOAST_SERVICE.error(
          TOAST_ID,
          "Failed to logout. Please try again by refreshing the page.",
          false,
        );
      }
    }

    if (!firebaseStore.authUser) {
      navigate("/login");
    } else {
      handleLogout();
    }
  }, [navigate, firebaseStore.authUser]);

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        You've logged out
      </h1>
      <div className="flex flex-col pt-6 gap-1">
        <p>Miss us already?</p>
        <NavLink
          className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
          to={"/login"}
        >
          Login
        </NavLink>
      </div>
    </AuthLayout>
  );
});

export { Logout };
