const handler = require("express-async-handler");
const Post = require("./../models/post");

exports.addPost = handler(async (req, res) => {
  const { content } = req.body;
  const author = req.user._id;
  const post = await Post.create({
    content,
    author,
  });
  res.status(201).json({
    status: "ok",
    data: post,
  });
});
exports.getPost = handler(async (req, res, next) => {
  const post = await Post.findById(req.body.post);
  if (!post) throw new Error("Post Not Found !!");
  res.status(200).json({
    status: "ok",
    data: post,
  });
});
exports.deletePost = handler(async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);

    if (!req.user._id.equals(post.author)) throw new Error("Not Authorized !");

    await post.delete();
    res.status(201).json({
      status: "ok",
      data: post,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});
exports.editPost = handler(async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);

    if (!req.user._id.equals(post.author)) throw new Error("Not Authorized !");
    post.content = req.body.content;
    await post.save();
    res.status(201).json({
      status: "ok",
      data: post,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});
