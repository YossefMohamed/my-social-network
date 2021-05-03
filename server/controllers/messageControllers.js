const handler = require("express-async-handler");
const User = require("../models/user");
const Message = require("./../models/message");
const { v4: uuidv4 } = require("uuid");

exports.sendMessage = handler(async (req, res) => {
  receiver = await User.findById(req.params.id);
  const message = await Message.create({
    content: req.body.content,
    author: req.user._id,
    reciever: req.params.id,
  });
  let uuid = uuidv4();
  let currentUserChatList = false;
  let receiverUserChatList = false;
  req.user.chat.map((c) => {
    if (String(c.user) === String(req.params.id)) currentUserChatList = true;
    // currentUserChatList.push(c.user);
  });
  receiver.chat.map((c) => {
    if (String(c.user) === String(req.user.id)) receiverUserChatList = true;

    // receiverUserChatList.push(c.user);
  });
  // console.log(!req.user.chat.includes(req.params.id));
  if (!currentUserChatList) {
    req.user.chat.push({ user: req.params.id, chatId: uuid });
    console.log(currentUserChatList, receiverUserChatList);

    await req.user.save();
  }
  if (!receiverUserChatList) {
    receiver.chat.unshift({ user: req.user._id, chatId: uuid });
    // console.log(receiver.chat);
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
  // console.log(req.params.id, "user");
  // console.log(req.user._id, "me");
  // console.log(messages);
  // console.log(req.params.id);
  res.status(200).json({
    status: "ok",
    data: messages,
  });
});
