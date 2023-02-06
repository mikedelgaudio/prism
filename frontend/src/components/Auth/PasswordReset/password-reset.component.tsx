import { observer } from "mobx-react";
import { useContext } from "react";
import { AuthPwReset, UnauthPwReset } from ".";
import { FirebaseContextNew } from "../../../firebase/firebase.context.new";
import { useTitle } from "../../../hooks/use-title";

const PasswordReset = observer(() => {
  useTitle("Reset Password - Prism");
  const { firebaseStore } = useContext(FirebaseContextNew);

  return <>{firebaseStore.authUser ? <AuthPwReset /> : <UnauthPwReset />}</>;
});

export { PasswordReset };
