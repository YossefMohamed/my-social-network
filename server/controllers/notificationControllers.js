const handler = require("express-async-handler");
const Notification = require("../models/notification");

exports.addNotification = handler(async (req, res, next) => {
  try {
    console.log(req.body);

    next();
  } catch (error) {}
});

exports.getNotification = handler(async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort("createdAt");
    console.log(notifications);
    res.status(200).json({ status: "ok", data: notifications });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});
