const express = require("express");
const router = express.Router();
const {
  validEmail,
  createUser,
  userLogin,
  kakaoSignin,
  naverSignin,
  logout,
  deleteUser,
  updateProfile,
} = require("../../controlllers/userController");
const { protect } = require("../../middleware/index");

// users
router.post("/signUp", createUser);
router.post("/login", userLogin);
router.get("/logout", protect, logout);
router.post("/kakao", kakaoSignin);
router.post("/naver", naverSignin);

router
  .route("/userInfo")
  .patch(protect, updateProfile)
  .delete(protect, deleteUser);

module.exports = router;
