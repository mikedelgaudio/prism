import { observer } from "mobx-react";
import { AuthPwReset, UnauthPwReset } from ".";
import { useTitle } from "../../../hooks/use-title";
import { AuthLayout } from "../../Shared";
import { useFirebaseAuth } from "../firebase.context";

const PasswordReset = observer(() => {
  useTitle("Reset Password - Prism");
  const { currentUser } = useFirebaseAuth();

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Reset Password
      </h1>
      {currentUser ? <AuthPwReset /> : <UnauthPwReset />}
    </AuthLayout>
  );
});

export { PasswordReset };
