import axios from "axios";

export const newsFeed = (page, token) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_NEWS_REQUEST",
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      "http://localhost:8080/api/post/newfeed?page=" + page,
      config
    );
    dispatch({
      type: "GET_NEWS_FEED",
      payload: data.data,
    });
    dispatch({
      type: "GET_DOCUMENT_COUNT",
      payload: data.docNum,
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

export const likePost = (postId, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({
      type: "ADD_LIKE_REQUSET",
    });
    const { data } = await axios.post(
      "http://localhost:8080/api/post/like/" + postId,
      {},
      config
    );
    dispatch({
      type: "ADD_LIKE_POST",
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

export const unLikePost = (postId, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({
      type: "ADD_LIKE_REQUSET",
    });
    const { data } = await axios.post(
      "http://localhost:8080/api/post/unlike/" + postId,
      {},
      config
    );
    dispatch({
      type: "ADD_LIKE_POST",
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
export const addPost = (content, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({
      type: "GET_NEWS_REQUEST",
    });
    const { data } = await axios.post(
      "http://localhost:8080/api/post/add",

      { content },
      config
    );
    dispatch({
      type: "GET_NEWS_FEED",
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

export const addComment = (content, post, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:8080/api/comment/add/" + post,

      { content },
      config
    );
    dispatch({
      type: "ADD_NEW__COMMENT",
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
