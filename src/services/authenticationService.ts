import { apiCall } from "./api";

const SIGNUP_ENDPOINT = "/auth/signup";
const LOGIN_ENDPOINT = "/auth/login";

export const callSignInWithEmailAndPassword = (email, password) => {
  return apiCall(LOGIN_ENDPOINT, "POST", { email, password });
};

export const signUpWithEmailAndPassword = (email, password) => {
  return apiCall(SIGNUP_ENDPOINT, "POST", { email, password });
};
