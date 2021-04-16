export const messageReducers = (state = "", action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return action.payload;
    default:
      return state;
  }
};
