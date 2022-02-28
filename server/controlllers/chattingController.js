const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Document = require("../models/document");
const Chatting = require("../models/chatting");
const Notification = require("../models/notification");
const userDocument = require("../models/userDocument");

//채팅목록 받아오기
//채팅방 입장
//채팅 보내기
//채팅 참여 우저 목록 가져오기
//채팅 나가기
//알림이랑 연동?
//강퇴 => 나이트메어

module.exports = {
  chatList: async (req, res) => {
    const { userId } = res.cookie;
    try {
      //유저 아이디로 참여중인 게더링아이디를 찾는 함수입니다.
      const chatsList = await userDocument
        .find({ userId: userId })
        .populate("chattingId", {
          chatLog: { $slice: -1 },
          chatInfo: 1,
          creatorId: 1,
        })
        .lean();
      // 참여중인 게더링이 없을 경우에 응답입니다.
      if (!chatsList.length) {
        return res.status(200).json([]);
      }
      // 게더링 아이디로 mongoDB에서 채팅 인포를 가져옵니다.
      // const chatsList = await Chat.find(
      //   { _id: usersDocumentIds },
      //   { chatLog: { $slice: -1 }, chatInfo: 1, creatorId: 1 }
      // ).lean();
      // 응답으로 보내줄 데이터를 api문서에 맞게 가공하는 로직입니다.
      const chatsListToSend = await Promise.all(
        chatsList.map(async (el) => {
          const {
            chatLog: recentChat,
            _id: documentId,
            chatInfo,
            creatorId,
          } = el;
          if (recentChat.length === 0) {
            recentChat[0] = { message: null, date: null };
            return { documentId, chatInfo, creatorId, recentChat };
          }
          const { message, date } = recentChat[0];
          const recentChatInfo = { message, date };
          return {
            documentId,
            chatInfo,
            creatorId,
            recentChat: [recentChatInfo],
          };
        })
      );
      res.status(200).json(chatsListToSend);
    } catch (err) {
      DBERROR(res, err);
    }
  },
  enterChat: async (req, res) => {
    // 채팅 아이디로 document done필드를 확인 또는 현재 시간과 게더링 date비교후에 하루가 지났으면  진입 불가.
    // 채팅 로그들, 참여자 목록(id, image,nickname),  더링 정보(이모지,스포츠. 타이틀)
    const { userId } = res.cookie; // 게더링 아이디에 유저가 정말 참여중인 조회 용도
    const { documentId } = req.params;
    let checkParticipating = false;
    try {
      // 게더링 채팅에 입장 시에 게더링이 종료되지 않았나 체크하는 로직입니다.
      const documentInfo = await Document.findOne({ _id: documentId });
      const { done, date } = documentInfo;
      const documentSetDay = +new Date(date);
      const currentDay = +new Date(getCurrentTime().split(" ")[0]);
      if (done === 1 || documentSetDay < currentDay) {
        return res.status(400).json({ message: "already ended document" });
      }
      // 채팅에 접속한 유저가 게더링에 참여중인지 체크합니다.
      const documentListOfUser = await Document.find({
        _id: documentId,
      }).populate("user_id", "_id");
      documentListOfUser.user_id.forEach((el) => {
        if (el._id === userId) {
          checkParticipating = true;
        }
      });
      if (!checkParticipating) {
        return res
          .status(400)
          .json({ message: "not participating in this document" });
      }
      //채팅의 유저 리스트 (아이디, 닉네임, 이미지)를 불러옵니다.
      const participatingUserList = await Promise.all(
        documentListOfUser.user_id.map(async (el) => {
          const user = await User.find({ _id: el });
          const { _id, nickname } = user;
          return { _id, nickname };
        })
      );
      // mongoDB 에서 게더링 채팅방을 불러와 채팅 내역 요소들에 유저의 닉네임, 이미지, 아이디를 추가로 부여합니다.
      const userList = {}; // 가져온 유저정보의 id값을 키로 nickname과 image 를 저장합니다.
      participatingUserList.use_id.forEach((el) => {
        userList[el._id] = { nickname: el.nickname };
      });
      const chatInfobyDocumentId = await Chat.findOne({
        _id: documentId,
      }).lean();
      const { _id, chatInfo, chatLog, creatorId } = chatInfobyDocumentId;
      const translatedChatLog = chatLog.map((el) => {
        let userInfo = userList[el.id];
        if (!userInfo) {
          el.id = null;
          userInfo = { image: null, nickname: "모임을 나간 유저" };
        }
        return { ...userInfo, ...el };
      });
      res.status(200).json({
        documentId: _id,
        userList: participatingUserList,
        chatLog: translatedChatLog,
        chatInfo,
        creatorId,
      });
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
