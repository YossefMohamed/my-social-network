const app = require("express");
const { registerUser, login, updateMe, getUserProfile, uploadUserPhoto, resizeUserPhoto } = require("../controllers/userControllers");
const router = app.Router();
const auth = require("./../controllers/auth")


router.post("/signup",registerUser)
router.post("/signin",login)
router.patch("/:id", auth.protect,updateMe)
router.get('/me' , auth.protect,getUserProfile)
router.post("/profileimage", auth.protect,uploadUserPhoto, resizeUserPhoto);

router.delete('/:id')
module.exports=router