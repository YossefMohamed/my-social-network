const app = require("express");
const {
  registerUser,
  login,
  updateMe,
  getUserProfile,
  uploadUserPhoto,
  resizeUserPhoto,
  addFriend,
} = require("../controllers/userControllers");
const router = app.Router();
const auth = require("./../controllers/auth");

router.post("/signup", registerUser);
router.post("/signin", login);
router.post("/adduser", auth.protect, addFriend);
router.patch("/:id", auth.protect, updateMe);
router.get("/me", auth.protect, getUserProfile);
router.post("/profileimage", auth.protect, uploadUserPhoto, resizeUserPhoto);

router.delete("/:id");
module.exports = router;
