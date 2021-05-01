const handler = require("express-async-handler");
const User = require("./../models/user");
const Post = require("./../models/post");
const { signIn } = require("./auth");
const multer = require("multer");
const path = require("path");
const { io } = require("./../app");

//Image Controlles
// const sharp = require("sharp");

var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + `./../public/img`));
  },
  filename: function (req, file, cb) {
    cb(null, `user-${req.user.id}-${Date.now()}.jpg`);
  },
});
const multerFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".png" &&
    ext !== ".jpg" &&
    ext !== ".gif" &&
    ext !== ".jpeg" &&
    ext !== ".PNG" &&
    ext !== ".JPG" &&
    ext !== ".GIF" &&
    ext !== ".JPEG"
  ) {
    return callback(new Error("Only images are allowed"));
  }
  callback(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = handler(async (req, res, next) => {
  // console.log(req.body);
  // console.log("req.body");
  // console.log(process.env.PORT);
  // console.log(req.body);
  if (!req.file) return next();
  // console.log("req.body");
  // console.log("req.body");
  // console.log(req.file.filename);

  req.user.img = `static/img/${req.file.filename}`;
  // console.log(req.user);
  const user = await req.user.save();
  res.status(200).json(user);
});

//end of image controlles
exports.login = handler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ email }).select("-__v +password");
  console.log(email);
  if (user && (await user.correctPassword(password, user.password))) {
    res.status(201).json({
      status: "ok",
      data: {
        ...user._doc,
        token: signIn(user._id),
      },
    });
  } else {
    res.status(401).json({
      status: "Faild",
      message: "Invalid Email Or Password",
    });
    // throw new Error("Invalid Email or Password !");
  }
});

exports.getUserProfile = handler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("posts", {
    select: "id -author",
  });
  const userPosts = user.posts.map((post) => post._id);
  userPostsList = await Post.find({
    _id: { $in: userPosts },
  })
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "name",
      },
    })
    .populate({ path: "author", select: "name" });
  console.log("userPostsList");
  user.posts = userPostsList;
  if (!user) {
    res.status(404);
    throw new Error("User Not Found !");
  }
  res.status(200).json({ status: "ok", user });
});

exports.registerUser = handler(async (req, res) => {
  const { email, name, password } = req.body;
  try {
    // console.table(req.body);
    if (!name || !email || !password) {
      res.status(401);
      throw new Error("Please Fill All The Inputs ");
    }
    const checkMail = await User.findOne({ email });
    if (checkMail) {
      res.status(400).json({
        status: "Faild",
        message: "There's An Account With This Email !",
      });
      // throw new Error("There's Account with this Email !");
    }
    const user = await User.create({
      email,
      name,
      password,
    });
    res.status(201).json({
      status: "ok",
      data: {
        ...user._doc,
        token: signIn(user._id),
      },
    });
  } catch (error) {
    // console.log(error.message);
    res.status(404);
    throw new Error(error.message);
  }
});

exports.updateMe = handler(async (req, res, next) => {
  //create an error if user trys to update the password
  try {
    if (req.body.password && req.body.oldPassword) {
      if (!(await req.user.correctPassword(req.body.oldPassword))) {
        throw new Error("Incorrect Password");
      }
      req.user.password = req.body.password;
    }
    console.log(req.body);
    req.user.email = req.body.email || req.user.email;
    req.user.name = req.body.name || req.user.name;

    req.user.bio = req.body.bio || req.body.bio;
    // console.log(
    //   await req.user.matchPassword(req.body.oldPassword),
    //   "asdasdasawwwwwwwwe"
    // );
    const user = await req.user.save();
    console.log(user);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ status: "Faild", message: error.message });
  }
});

exports.sendFriendRequest = handler(async (req, res) => {
  const user = req.body.user;
  if (req.user.friends.includes(user)) {
    res.status(401);
    throw new Error("Friend is already added !");
  }
  const neededUser = await User.findById(req.body.user)
    .populate({
      path: "posts",
    })
    .populate({ path: "friends" });
  console.log(neededUser);
  neededUser.friendRequests.push(req.user._id);
  req.user.sentRequests.push(user);
  await neededUser.save();
  await req.user.save();
  res.status(200).json({ status: "ok", user: neededUser });
});

exports.acceptFriend = handler(async (req, res) => {
  const user = req.body.user;
  const neededUser = await User.findById(req.body.user)
    .populate({
      path: "posts",
    })
    .populate({ path: "friends" });
  console.log(neededUser);

  neededUser.friendRequests = neededUser.friendRequests.filter(
    (id) => String(req.user._id) !== String(id)
  );
  neededUser.sentRequests = neededUser.sentRequests.filter(
    (id) => String(req.user._id) !== String(id)
  );
  req.user.sentRequests = req.user.sentRequests.filter(
    (id) => String(user) !== String(id)
  );
  req.user.friendRequests = req.user.friendRequests.filter(
    (id) => String(user) !== String(id)
  );
  neededUser.friends.push(req.user._id);
  req.user.friends.push(user);
  await neededUser.save();
  await req.user.save();
  res.status(200).json({ status: "ok", user: neededUser });
});
exports.cancel = handler(async (req, res) => {
  const user = req.body.user;
  const neededUser = await User.findById(req.body.user)
    .populate({
      path: "posts",
    })
    .populate({ path: "friends" });
  neededUser.friendRequests = neededUser.friendRequests.filter(
    (id) => String(req.user._id) !== String(id)
  );
  neededUser.sentRequests = neededUser.sentRequests.filter(
    (id) => String(req.user._id) !== String(id)
  );
  req.user.sentRequests = req.user.sentRequests.filter(
    (id) => String(user) !== String(id)
  );
  req.user.friendRequests = req.user.friendRequests.filter(
    (id) => String(user) !== String(id)
  );
  await neededUser.save();
  await req.user.save();
  res.status(200).json({ status: "ok", user: neededUser });
});

exports.deleteUser = handler(async (req, res) => {
  const user = req.body.user;
  const neededUser = await User.findById(req.body.user)
    .populate({
      path: "posts",
    })
    .populate({ path: "friends" });
  neededUser.friendRequests = neededUser.friendRequests.filter(
    (id) => String(req.user._id) !== String(id)
  );
  neededUser.sentRequests = neededUser.sentRequests.filter(
    (id) => String(req.user._id) !== String(id)
  );
  req.user.sentRequests = req.user.sentRequests.filter(
    (id) => String(user) !== String(id)
  );
  req.user.friendRequests = req.user.friendRequests.filter(
    (id) => String(user) !== String(id)
  );

  neededUser.friends = neededUser.friends.filter(
    (id) => String(req.user._id) !== String(id)
  );
  req.user.friends = req.user.friends.filter(
    (id) => String(user) !== String(id)
  );

  await neededUser.save();
  await req.user.save();
  res.status(200).json({ status: "ok", user: neededUser });
});

exports.getFriendList = handler(async (req, res) => {
  console.log(req.params.id);
  const friendList = await User.findById(req.params.id).populate(
    "friends",
    "name email friends"
  );
  res.status(200).json({ status: "ok", user: friendList.friends });
});
exports.search = handler(async (req, res) => {
  const regex = new RegExp(req.query.name, "i"); // i for case insensitive

  const searchList = await User.find({
    name: regex,
  });
  console.log(regex, searchList);
  res.status(200).json({ status: "ok", data: searchList });
});
