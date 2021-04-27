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

export const DocNumReducer = (state = { docNum: 1 }, action) => {
  switch (action.type) {
    case "GET_DOCUMENT_COUNT":
      return { ...state, docNum: action.payload };

    default:
      return state;
  }
};
