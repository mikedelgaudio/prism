import axios from "axios";
import { getAuth } from "firebase/auth";
import { errorToMsg } from "./errors.service";
import { TOAST_SERVICE } from "./toast.service";

export const API_URL = import.meta.env.PROD
  ? "https://api.prismproductivity.com"
  : "http://localhost:3001";

export const getRequest = async (url: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Unauthorized");

    const userToken = await user.getIdToken();
    if (!userToken) throw new Error("Failed to retrieve user token.");

    const { data } = await axios.get(url, {
      headers: {
        token: userToken,
      },
    });

    return data;
  } catch (e) {
    const TOAST_ID = "ERROR_FAILED_TO_GET";
    TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
  }
};

export const postRequest = async (url: string, body: any) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Unauthorized");

    const userToken = await user.getIdToken();
    if (!userToken) throw new Error("Failed to retrieve user token.");

    const { data } = await axios.post(url, body, {
      headers: {
        token: userToken,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (e) {
    const TOAST_ID = "ERROR_FAILED_TO_POST";
    TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
  }
};
