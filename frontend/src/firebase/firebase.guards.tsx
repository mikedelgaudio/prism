import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { FirebaseContextNew } from "./firebase.context.new";

const RequireAuth = observer(({ children }: { children: any }) => {
  const { firebaseStore } = useContext(FirebaseContextNew);
  const location = useLocation();

  if (!firebaseStore.authUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
});

const RequireUnAuth = observer(({ children }: { children: any }) => {
  const { firebaseStore } = useContext(FirebaseContextNew);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (firebaseStore.authUser) {
    return <Navigate to={from} state={{ from: location }} />;
  }

  return children;
});

export const FirebaseGuards = {
  RequireAuth,
  RequireUnAuth,
};
