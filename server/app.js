const express = require("express");
const morgan = require("morgan");
const app = express();
const server = require("http").createServer(app);
var cors = require("cors");
app.use(cors());
const socketio = require("socket.io")(server);
const path = require("path");
const connectDB = require("./db");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
connectDB();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization");

  next();
});
const port = 8080;
// const socket = require("socket.io");
app.use(express.json());
app.use(morgan("dev"));
socketio.onlineUsers = {};

socketio.on("connection", (socket) => {
  var currentUserId;
  socket.on("joinNotificationsRoom", (userId) => {
    socket.join(userId);
    currentUserId = userId;
  });
  // socket.on("goOnline", )
  socket.on("joinPostRoom", (postId) => socket.join(postId));
  socket.on("likePost", ({ post, user, author, name }) => {
    socket.to(post).emit("receiverLikePost", user);
    socket.to(author._id).emit("newNofitication", {
      id,
      content: `${name} Liked Your Post`,
    });
  });
  socket.on("unLikePost", ({ post, user }) => {
    socket.to(post).emit("receiverUnlikePost", user);
  });
  socket.on("addComment", (comment) => {
    socket.to(comment.post).emit("receiveAddComment", comment);

    socket.to(comment.postAuthor._id).emit("newNofitication", {
      content: `${comment.author.name} commented on Your Post`,
    });
  });
  socket.on("acceptFriend", (data) => {
    socketio.to(data.to.id).emit("getUser");
    socket.to(data.to.id).emit("newNofitication", {
      id: data.from.id,
      content: `${data.from.name} Accept Your Request`,
    });
  });
  socket.on("sendRequest", (data) => {
    socketio.to(data.to.id).emit("getUser");

    socket.to(data.to.id).emit("newNofitication", {
      id: data.from.id,
      content: `${data.from.name} Sent You Friend Request`,
    });
  });
  socket.on("comment", (comment) => console.log(comment));
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`Joined To ${chatId}`);
  });
  socket.on("sendMessage", (data) => {
    socket.to(data.chatIdd).emit("newMessage", data);
  });
});

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));
app.use("/api/comment", require("./routes/commentRoutes"));
app.use("/api/post", require("./routes/postsRoutes"));
app.use((err, req, res, next) => {
  res.statusCode = res.statusCode ? res.statusCode : 500;
  console.log(err.message);
  res.json({
    status: "failed",
    message: err.message,
  });
});

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// const io = socket(server);
// io.on("connection", (socket) => {
//   console.log(`Connection Established with ID: ${socket.id}`);

//   socket.on("disconnect", () => {
//     console.log(`${socket.id} Disconnected`);
//   });
//   socket.on("greeting", (o) => {
//     console.log(o);
//   });
// });

// console.log(process.env.DB_URI);
