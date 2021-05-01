const express = require("express");
const { protect } = require("../controllers/auth");
const { addComment, deleteComment } = require("../controllers/commentControllers");

const router = express.Router();

router.post("/add/:post", protect, addComment);
router.delete("/delete/:comment", protect, deleteComment);

module.exports = router;
