const asyncHandler = require("express-async-handler");
const Document = require("../models/document");
const Chatting = require("../models/chatting");
const UserDocument = require("../models/userDocument");
const Notification = require("../models/notification");
const mongoose = require("mongoose");

// 게시물 생성시 채팅방 생성

module.exports = {
  createChatRoom: asyncHandler(async (req, res) => {
    const userId = req.body._id;
    const usersParty = Document.find({ _id: userId });
    const { user_id, title } = usersParty;
    const chatInfo = { cerator: user_id, title: title };

    const chat = new Chatting(chatInfo);
    chat.save();
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
    } = req.body;

    const document = {
      title,
      deliveryFee,
      placeName,
      date,
      time,
      totalNum,
      description,
      category,
    };
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
      //req.app.get("meetingMember")[id] = { [creator.id]: 0 };
      const setChatInfo = {
        chatInfo: { title },
        ceratorId: newDocument._id,
      };
      const chat = Chatting.create(setChatInfo);
      res.status(201).json({
        message: "success",
        newDocument,
        chat,
      });
    }
  }),

  // 게시물 조회
  viewPost: asyncHandler(async (req, res) => {
    Document.findOne({ _id: req.body._id }, (err, docu) => {
      if (err) {
        return res.status(400).json({ message: "failed" });
      }
      const {
        title,
        deliveryFee,
        placeName,
        latitude,
        longitude,
        date,
        time,
        totalNum,
        description,
        category,
      } = docu;
      return res.status(200).json({
        documentInfo: {
          title,
          deliveryFee,
          placeName,
          latitude,
          longitude,
          date,
          time,
          totalNum,
          description,
          category,
        },
      });
    });
  }),

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
    // for (const [key, val] of Object.entries(meetingMember[documenId])) {
    //   if (val === 0) {
    //     userList.push(key);
    //   }
    // }

    const noticeInfo = {
      // id: _id,
      documentId: documenId,
      url: null,
      target: null,
      title: documenId.title,
      message: "게시물이 삭제 되었습니다.",
    };

    await Document.findOneAndDelete({ _id: req.params.id });
    await Chatting.findOneAndDelete({ ceratorId: req.params.id });
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
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !date ||
      !deliveryFee ||
      !totalNum
      //  !location ||    => 카카오맵
      // !latitude ||
      // !longitude
    ) {
      res.status(400).json({ message: "Failed to update Post" });
    } else {
      res.status(201).json({
        message: "success",
        document: {
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
