const express = require("express");
const { protect } = require("../controllers/auth");
const { getNotification } = require("../controllers/notificationControllers");
const router = express.Router();

router.post("/add", protect);
router.get("/get", protect, getNotification);
module.exports = router;
