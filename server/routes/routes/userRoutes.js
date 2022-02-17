const express = require("express");
const router = express.Router();
const {
  validEmail,
  createUser,
  userLogin,
  socialLogin,
  logout,
  deleteUser,
  updateProfile,
} = require("../../controlllers/userController");
const { protect } = require("../../middleware/auth");

// users
router.post("/signUp", createUser, validEmail);
router.post("/login", userLogin);
router.get("/logout", protect, logout);
router.get("/:kana", socialLogin);

router
  .route("/userInfo")
  .patch(protect, updateProfile)
  .delete(protect, deleteUser);

module.exports = router;
