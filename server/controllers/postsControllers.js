const handler = require("express-async-handler");
const Post = require("./../models/post");

exports.addPost = handler(async (req, res) => {
  const { content } = req.body;
  const author = req.user._id;
  const post = await Post.create({
    content,
    author,
  });
  const selectedUser = [...req.user.friends, req.user._id];
  console.log(req.user._id);
  const posts = await Post.find({ author: { $in: selectedUser } })
    .limit(10)
    .skip(10 * 0)
    .populate("author", "name")
    .sort("-createdAt");
  res.status(201).json({
    status: "ok",
    data: posts,
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
exports.newsFeed = handler(async (req, res) => {
  const selectedUser = [...req.user.friends, req.user.id];
  const docNum = await Post.find({
    author: { $in: req.user.friends },
  }).countDocuments();
  const post = await Post.find({ author: { $in: selectedUser } })
    .limit(10)
    .skip(10 * req.body.page)
    .populate("author", "name")
    .sort("-createdAt");

  if (!post) throw new Error("Post Not Found !!");
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

exports.likePost = handler(async (req, res) => {
  const postId = req.params.post;
  console.log(req.params);
  const post = await Post.findById(postId);
  if (post.likes.includes(req.user._id)) {
    return res.status(200).json({ status: "ok", data: post });
  }
  post.likes.push(req.user._id);
  await post.save();
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

exports.unlikePost = handler(async (req, res) => {
  const postId = req.params.post;
  console.log(req.params);
  const post = await Post.findById(postId);
  if (!post.likes.includes(req.user._id)) {
    return res.status(200).json({ status: "ok", data: post });
  }
  console.log(post.likes);
  post.likes = post.likes.filter((like) => !like.equals(req.user._id));
  await post.save();
  res.status(200).json({
    status: "ok",
    data: post,
  });
});
