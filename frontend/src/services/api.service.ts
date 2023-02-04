import axios from "axios";
import { getAuth, User } from "firebase/auth";

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
    console.error(e);
  }
};

export const postRequest = async (url: string, body: any, user?: User) => {
  let userToken;
  if (!url) throw "No URL was provided";

  if (user) {
    userToken = await user.getIdToken();
    if (!userToken) {
      throw "Failed to retrieve user token.";
    }
  }

  const { data } = await axios.post(url, body, {
    headers: {
      ...(userToken && { token: userToken }),
      "Content-Type": "application/json",
    },
  });

  return data;
};
