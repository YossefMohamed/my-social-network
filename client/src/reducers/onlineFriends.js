export const onlineFriendsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ONLINE_FRIENDS":
      return action.payload;

    default:
      return state;
  }
};
