export const userLoginReducer = (
  state = { userInfo: {}, error: null },
  action
) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true, ...state };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload, userInfo: {} };
    case "USER_LOGOUT":
      const data = {};
      localStorage.setItem("userInfo", JSON.stringify(data));
      return { userInfo: {} };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = { userInfo: {}, error: null },
  action
) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true, ...state };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload, userInfo: {} };

    default:
      return state;
  }
};

export const userDataReducer = (
  state = { userData: {}, error: null },
  action
) => {
  switch (action.type) {
    case "USER_DATA_REQUEST":
      return { loading: true, ...state };
    case "USER_DATA_SUCCESS":
      return { loading: false, userData: action.payload };
    case "USER_DATA_FAIL":
      return { loading: false, error: action.payload, userData: {} };

    default:
      return state;
  }
};

export const getFriendsListReducer = (
  state = { loading: false, users: [] },
  action
) => {
  switch (action.type) {
    case "USER_FRIENDS_REQUEST":
      return { ...state, loading: true };
    case "USER_FRIENDS_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    default:
      return state;
  }
};

export const searchReducer = (
  state = { loading: false, users: [] },
  action
) => {
  switch (action.type) {
    case "SEARCH_USER_REQUEST":
      return { ...state, loading: true };
    case "SEARCH_USER_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    default:
      return state;
  }
};
