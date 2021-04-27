const express = require("express");
const { protect } = require("../controllers/auth");
const {
  addPost,
  editPost,
  deletePost,
  getPost,
  newsFeed,
  likePost,
  unlikePost,
} = require("../controllers/postsControllers");
const router = express.Router();

router.post("/add", protect, addPost);
router.post("/like/:post", protect, likePost);
router.post("/unlike/:post", protect, unlikePost);
router.get("/get", getPost);
router.patch("/edit", protect, editPost);
router.delete("/delete/:post", protect, deletePost);
router.get("/newfeed", protect, newsFeed);

module.exports = router;
