import * as authConstants from "../constants/authConstants";
import authServices from "../services/authServices";
import axios from "axios";

const register = async (dispatch, user) => {
  try {
    const { data } = await axios.post("/api/Users/register", user);
    if (data && data.message === "User registered successfully") {
      console.log("authService:register() Success:", user.email, "successfully registered.");
      dispatch({ type: authConstants.USER_REGISTER_SUCCESS });
      return { isRegistered: true, error: null };
    } else {
      console.error("authService:register() Error:", data);
      return { isRegistered: false, error: data };
    }
  } catch (error) {
    console.error("authService:register() Error:", error.response.statusText);
    console.error("Detailed Error:", error.response.data);
    return { isRegistered: false, error: error.response.statusText };
  }
};

export { register };

// export const login = async (dispatch, username, password) => {
//   dispatch({ type: authConstants.USER_LOGIN_REQUEST });
//   const data = await authServices.login(username, password);
//   if (data && data.user) {
//     return dispatch({
//       type: authConstants.USER_LOGIN_SUCCESS,
//       payload: data.user,
//     });
//   } else {
//     return dispatch({
//       type: authConstants.USER_LOGIN_FAILURE,
//       payload: data,
//     });
//   }
// };


export const login = async (dispatch, username, password) => {
  dispatch({ type: authConstants.USER_LOGIN_REQUEST });
  const data = await authServices.login(username, password);
  if (data.type === authConstants.USER_LOGIN_SUCCESS) {
    return dispatch({
      type: authConstants.USER_LOGIN_SUCCESS,
      payload: data.payload,
    });
  } else {
    return dispatch({
      type: authConstants.USER_LOGIN_FAILURE,
      payload: data.error,
    });
  }
};


export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  dispatch({ type: authConstants.USER_LOGOUT });
};