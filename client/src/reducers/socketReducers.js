export const socketReducer = (state = null, action) => {
  switch (action.type) {
    case "ADD_SOCKET":
      return action.payload;
    default:
      return state;
  }
};
