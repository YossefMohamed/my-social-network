const mongoose = require("mongoose");
const messageSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Whats The Content Of Your Comment !"],
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Which Post ?"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Who Is The Author !"],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
