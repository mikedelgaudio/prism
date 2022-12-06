import { observer } from "mobx-react";
import { AuthPwReset, UnauthPwReset } from ".";
import { useTitle } from "../../../hooks/use-title";
import { useFirebaseAuth } from "../firebase.context";

const PasswordReset = observer(() => {
  useTitle("Reset Password - Prism");
  const { currentUser } = useFirebaseAuth();

  return <>{currentUser ? <AuthPwReset /> : <UnauthPwReset />}</>;
});

export { PasswordReset };
