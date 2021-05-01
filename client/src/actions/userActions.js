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
      payload: data.data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data.data));
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

export const userData = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_DATA_REQUEST",
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      "http://localhost:8080/api/user/profile/" + id,
      config
    );
    dispatch({
      type: "USER_DATA_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "ADD_MESSAGE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getFriendsList = (id,token) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_FRIENDS_REQUEST",
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      "http://localhost:8080/api/user/getfriend/"+id,
      config
    );
    dispatch({
      type: "USER_FRIENDS_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "ADD_MESSAGE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMe = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      "http://localhost:8080/api/user/profile/" + id,
      config
    );
    const user = { ...data.user, token };
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: user,
    });
    localStorage.setItem("userInfo", JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: "ADD_MESSAGE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addUser = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "http://localhost:8080/api/user/adduser",

      { user: id },
      config
    );
    console.log(data);
    dispatch({
      type: "USER_DATA_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "ADD_MESSAGE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "http://localhost:8080/api/user/deleteuser",

      { user: id },
      config
    );
    console.log(data);
    dispatch({
      type: "USER_DATA_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "ADD_MESSAGE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cancel = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "http://localhost:8080/api/user/canceluser",

      { user: id },
      config
    );
    console.log(data);
    dispatch({
      type: "USER_DATA_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "ADD_MESSAGE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const acceptUser = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "http://localhost:8080/api/user/acceptuser",

      { user: id },
      config
    );
    dispatch({
      type: "USER_DATA_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "ADD_MESSAGE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userChatAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_CHAT_REQUEST",
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      "http://localhost:8080/api/user/profile/" + id,
      config
    );
    console.log(data);
    dispatch({
      type: "USER_CHAT_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "ADD_MESSAGE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
