const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((e) => console.log("DB Connected"))
    .catch((e) => console.log(e.message));
};

module.exports = connectDB;
