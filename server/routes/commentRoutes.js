const express = require("express");
const { protect } = require("../controllers/auth");
const { addComment } = require("../controllers/commentControllers");

const router = express.Router();

router.post("/add/:post", protect, addComment);

module.exports = router;
