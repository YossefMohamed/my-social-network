const express = require("express");
const { protect } = require("../controllers/auth");
const {
  sendMessage,
  getMessages,
  getChatList,
} = require("../controllers/messageControllers");

const router = express.Router();

router.post("/add/:id", protect, sendMessage);
router.get("/get/:id", protect, getMessages);
router.post("/chatlist", protect, getChatList);
module.exports = router;
