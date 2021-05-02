import axios from "axios";
import { addImage } from "./userActions";

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
export const addPost = (formData = "", content, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "http://localhost:8080/api/post/add",

      { content },
      config
    );
    if (formData) {
      dispatch(addImage(formData, "post", data.lastPost._id));
    }
    
    dispatch({
      type: "ADD_NEW_POST",
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
    console.log(data.data);
    console.log(data.data);
    console.log(data.data);
    console.log(data.data);
    console.log(data.data);
    console.log(data.data);
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
export const getPost = (post, token) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_SINGLE_POST_REQUEST",
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:8080/api/post/get/" + post,

      config
    );
    dispatch({
      type: "GET_SINGLE_POST_SUCCESS",
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

export const deletePost = (post, token) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      "http://localhost:8080/api/post/delete/" + post,
      config
    );
    dispatch({
      type: "DELETE_POST",
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

export const deleteComment = (commentId, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(
      "http://localhost:8080/api/comment/delete/" + commentId,
      config
    );
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        type: "info",
        message: "Comment Deleted",
      },
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
