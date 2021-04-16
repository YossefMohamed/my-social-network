const express = require("express");
const morgan = require("morgan");
const app = express();
var cors = require("cors");
const path = require("path");
const connectDB = require("./db");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
connectDB();
const port = 8080;
app.use(cors());
// const socket = require("socket.io");
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/post", require("./routes/postsRoutes"));
app.use((err, req, res, next) => {
  res.statusCode = res.statusCode ? res.statusCode : 500;
  res.json({
    status: "failed",
    sda: "asd",
    message: err.message,
  });
});

const server = app.listen(port, () =>
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
