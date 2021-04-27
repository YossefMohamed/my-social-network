const handler = require("express-async-handler");
const User = require("../models/user");
const Message = require("./../models/message");

exports.sendMessage = handler(async (req, res) => {
  receiver = await User.findById(req.params.id);
  const message = await Message.create({
    content: req.body.content,
    author: req.user._id,
    reciever: req.params.id,
  });

  // console.log(!req.user.chat.includes(req.params.id));
  if (!req.user.chat.includes(req.params.id)) {
    req.user.chat.push(req.params.id);
    // console.log(req.user);

    await req.user.save();
  }
  if (!receiver.chat.includes(req.user._id)) {
    receiver.chat.push(req.user._id);
    console.log(receiver.chat);
    await receiver.save();
  }
  res.status(201).json({
    status: "ok",
    data: message,
  });
});

exports.getChatList = handler(async (req, res) => {
  const userChat = await User.find({ _id: { $in: req.body.chatList } });
  // console.log(userChat);
  userChat
    ? res.status(200).json({
        status: "ok",
        data: userChat,
      })
    : res.status(404).json({ message: "No Previous Chat" });
});
exports.getMessages = handler(async (req, res) => {
  const messages = await Message.find({
    $or: [
      {
        $and: [{ reciever: req.user._id }, { author: req.params.id }],
      },
      {
        $and: [{ reciever: req.params.id }, { author: req.user._id }],
      },
    ],
  }).sort("createdAt");
  console.log(req.params.id, "user");
  console.log(req.user._id, "me");
  console.log(messages);
  console.log(req.params.id);
  res.status(200).json({
    status: "ok",
    data: messages,
  });
});
