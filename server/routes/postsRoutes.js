const express = require("express");
const { protect } = require("../controllers/auth");
const {
  addPost,
  editPost,
  deletePost,
  getPost,
} = require("../controllers/postsControllers");
const router = express.Router();

router.post("/add", protect, addPost);
router.get("/get", getPost);
router.patch("/edit", protect, editPost);
router.delete("/delete", protect, deletePost);

module.exports = router;
