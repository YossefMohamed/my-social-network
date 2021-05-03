import axios from "axios";

export const getMessages = (id, token) => async (dispatch, getState) => {
  try {
    // console.log("DDDDDDDDD");
    // console.log("DDDDDDDDD");
    // console.log("DDDDDDDDD");

    dispatch({
      type: "CHAT_REQUEST",
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/message/get/" + id, config);
    dispatch({
      type: "CHAT_SUCCESS",
      payload: data.data,
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
export const sendMessage = (message, id, token) => async (
  dispatch,
  getState
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "/api/message/add/" + id,
      {
        content: message,
      },
      config
    );
    console.log(data);
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

export const getChatList = (chatList, token) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CHAT_LIST_REQUEST",
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "/api/message/chatlist",
      { chatList },
      config
    );
    console.log(data.data);
    console.log(data.data);
    console.log(data.data);
    dispatch({
      type: "CHAT_LIST_SUCCESS",
      payload: data.data,
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
