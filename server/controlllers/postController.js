import asyncHandler from "express-async-handler";
import Post from "../models/post.js";
import Chatting from "../models/chatting.js";

// 게시물 생성
// ?? 게시물 생성시 채팅방
const createPost = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    date,
    deliveryFee,
    totalNum,
    payTag,
    deliveryTag,
    location,
    latitude,
    longitude,
  } = posting;

  posting = req.body;

  if (!posting) {
    res.status(400).json({ message: "Failed creating post" });
  } else {
    res.status(201).json({
      message: "success",
      post: {
        _id: user._id,
        title,
        description,
        category,
        date,
        deliveryFee,
        totalNum,
        payTag,
        deliveryTag,
        location,
        latitude,
        longitude,
      },
    });
  }
});

//게시물 삭제
const deletePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete({ post: req.post._id });
  await Chatting.findByIdAndDelete({ chatting: req.post._id }); //포스트 삭제시 채팅방 삭제 확인해 보기!!

  res.status(200).json({
    message: "Post deleted",
  });
});

// 게시물 수정
// ?? 게시물 수정시 유저 아이디 일치 여부 확인? 토큰으로 확인?
const updatePost = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    date,
    deliveryFee,
    totalNum,
    payTag,
    deliveryTag,
    location,
    latitude,
    longitude,
  } = posting;

  posting = req.body;

  if (!posting) {
    res.status(400).json({ message: "Failed to update Post" });
  } else {
    res.status(201).json({
      message: "success",
      post: {
        _id: user._id,
        title,
        description,
        category,
        date,
        deliveryFee,
        totalNum,
        payTag,
        deliveryTag,
        location,
        latitude,
        longitude,
      },
    });
  }
});

export { createPost, deletePost, updatePost };
