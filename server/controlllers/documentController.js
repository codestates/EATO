const asyncHandler = require("express-async-handler");
const Document = require("../models/document");
const Chatting = require("../models/chatting");
const Notification = require("../models/notification");
const User = require("../models/user");

// 게시물 생성시 채팅방 생성

module.exports = {
  // 게시물 생성
  createDocument: asyncHandler(async (req, res) => {
    const { userId } = req.cookies;
    const {
      title,
      deliveryFee,
      date,
      currentNum,
      totalNum,
      description,
      category,
      deliveryTag,
      payTag,
      located,
    } = req.body;

    const document = {
      title,
      deliveryFee,
      date,
      currentNum,
      totalNum,
      description,
      category,
      deliveryTag,
      payTag,
      located,
    };
    if (!document) {
      res.status(400).json({ message: "Failed creating post" });
    } else {
      const newDocument = await Document.create({
        title,
        deliveryFee,
        date,
        totalNum,
        description,
        category,
        creatorId: userId,
        users: userId,
        deliveryTag,
        payTag,
        located,
      });

      await User.updateOne(
        { _id: userId },
        {
          createDocument: {
            _id: newDocument._id,
            title: newDocument.title,
            deliveryFee: newDocument.deliveryFee,
          },
          userChat: {
            _id: newDocument._id,
            title: newDocument.title,
          },
        }
      );
      // //req.app.get("meetingMember")[id] = { [creator.id]: 0 };
      const setChatInfo = {
        chatInfo: { title },
        creatorId: userId,
        documentChatId: newDocument._id,
      };
      await Chatting.create(setChatInfo);

      res.status(201).json({
        message: console.log(req.cookies.userId),
        newDocument,
      });
    }
  }),

  //전체 게시물 조회
  showPost: asyncHandler(async (req, res) => {
    Document.find({ done: false }, (err, docu) => {
      if (err) {
        return res.status(400).json({ message: console.log(err) });
      }
      return res.status(200).json({
        message: "게시물 조회 성공",
        documentList: docu,
      });
    });
  }),

  // 게시물 상세 조회
  viewPost: asyncHandler(async (req, res) => {
    Document.findOne({ creatorId: req.params.creatorId }, (err, docu) => {
      if (err) {
        return res.status(400).json({ message: console.log(err) });
      }
      const {
        title,
        deliveryFee,
        located,
        date,
        totalNum,
        currentNum,
        description,
        category,
        categoryImg,
        creatorId,
        createdAt,
        deliveryTag,
        payTag,
      } = docu;
      return res.status(200).json({
        documentInfo: {
          title,
          deliveryFee,
          located,
          date,
          totalNum,
          currentNum,
          description,
          category,
          categoryImg,
          creatorId,
          createdAt,
          deliveryTag,
          payTag,
        },
        message: "게시물 상세 조회 성공!",
      });
    });
  }),

  //게시물 삭제 => 삭제시 삭제 알림 보내줌
  deletePost: asyncHandler(async (req, res) => {
    // const main = req.app.get("main");
    // const chat = req.app.get("chat");
    const documentId = Number(req.params.documentId);
    // const meetingMember = req.app.get("meetingMember");

    const Docu = Document.find({ _id: req.params.documentId });
    const userId = Docu.creatorId;
    // const userList = [];
    // for (const [key, val] of Object.entries(meetingMember[documentId])) {
    //   if (val === 0) {
    //     userList.push(key);
    //   }
    // }
    // const _id = mongoose.Types.ObjectId();

    // const noticeInfo = {
    //   id: _id,
    //   documentId: Docu._id,
    //   url: null,
    //   target: null,
    //   type: "deleteParty",
    //   title: Docu.title,
    //   message: "게시물이 삭제 되었습니다.",
    // };

    await Docu.deleteOne(); //게시물 삭제
    // await Chatting.findOneAndDelete({ documentChatId: Docu._id }); //게시물 연결된 채팅방 삭제

    // Notification.createNotice(userList, noticeInfo);
    // main.to(documentId).emit("notice", noticeInfo, userId);
    // main.to(documentId).emit("quit");
    // chat.to(documentId).emit("quit");
    // chat.in(documentId).disconnectSockets(); // 연결 끊어서 채팅 방 삭제
    // delete meetingMember[documentId];
    res.status(200).json({
      message: "게시물이 삭제 되었습니다.",
    });
  }),

  // 회원 탈퇴 시 모든 게시물 삭제
  deleteAllPost: asyncHandler(async (req, res) => {
    const Docu = Document.find({ creatorId: req.params.creatorId });
    console.log("docu", Docu);
    await Docu.deleteMany(); // 전체 게시물 삭제
    res.status(200).json({
      message: "모든 게시물이 삭제 되었습니다.",
    });
  }),
  // 게시물 수정
  updatePost: asyncHandler(async (req, res) => {
    const { documentId } = req.body.params;
    const findDocu = await Document.findOne({ _id: documentId });
    if (findDocu) {
      const {
        title,
        description,
        category,
        date,
        deliveryFee,
        totalNum,
        located,
        latitude,
        longitude,
        deliveryTag,
        payTag,
      } = req.body;

      await Document.findOneAndUpdate(
        { _id: documentId },
        {
          title,
          description,
          category,
          date,
          deliveryFee,
          totalNum,
          located,
          latitude,
          longitude,
          deliveryTag,
          payTag,
        }
      );
      return res.status(200).json({ message: "게시물 수정 완료!" });
    } else {
      return res.status(400).json({ message: "게시물이 존재하지 않습니다" });
    }
  }),
};
