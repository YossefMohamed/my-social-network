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

    const { data } = await axios.get(
      "http://localhost:8080/api/message/get/" + id,
      config
    );
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
export const sendMessage = (id, token) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:8080/api/message/add/" + id,
      {
        content: "60874cddcd61600c68e9dff9",
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
      "http://localhost:8080/api/message/chatlist",
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
