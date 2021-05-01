export const notificationReducer = (
  state = { loading: false, notifications: [] },
  action
) => {
  switch (action.type) {
    case "NOTIFICATION_REQUEST":
      return { ...state, loading: true };
    case "NOTIFICATION_SUCCESS":
      return { ...state, loading: false, notifications: action.payload };
    default:
      return state;
  }
};
export const hasNewReducer = (state = false, action) => {
  switch (action.type) {
    case "HAS_NEW":
      return true;
    case "NOT_NEW":
      return false;
    default:
      return state;
  }
};
