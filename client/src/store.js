import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  chatListReducer,
  chatMessagesReducers,
  chatUserIdReducer,
  currentChatUserReducer,
  messageReducers,
  userChatReducer,
} from "./reducers/messageReducers";
import { hasNewReducer, notificationReducer } from "./reducers/notification";
import {
  newsFeedReducer,
  likePostReducer,
  DocNumReducer,
  deletedPostReducer,
  AddpostReducer,
  getSinglePostReducer,
  addedComment,
} from "./reducers/postReducers";
import { socketReducer } from "./reducers/socketReducers";
import {
  getFriendsListReducer,
  userDataReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const reducers = combineReducers({
  userChat: userChatReducer,
  userChatList: chatListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  newsFeed: newsFeedReducer,
  message: messageReducers,
  likePost: likePostReducer,
  DocNum: DocNumReducer,
  deletedPost: deletedPostReducer,
  addPost: AddpostReducer,
  socket: socketReducer,
  userData: userDataReducer,
  chatMessages: chatMessagesReducers,
  currentChatUser: currentChatUserReducer,
  chatUserId: chatUserIdReducer,
  notification: notificationReducer,
  hasNew: hasNewReducer,
  notifications: notificationReducer,
  getSinglePost: getSinglePostReducer,
  FriendsList: getFriendsListReducer,
  addedComment,
});

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch({
  type: "INCREASE_COUNT",
});
export default store;
