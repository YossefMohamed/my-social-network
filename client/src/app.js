import React, { useEffect } from "react";
import Navbar from "./components/header/header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewsFeed from "./pages/newsFeed";
import chat from "./pages/chat";
import Profile from "./pages/profile";
import Signin from "./pages/signin/signin";
import NotificationsPage from "./pages/notifications/notifcationsPage";
import socketIOClient from "socket.io-client";
import "./app.css";
import Signup from "./pages/signup/signup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const message = useSelector((s) => s.message);
  const socket = socketIOClient("/");
  const dispatch = useDispatch();
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
          <Route path="/profile/:id" component={Profile} exact />
          <Route path="/signin" component={Signin} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/notifcations" component={NotificationsPage} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
