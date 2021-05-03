import React, { useEffect } from "react";
import Navbar from "./components/header/header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewsFeed from "./pages/newsFeed";
import chat from "./pages/chat";
import Profile from "./pages/profile";
import Signin from "./pages/signin/signin";
import SearchPage from "./pages/search/search";
import NotificationsPage from "./pages/notifications/notifcationsPage";
import socketIOClient from "socket.io-client";
import "./app.css";
import Signup from "./pages/signup/signup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getMe, userData } from "./actions/userActions";
import postPage from "./pages/post/post";
export const socket = socketIOClient("/");

function App() {
  const message = useSelector((s) => s.message);
  const { userInfo } = useSelector((s) => s.userLogin);
  const [notification, setNotification] = React.useState();
  const dispatch = useDispatch();
  socket.on("newNofitication", (notification) => {
    setNotification(notification);
    // dispatch(getMe(userInfo._id, userInfo.token));
    //     dispatch(userData(userInfo._id, userInfo.token));
  });
  React.useEffect(() => {
    socket.emit("joinNotificationsRoom", userInfo._id);
    socket.emit("goOnline", userInfo._id);
  }, []);
  socket.on("disconnect",userInfo._id)
  socket.emit("getOnlineFriends", userInfo);

  socket.on("onlineFriends", (onlineFriends) => {

    dispatch({
      type: "GET_ONLINE_FRIENDS",
      payload: onlineFriends,
    });
  });

  React.useEffect(() => {
    if (notification) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: notification,
      });
      dispatch({
        type: "HAS_NEW",
      });
      alert(notification.content, "info");
    }
  }, [notification]);
  socket.on("connect", () => {
    socket.emit("goOnline", userInfo._id);
  });

  dispatch({
    type: "ADD_SOCKET",
    payload: socket,
  });
  useEffect(() => {
    console.log(message.type);
    if (message.message) {
      alert(message.message, message.type);
    }
  }, [message]);
  function alert(payLoad = "Random Error", type = "alert") {
    toast[type](<div className="toast--container">{payLoad}</div>);
  }
  return (
    <div>
      <ToastContainer />

      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path="/" component={NewsFeed} exact />
          <Route path="/chat" component={chat} exact />
          <Route
            path="/profile/:id"
            component={Profile}
            exact
            socket={socket}
          />
          <Route path="/signin" component={Signin} exact />
          <Route path="/search" component={SearchPage} exact />
          <Route path="/post/:postId" component={postPage} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/notifcations" component={NotificationsPage} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
