const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    image: String,

    content: {
      type: String,
      required: [true, "Please Enter The Content Of The Post !"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Who Is The Author ?"],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
);
postSchema.set("toJSON", { virtuals: true });
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});
// postSchema.pre(/^find/, function (next) {
//   // this points to the current query
//   this.populate({
//     path: "comments",
//     // populate : {
//     //   path : 'reviewId'
//     // }
//   });
//   next();
// });
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
