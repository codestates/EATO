import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import Post from "../models/post.js";
import Chatting from "../models/chatting.js";
import generateToken from "./auth/auth.js";

// 회원가입
const signUp = asyncHandler(async (req, res) => {
  const { email, password, nickname } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(401).json({ message: "이미 가입된 이메일 입니다." });
  }

  const user = await User.create({
    email,
    password,
    nickname,
    image: "/images/user.jpeg",
  });

  if (user) {
    res.status(201).json({
      message: "회원가입이 완료됐습니다.",
    });
  } else {
    res.status(400).json({ message: "모든 항목을 작성해 주세요." });
  }
});

// 소셜 회원가입
const socialSignUp = asyncHandler(async (req, res) => {});

// 소셜 로그인
const socialLogin = asyncHandler(async (req, res) => {});

// 게스트 로그인
const guestLogin = asyncHandler(async (req, res) => {});

// 로그인
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      nickname: user.nickname,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "이메일 또는 비밀번호를 확인해 주세요" });
  }
});

// 이메일 중복검사
const emailTest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(401).json({ message: "중복된 이메일 입니다." });
  }
  res.status(200).send({ message: "사용가능한 이메일 입니다." });
});

// 비밀번호 확인
const passwordTest = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.user._id);

  if (await user.matchPassword(password)) {
    res.json({ message: "ok" });
  } else {
    res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }
});

// 유저 프로필 편집 (닉네임, 지역 변경)
const updateUserInfo = asyncHandler(async (req, res) => {
  let message = "";

  if (req.body.nickname || req.body.location) {
    message = "회원정보 수정이 완료 되었습니다.";
  }
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  res.status(200).json({
    message,
    nickname: updatedUser.nickname,
    location: updatedUser.location,
    token: generateToken(updatedUser._id),
  });
});

// 회원 탈퇴
const deleteUser = asyncHandler(async (req, res) => {
  await Post.deleteMany({ user: req.user._id });
  await Chatting.deleteMany({ user: req.user._id });
  await User.findByIdAndDelete(req.user._id);

  res.status(200).json({
    message: "회원 탈퇴가 완료 되었습니다.",
  });
});

export {
  emailTest,
  signUp,
  login,
  passwordTest,
  updateUserInfo,
  deleteUser,
  socialSignUp,
  socialLogin,
  guestLogin,
};
