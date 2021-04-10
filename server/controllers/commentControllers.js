const handler = require("express-async-handler");
const Comment = require("../models/Comment");

exports.addComment = handler(async (req, res) => {
  const { content, post } = req.body;
  const author = req.user._id;
  const comment = await Comment.create({
    content,
    post,
    author,
  });
  res.status(201).json({
    status: "ok",
    data: comment,
  });
});

exports.deleteComment = handler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.body.comment);

    if (!req.user._id.equals(comment.author))
      throw new Error("Not Authorized !");

    await comment.delete();
    res.status(201).json({
      status: "ok",
      data: comment,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});
