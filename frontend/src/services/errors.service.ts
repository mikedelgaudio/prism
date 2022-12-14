export const ERROR_USER_IS_NULL =
  "Your session expired, please login by refreshing the page.";
export const ERROR_INVALID_INPUT = "Invalid fields provided, please try again.";
export const ERROR_INVALID_CURRENT_EMAIL =
  "The current email you've provided does not match. Please verify there are no typos.";

const ERROR_UNEXPECTED =
  "Unexpected error occurred. Please refresh the page and try again.";
const ERROR_FIREBASE_WRONG_PASSWORD = "Firebase: Error (auth/wrong-password).";
const ERROR_FIREBASE_USER_NOT_FOUND = "Firebase: Error (auth/user-not-found).";
const ERROR_FIREBASE_USER_MISMATCH = "Firebase: Error (auth/user-mismatch).";
const ERROR_INVALID_CREDENTIALS =
  "The provided email or password are not valid. Please verify there are no typos.";
const ERROR_FIREBASE_USER_EXISTS =
  "Firebase: Error (auth/email-already-in-use).";
const ERROR_USER_EXISTS =
  "The email provided is already a registered user. Please login or register with a new email.";

export const errorToMsg = (e: any): string => {
  let message = ERROR_UNEXPECTED;

  switch (e?.message) {
    case ERROR_FIREBASE_WRONG_PASSWORD:
    case ERROR_FIREBASE_USER_MISMATCH:
    case ERROR_FIREBASE_USER_NOT_FOUND:
      message = ERROR_INVALID_CREDENTIALS;
      break;

    case ERROR_USER_IS_NULL:
      message = ERROR_USER_IS_NULL;
      break;

    case ERROR_INVALID_INPUT:
      message = ERROR_INVALID_INPUT;
      break;

    case ERROR_INVALID_CURRENT_EMAIL:
      message = ERROR_INVALID_CURRENT_EMAIL;
      break;

    case ERROR_FIREBASE_USER_EXISTS:
      message = ERROR_USER_EXISTS;
      break;

    default:
      break;
  }

  return message;
};
