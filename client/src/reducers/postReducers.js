export const newsFeedReducer = (
  state = { loading: false, posts: [] },
  action
) => {
  switch (action.type) {
    case "GET_NEWS_REQUEST":
      return { ...state, loading: true };
    case "GET_NEWS_FEED":
      return { ...state, loading: false, posts: action.payload };
    default:
      return state;
  }
};

export const likePostReducer = (
  state = { loading: false, post: {} },
  action
) => {
  switch (action.type) {
    case "ADD_LIKE_REQUSET":
      return { ...state, loading: true };
    case "ADD_LIKE_POST":
      return { ...state, post: action.payload };
    default:
      return state;
  }
};

export const deletedPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case "DELETE_POST":
      return { ...state, post: action.payload };
    case "READY_DELETE":
      return { post: {} };
    default:
      return state;
  }
};

export const lastPostId = (state = "", action) => {
  switch (action.type) {
    case "ADD_POST_ID":
      return action.payload;
    case "REMOVE_POST_ID":
      return "";
    default:
      return state;
  }
};
export const AddpostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case "ADD_NEW_POST":
      return { ...state, post: action.payload };
    default:
      return state;
  }
};
export const addedComment = (state = {}, action) => {
  switch (action.type) {
    case "ADD_NEW__COMMENT":
      return action.payload;
    default:
      return state;
  }
};

export const DocNumReducer = (state = { docNum: 1 }, action) => {
  switch (action.type) {
    case "GET_DOCUMENT_COUNT":
      return { ...state, docNum: action.payload };

    default:
      return state;
  }
};

export const getSinglePostReducer = (
  state = { loading: false, post: {} },
  action
) => {
  switch (action.type) {
    case "GET_SINGLE_POST_REQUEST":
      return { ...state, loading: true };
    case "GET_SINGLE_POST_SUCCESS":
      return { ...state, post: action.payload, loading: false };
    default:
      return state;
  }
};
