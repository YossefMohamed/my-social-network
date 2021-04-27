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
const port = 8080;
// const socket = require("socket.io");
app.use(express.json());
app.use(morgan("dev"));
socketio.on("connection", (socket) => {
  console.log("Client Connected !!");
  socket.on("comment", (data) => console.log(data));
  console.log(socket.id);
});

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));
app.use("/api/comment", require("./routes/commentRoutes"));
app.use("/api/post", require("./routes/postsRoutes"));
app.use((err, req, res) => {
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
