import { admin } from "../../config/firebase.config";

const unauthResetPassword = async (email: string): Promise<any> => {
  try {
    await admin.auth().generatePasswordResetLink(email);
    // TODO
    // Send email
  } catch (e: any) {
    // Do Nothing
  }
};

export { unauthResetPassword };
