import React from "react";
import socketIOClient from "socket.io-client";

function socket() {
  const socket = socketIOClient("/");
  return socket;
}

export default socket;
