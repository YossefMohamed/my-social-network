import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  chatListReducer,
  chatMessagesReducers,
  currentChatUserReducer,
  messageReducers,
  userChatReducer,
} from "./reducers/messageReducers";
import {
  newsFeedReducer,
  likePostReducer,
  DocNumReducer,
  deletedPostReducer,
  AddpostReducer,
} from "./reducers/postReducers";
import { socketReducer } from "./reducers/socketReducers";
import {
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
