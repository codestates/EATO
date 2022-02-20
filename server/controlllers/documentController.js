const asyncHandler = require("express-async-handler");
const Document = require("../models/document");
const Chatting = require("../models/chatting");
const UserDocument = require("../models/userDocument");

// 게시물 생성시 채팅방 생성

module.exports = {
  createChatRoom: asyncHandler(async (req, res) => {
    const { title, cerator } = req.body;
    Chatting.res.status(200).send;
  }),

  // 게시물 생성
  createDocument: asyncHandler(async (req, res) => {
    const {
      title,
      deliveryFee,
      placeName,
      date,
      time,
      totalNum,
      description,
      category,
    } = document;

    document = req.body;

    if (!posting) {
      res.status(400).json({ message: "Failed creating post" });
    } else {
      const newDocument = await Document.create({
        title,
        deliveryFee,
        placeName,
        date,
        time,
        totalNum,
        description,
        category,
      });
      createChatRoom();
      res.status(201).json({
        message: "success",
        newDocument,
      });
    }
  }),

  // 게시물 조호ㅚ

  //게시물 삭제 => 삭제시 삭제 알림 보내줌
  deletePost: asyncHandler(async (req, res) => {
    await Document.findByIdAndDelete({ post: req._id });
    await Chatting.findByIdAndDelete({ chatting: req.document._id }); //포스트 삭제시 채팅방 삭제 확인해 보기!!
    const main = req.app.get("main");
    const chat = req.app.get("chat");
    const _id = mongoose.Types.ObjectId();
    const documenId = Document.findById({ doId: req._id });
    const userId = UserDocument.find({ documenId: req._id }).populate(
      "userId",
      "_id"
    ); //문법맞는지 확인하기
    const noticeInfo = {
      id: _id,
      documentId: documenId,
      url: null,
      target: null,
      title: documenId.title,
      message: `게시물이 삭제 되었습니다.`,
    };
    Notification.createNotice(userIds, noticeInfo);
    main.to(documentId).emit("notice", noticeInfo, userId);
    main.to(documentId).emit("quit");
    chat.to(documentId).emit("quit");
    chat.in(documentId).disconnectSockets(); // 연결 끊어서 채팅 방 삭제
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
          location,
          latitude,
          longitude,
        },
      });
    }
  }),
};
