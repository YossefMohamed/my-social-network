import React, { useEffect } from "react";
import Navbar from "./components/header/header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewsFeed from "./pages/newsFeed";
import chat from "./pages/chat";
import Profile from "./pages/profile";
import Signin from "./pages/signin/signin";
import NotificationsPage from "./pages/notifications/notifcationsPage";
// import io, { Socket } from "socket.io-client";

import "./app.css";
import Signup from "./pages/signup/signup";

function App() {
  // useEffect(() => {
  //   const socket = io();
  //   socket.emit("greeting", "Heeeyyy");

  //   return () => socket.close();
  // }, []);
  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <Route path="/" component={NewsFeed} exact />
        <Route path="/chat" component={chat} exact />
        <Route path="/me" component={Profile} exact />
        <Route path="/signin" component={Signin} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/notifcations" component={NotificationsPage} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
