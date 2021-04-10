const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Whats The Content Of Your Comment !"],
    },
    post: {
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Post;
