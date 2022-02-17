const asyncHandler = require("express-async-handler");
const Document = require("../models/document");
const Chatting = require("../models/chatting");

// 게시물 생성시 채팅방 생성

module.exports = {
  createChatRoom: asyncHandler(async (req, res) => {
    const { title, cerator: user_id } = req.body;
    res.status(200).send;
  }),

  // 게시물 생성
  createPost: asyncHandler(async (req, res) => {
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
      createChatRoom;
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
  }),

  //게시물 삭제
  deletePost: asyncHandler(async (req, res) => {
    await Document.findByIdAndDelete({ post: req.post._id });
    await Chatting.findByIdAndDelete({ chatting: req.post._id }); //포스트 삭제시 채팅방 삭제 확인해 보기!!
    const chat = req.app.get("chat");
    chat.to(req.post._id).emit("quit");
    chat.in(req.post._id).disconnectSockets(); // 연결 끊어서 채팅 방 삭제

    res.status(200).json({
      message: "Post deleted",
    });
  }),

  // 게시물 수정
  // ?? 게시물 수정시 유저 아이디 일치 여부 확인? 토큰으로 확인?
  updatePost: asyncHandler(async (req, res) => {
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
  }),
};
