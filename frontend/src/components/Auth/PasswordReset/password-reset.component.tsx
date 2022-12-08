import { observer } from "mobx-react";
import { AuthPwReset, UnauthPwReset } from ".";
import { useFirebaseAuth } from "../../../firebase/firebase.context";
import { useTitle } from "../../../hooks/use-title";

const PasswordReset = observer(() => {
  useTitle("Reset Password - Prism");
  const { currentUser } = useFirebaseAuth();

  return <>{currentUser ? <AuthPwReset /> : <UnauthPwReset />}</>;
});

export { PasswordReset };
