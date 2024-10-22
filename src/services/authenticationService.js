const SIGNUP_ENDPOINT_URL = "http://localhost:8080/api/auth/signup";
const LOGIN_ENDPOINT_URL = "http://localhost:8080/api/auth/login";

export const callSignInWithEmailAndPassword = async (email, password) => {
  try {
    const response = await fetch(LOGIN_ENDPOINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error signing up:", error.code + error.message);
    throw error;
  }
};

export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const response = await fetch(SIGNUP_ENDPOINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log("response: ", response);
    return response;
  } catch (error) {
    console.error("Error signing up:", error.code + error.message);
    throw error;
  }
};
