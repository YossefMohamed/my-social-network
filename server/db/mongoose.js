const mongoose = require("mongoose");

const connectDB = () => {
  console.log(process.env.DB_URI);
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((e) => {
      console.log("DB Connnnnected");
    })
    .catch((e) => {});
};
// mongoose.connect(MONGO_URI, config).then((e) => console.log("DB connected"));

module.exports = connectDB;
