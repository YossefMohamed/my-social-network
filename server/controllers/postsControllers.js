const handler = require("express-async-handler");
const Post = require("./../models/post");

exports.newsFeed = handler(async (req, res) => {
  const selectedUser = [...req.user.friends, req.user.id];
  const docNum = Math.ceil(
    (await Post.countDocuments({
      author: { $in: selectedUser },
    })) / 10
  );

  const post = await Post.find({ author: { $in: selectedUser } })
    .limit(10 * (1 * req.query.page + 1))
    .populate("author", "name image")
    .sort("-createdAt")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "image email name",
      },
    });
  console.log(10 * (1 * req.query.page + 1));

  if (!post) throw new Error("Post Not Found !!");
  // console.log(post)

  res.status(200).json({
    status: "ok",
    data: post,
    docNum,
  });
});
exports.addPost = handler(async (req, res) => {
  const { content } = req.body;
  const author = req.user._id;
  const posty = await Post.create({
    content,
    author,
  });
  const selectedUser = [...req.user.friends, req.user._id];

  const post = await Post.find({ author: { $in: selectedUser } })
    .limit(10)
    .populate("author", "name")
    .sort("-createdAt")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "email name image",
      },
    });

  res.status(201).json({
    status: "ok",
    data: post,
    lastPost: posty,
  });
});
exports.getPost = handler(async (req, res, next) => {
  console.log(req.params.id);
  const post = await Post.findById(req.params.id).populate({
    path: "author",
    populate: {
      path: "comment",
      select: "email name",
    },
  });
  if (!post)
    res.status(200).json({
      status: "ok",
      data: {},
    });
  res.status(200).json({
    status: "ok",
    data: post,
  });
});
exports.deletePost = handler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.post);
    console.log(post);
    console.log(post);
    console.log(post);
    console.log(post);
    console.log(post);
    console.log(post);
    console.log(post);
    console.log(post);
    console.log(post);
    console.log(post);
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

exports.likePost = handler(async (req, res) => {
  const postId = req.params.post;
  console.log(req.params);
  const post = await Post.findById(postId);
  console.log(post.likes.includes(req.user._id));
  console.log(post.likes, req.user._id);
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
