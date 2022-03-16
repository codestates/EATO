const {
  findAllDocument,
  findDocument,
  findOrCreateUser_document,
  User_findDocument,
  findUser,
  currentTime,
  modifyDocument,
} = require("./function");
const Notification = require("../models/notification");
const Document = require("../models/document");
const User = require("../models/user");
const mongoose = require("mongoose");

module.exports = {
  joinParty: async (req, res) => {
    // 유저가 이미 있는 모임에 참가 신청을 하는 Api
    const { userId } = req.cookies;
    const { documentId } = req.params;
    const findDocu = Document.findOne({ users: userId });

    const docuId = Number(req.params.documentId);

    if (findDocu) {
      return res.status(400).json({ message: "이미 참여중입니다." });
    } else {
      const docu = await Document.findOne({ _id: req.params.documentId });
      const { totalNum, currentNum, done, date, title } = docu;
      const documentSetDay = +new Date(date);
      const currentDay = +new Date(currentTime().split(" ")[0]);
      if (totalNum <= currentNum || done === 1 || documentSetDay < currentDay) {
        // 파티에 참여할 수 없는 조건
        return res
          .status(400)
          .json({ message: "참여인원이 다 찼거나 종료되었습니다." });
      }
      const user = await User.findOne({ _id: ObjectId(userId) });
      const meetingMember = req.app.get("meetingMember");
      const userIds = [];
      for (const [key, val] of Object.entries(meetingMember[docuId])) {
        if (val === 0) {
          userIds.push(key);
        }
      }
      const main = req.app.get("main");
      const noticeInfo = {
        id: _id,
        documentId: docuId,
        url: `/chat/${docuId}`,
        target: userId,
        title: title,
        message: `${user.nickname}님이 파티에 참여했습니다`,
      };

      Notification.createNotice(userIds, noticeInfo);
      main.to(docuId).emit("notice", noticeInfo);
      meetingMember[docuId][userId] = 0;
      // 이벤트
      await docu.update({ currentNum }, { $inc: { currentNum: 1 } });
      return res.status(201).json({ message: "참여완료" });
    }
  },

  leaveParty: async (req, res) => {
    const { userId } = req.cookies; // 토큰에 있는 유저 아이디
    const { documentId } = req.params;
    const findDocu = Document.findOne({ users: userId }); //string타입
    const targetUserId = Document.findOne(
      { _id: documentId },
      { creatorId: 1 }
    ); //object타입

    if (!findDocu) {
      return res.status(400).json({ message: "참여중인 유저가 아닙니다." });
    } else {
      const docuId = Number(documentId);
      const { currentNum, title } = findDocu;
      const user = User.findOne({ _id: ObjectId(userId) });
      const host = targetUserId.equals(userId); //ObjectId타입이랑 string타입이랑 비교해서 boolean값 반환시켜줌

      const noticeType = host ? "ban" : "leave";
      const noticeMessage = host
        ? `${user.nickname}님이 모임에서 추방되었습니다.`
        : `${user.nickname}님이 모임을 떠났습니다.`;

      const meetingMember = req.app.get("meetingMember");

      delete meetingMember[docuId][userId];

      const userIds = Object.keys(meetingMember[docuId]);

      const _id = mongoose.Types.ObjectId();
      const main = req.app.get("main");
      const chat = req.app.get("chat");
      const noticeInfo = {
        id: _id,
        documentId: docuId,
        type: noticeType,
        url: `/chat/${docuId}`,
        target: targetUserId,
        title: title,
        message: noticeMessage,
      };

      Notification.createNotice(userIds, noticeInfo);
      main.to(docuId).emit("notice", noticeInfo);
      chat.to(docuId).emit("leave", targetUserId);

      await findDocu.deleteOne();
      findDocu.update({ currentNum }, { $inc: { currentNum: -1 } });
      return res.status(200).json({ message: "채팅방을 나갔습니다." });
    }
  },
};
