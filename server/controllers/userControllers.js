const handler = require("express-async-handler");
const User = require("./../models/user");
const { signIn } = require("./auth");
const multer = require("multer");
const path = require("path");

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
  const user = await User.findOne({ email }).select("-__v +password");

  if (user && (await user.correctPassword(password, user.password))) {
    const ModUser = user;
    ModUser._doc.token = signIn(user._id);
    ModUser._doc.password = undefined;
    res.status(200).json(ModUser);
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password !");
  }
});

exports.getUserProfile = handler(async (req, res) => {
  // console.log(req.user);
  if (!req.user) {
    res.status(404);
    throw new Error("User Not Found !");
  }
  res.status(200).json(req.user);
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
      res.status(404);
      throw new Error("There's Account with this Email !");
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
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.buildingNumber ||
    !req.body.city ||
    !req.body.street
  ) {
    throw new Error("Please Fill All Fields !");
  }

  if (req.body.password) {
    if (req.body.password !== req.body.confirmPassword) {
      res.status(400);
      next(new Error("Password And Confirm Password Not Equal !"));
    }
    if (req.user && !(await req.user.matchPassword(req.body.oldPassword))) {
      res.status(400);
      next(new Error("Incorrect Password"));
    }
    req.user.password = req.body.password;
  }
  req.user.email = req.body.email;
  req.user.name = req.body.name;
  req.user.shippingAddress = {
    buildingNumber: req.body.buildingNumber,
    city: req.body.city,
    street: req.body.street,
  };
  // console.log(
  //   await req.user.matchPassword(req.body.oldPassword),
  //   "asdasdasawwwwwwwwe"
  // );
  // console.log(req.body);
  const user = await req.user.save();
  res.status(200).json(user);
});

exports.addFriend = handler(async (req, res) => {
  const user = req.body.user;
  if (req.user.friends.includes(user)) {
    res.status(401);
    throw new Error("Friend is already added !");
  }
  req.user.friends.push(user);
  await req.user.save();
  res.status(200).json({
    status: "ok",
    data: req.user,
  });
});
