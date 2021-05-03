const express = require("express");
const morgan = require("morgan");
const app = express();
const server = require("http").createServer(app);
var cors = require("cors");
app.use(cors());
const socketio = require("socket.io")(server);
const path = require("path");
const connectDB = require("./db");
const Notification = require("./models/notification");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
connectDB();
app.use("/static", express.static(path.join(__dirname, "public")));

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
  socket.on("goOnline", (id) => {
    socketio.onlineUsers[id] = true;
    socket.on("userDisconnected", (userCurrentId) => {
      socketio.onlineUsers[userCurrentId] = false;
      console.log(socketio.onlineUsers);
    });
    socket.on("disconnect", (userId) => {
      console.log(socketio.onlineUsers);
      socketio.onlineUsers[currentUserId] = false;
      socketio.emit("onlineFriends", socketio.onlineUsers);
    });
  });
  socket.on("getOnlineFriends", (userInfo) => {
    socketio.emit("onlineFriends", socketio.onlineUsers);
  });
  // socket.on("goOnline", )
  socket.on("joinPostRoom", (postId) => socket.join(postId));
  socket.on("likePost", async ({ post, user, author, name }) => {
    socket.to(post).emit("receiverLikePost", user);
    if (author._id)
      socket.to(author._id).emit("newNofitication", {
        id,
        content: `${name} Liked Your Post`,
      });
  });
  socket.on("unLikePost", ({ post, user }) => {
    socket.to(post).emit("receiverUnlikePost", user);
  });
  socket.on("addComment", async (comment) => {
    if (comment.author._id !== comment.postAuthor._id) {
      await Notification.create({
        content: `${comment.author.name} Commented On Your Post`,
        user: comment.postAuthor._id,
        to: `/post/${comment.post}`,
      });
    }
    socket.to(comment.post).emit("receiveAddComment", comment);

    socket.to(comment.postAuthor._id).emit("newNofitication", {
      content: `${comment.author.name} commented on Your Post`,
    });
  });
  socket.on("acceptFriend", async (data) => {
    socketio.to(data.to.id).emit("getUser");
    await Notification.create({
      content: `${data.from.name} Accept You A Friend Request`,
      user: data.to.id,
      to: `/profile/${data.from.id}`,
    });
    socket.to(data.to.id).emit("newNofitication", {
      id: data.from.id,
      content: `${data.from.name} Accept Your Request`,
    });
  });
  socket.on("sendRequest", async (data) => {
    socketio.to(data.to.id).emit("getUser");
    await Notification.create({
      content: `${data.from.name} Sent You A Friend Request`,
      user: data.to.id,
      to: `/profile/${data.from.id}`,
    });
    socket.to(data.to.id).emit("newNofitication", {
      id: data.from.id,
      content: `${data.from.name} Sent You Friend Request`,
    });
  });
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`Joined To ${chatId}`);
  });
  socket.on("sendMessage", async (data) => {
    socketio.to(data.chatIdd).emit("newMessage", data);
    await Notification.create({
      content: `${data.name} Sent You A Message`,
      user: data.receiver,
      to: `/chat`,
    });
    socketio.to(data.receiver).emit("newChat", data);

    socket.to(data.receiver).emit("newNofitication", {
      id: data.author,
      content: `${data.name} Sent You A Massage`,
    });
  });
});

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));
app.use("/api/notification", require("./routes/notificationRoutes"));
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
//     console.76log(`${socket.id} Disconnected`);
//   });
//   socket.on("greeting", (o) => {
//     console.log(o);
//   });
// });

// console.log(process.env.DB_URI);
