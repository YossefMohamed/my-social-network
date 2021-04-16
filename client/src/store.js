import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { messageReducers } from "./reducers/messageReducers";
import { newsFeedReducer, likePostReducer } from "./reducers/postReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  newsFeed: newsFeedReducer,
  message: messageReducers,
  likePost: likePostReducer,
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
