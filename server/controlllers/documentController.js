const asyncHandler = require("express-async-handler");
const Document = require("../models/document");
const Chatting = require("../models/chatting");
const UserDocument = require("../models/userDocument");

// 게시물 생성시 채팅방 생성

module.exports = {
  createChatRoom: asyncHandler(async (req, res) => {
    const { userId } = res.locals;
    const usersParty = Document.find({ _id: userId });
    const { _id, user_id, title } = usersParty;
    const chatInfo = { _id: _id, cerator: user_id, title: title };
    const chat = Chatting.create(chatInfo);
    return res.status(200).json(chat);
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

    if (!document) {
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
    const main = req.app.get("main");
    const chat = req.app.get("chat");
    const _id = mongoose.Types.ObjectId();
    const meetingMember = req.app.get("meetingMember");
    const documenId = Number(req.params.documenId);
    //const documenId = Document.findById({ doId: req._id });
    const userId = UserDocument.find({ documenId: req.params.id }).populate(
      "userId",
      "_id"
    ); //문법맞는지 확인하기
    const userList = [];
    for (const [key, val] of Object.entries(meetingMember[documenId])) {
      if (val === 0) {
        userList.push(key);
      }
    }

    const noticeInfo = {
      id: _id,
      documentId: documenId,
      url: null,
      target: null,
      title: documenId.title,
      message: "게시물이 삭제 되었습니다.",
    };

    await Document.findOneAndDelete({ _id: req.params.id });
    await Chatting.findOneAndDelete({ _id: req.document._id });
    Notification.createNotice(userList, noticeInfo);
    main.to(documenId).emit("notice", noticeInfo, userId);
    main.to(documenId).emit("quit");
    chat.to(documenId).emit("quit");
    chat.in(documenId).disconnectSockets(); // 연결 끊어서 채팅 방 삭제
    delete meetingMember[documenId];
    res.status(200).json({
      message: "게시물이 삭제 되었습니다.",
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
    } = document;

    document = req.body;

    if (!document) {
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
