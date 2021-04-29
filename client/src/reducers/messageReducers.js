export const messageReducers = (
  state = { type: "alert", message: "" },
  action
) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return action.payload;
    default:
      return state;
  }
};

export const userChatReducer = (
  state = { loading: false, user: {} },
  action
) => {
  switch (action.type) {
    case "USER_CHAT_REQUEST":
      return { ...state, loading: true };
    case "USER_CHAT_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    default:
      return state;
  }
};

export const chatListReducer = (
  state = { loading: false, chatList: [] },
  action
) => {
  switch (action.type) {
    case "CHAT_LIST_REQUEST":
      return { ...state, loading: true };
    case "CHAT_LIST_SUCCESS":
      console.log(action.payload);
      return { ...state, loading: false, chatList: action.payload };
    default:
      return state;
  }
};
export const chatMessagesReducers = (
  state = { loading: false, messages: [] },
  action
) => {
  switch (action.type) {
    case "CHAT_REQUEST":
      return { ...state, loading: true };
    case "CHAT_SUCCESS":
      console.log(action.payload);
      return { ...state, loading: false, messages: action.payload };
    default:
      return state;
  }
};

export const currentChatUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "CURRENT_USER_CHAT":
      console.log(action.payload);
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const chatUserIdReducer = (state = { userId: "" }, action) => {
  switch (action.type) {
    case "GET_CHAT_USER_ID":
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};
