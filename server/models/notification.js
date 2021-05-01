const mongoose = require("mongoose");
const notification = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Whats The Content Of Your Comment !"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Which Post ?"],
    },
    to: String,
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notification);

module.exports = Notification;
