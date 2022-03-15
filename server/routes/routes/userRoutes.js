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
  getUserInfo,
} = require("../../controlllers/userController");
const { protect } = require("../../middleware/index");

// users
router.post("/signUp", createUser);
router.post("/login", userLogin);
router.get("/logout", protect, logout);
router.post("/kakao", kakaoSignin);
router.post("/naver", naverSignin);
router.get("/mypage/:userId", getUserInfo);

router
  .route("/userInfo/:userId")
  .patch(updateProfile)
  .delete(deleteUser);

module.exports = router;
