import axios from "axios";
import * as authConstants from "../constants/authConstants";

const register = async (user) => {
  try {
    const { data } = await axios.post("/api/Users/register", user);
    if (data && data.userId) {
      console.log(
        "authService:register() Success: ",
        user.username,
        " successfully registered."
      );
      return { isRegistered: true, error: null };
    } else {
      console.error("authService:register() Error: ", data);
      return { isRegistered: false, error: data };
    }
  } catch (error) {
    console.error("authService:register() Error: ", error.response.statusText);
    console.error("Detailed Error: ", error.response.data);
    return { isRegistered: false, error: error.response.statusText };
  }
};

const login = async (username, password) => {
  try {
    const { data } = await axios.post("/api/Users/login", {
      username,
      password,
    });

    if (data && data.jwtToken.length) {
      console.log("authService:login() Success: ", data.user);
      return {
        type: authConstants.USER_LOGIN_SUCCESS,
        payload: {
          user: data.user,
          jwtToken: data.jwtToken,
        },
      };
    } else {
      console.error("authService:login() Error: ", data);
      return { type: authConstants.USER_LOGIN_FAILURE, error: data };
    }
  } catch (error) {
    console.error("authService:login() Error: ", error.response.statusText);
    return { type: authConstants.USER_LOGIN_FAILURE, error: error.response.statusText };
  }
};

const authServices = { login };

export default authServices;
