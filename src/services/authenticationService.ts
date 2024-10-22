import { apiCall } from "./api";

const SIGNUP_ENDPOINT = "/auth/signup";
const LOGIN_ENDPOINT = "/auth/login";

export const callSignInWithEmailAndPassword = (
  email: string,
  password: string,
) => {
  return apiCall(LOGIN_ENDPOINT, "POST", { email, password });
};

export const signUpWithEmailAndPassword = (email: string, password: string) => {
  return apiCall(SIGNUP_ENDPOINT, "POST", { email, password });
};
