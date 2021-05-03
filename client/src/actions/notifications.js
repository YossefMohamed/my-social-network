import axios from "axios";

export const notificationAction = (token) => async (dispatch) => {
  try {
    dispatch({
      type: "NOTIFICATION_REQUEST",
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/notification/get", config);

    dispatch({
      type: "NOTIFICATION_SUCCESS",
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
