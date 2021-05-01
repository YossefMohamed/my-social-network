const handler = require("express-async-handler");
const Comment = require("../models/Comment");

exports.addComment = handler(async (req, res) => {
  const { content } = req.body;
  const { post } = req.params;
  const author = { name: req.user.name, _id: req.user._id };
  const comment = await Comment.create({
    content,
    post,
    author: req.user,
  });
  res.status(201).json({
    status: "ok",
    data: comment,
  });
});

exports.deleteComment = handler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.comment);

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
