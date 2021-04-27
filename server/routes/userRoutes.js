const app = require("express");
const {
  registerUser,
  login,
  updateMe,
  getUserProfile,
  uploadUserPhoto,
  resizeUserPhoto,
  sendFriendRequest,
  acceptFriend,
  cancel,
  deleteUser,
} = require("../controllers/userControllers");
const router = app.Router();
const auth = require("./../controllers/auth");

router.post("/signup", registerUser);
router.post("/signin", login);
router.post("/adduser", auth.protect, sendFriendRequest);
router.post("/acceptuser", auth.protect, acceptFriend);
router.post("/canceluser", auth.protect, cancel);
router.post("/deleteuser", auth.protect, deleteUser);
router.patch("/:id", auth.protect, updateMe);
router.get("/profile/:id", auth.protect, getUserProfile);
router.post("/profileimage", auth.protect, uploadUserPhoto, resizeUserPhoto);

router.delete("/:id");
module.exports = router;
