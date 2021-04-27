const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please Write Your Name"],
    },
    chat: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    email: {
      type: String,
      required: [true, "Please Provide Your Email !"],
      unique: true,
      trim: true,
      lowercase: true,

      validate: {
        validator: (el) => validator.isEmail(el),
        message: "Please Provide A valide Email ",
      },
    },
    image: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    sentRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    bio: { type: String },
    password: {
      type: String,
      minlength: [8, "Password Must Be More Than 8 Chars !"],
      maxlength: 25,
      required: [true, "Please Enter Your Password !"],
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

usersSchema.virtual("posts", {
  ref: "Post",
  foreignField: "author",
  localField: "_id",
});
usersSchema.methods.correctPassword = async function (
  cadPassword,
  userPassword
) {
  return await bcrypt.compare(cadPassword, userPassword);
};

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
