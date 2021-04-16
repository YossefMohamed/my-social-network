export const newsFeedReducer = (
  state = { loading: false, posts: [] },
  action
) => {
  switch (action.type) {
    case "GET_NEWS_REQUEST":
      return { ...state, loading: true, posts: [] };
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
