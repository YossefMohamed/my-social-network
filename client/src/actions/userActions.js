import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/user/signin", {
      email,
      password,
    });
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_REGISTER_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/user/signup", {
      name,
      email,
      password,
    });
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data.data,
    });
    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data.data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
