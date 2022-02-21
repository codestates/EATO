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
const mongoose = require("mongoose");

module.exports = {
  joinDocument: async (req, res) => {
    // 유저가 이미 있는 모임에 참가 신청을 하는 Api
    const { userId } = res.locals;
    const documentId = Number(req.params.documentId);
    try {
      const result = await findOrCreateUser_document({
        userId,
        documentId,
      });
      if (!result) {
        return res.status(400).json({ message: "이미 참여중입니다." });
      }
      const documentInfo = await findDocument(documentId);
      const { totalNum, currentNum, done, date, title } = documentInfo;
      const documentSetDay = +new Date(date);
      const currentDay = +new Date(currentTime().split(" ")[0]);
      if (totalNum <= currentNum || done === 1 || documentSetDay < currentDay) {
        // 파티에 참여할 수 없는 조건
        return res
          .status(400)
          .json({ message: "모임에 인원이 다 찼거나 종료된 모임입니다" });
      }
      // TODO: 유저가 파티에 참여했다는 이벤트를 모든 참여자에게 알림 + 유저 관리 객체에 해당 유저 추가
      // 이벤트
      const userInfo = await findUser(userId);
      const { nickname } = userInfo;
      const meetingMember = req.app.get("meetingMember");
      const userIds = [];
      for (const [key, val] of Object.entries(meetingMember[documentId])) {
        if (val === 0) {
          userIds.push(key);
        }
      }
      const _id = mongoose.Types.ObjectId();
      const main = req.app.get("main");
      const noticeInfo = {
        id: _id,
        documentId: documentId,
        url: `/chat/${documentId}`,
        target: userId,
        title: title,
        message: `${nickname}님이 파티에 참여했습니다`,
      };
      // 채팅 시스템 알람이 없기 때문에 채팅에 참여중인 사람도 같이 알람을 받아야 함
      Notification.createNotice(userIds, noticeInfo);
      main.to(documentId).emit("notice", noticeInfo);
      meetingMember[documentId][userId] = 0;
      // 이벤트
      await documentInfo.update({ currentNum: currentNum + 1 });
      const joinedDocumentInfo = await findAllDocument(documentId);
      return res.status(201).json(modifyDocument(joinedDocumentInfo)[0]);
    } catch (err) {
      DBERROR(res, err);
    }
  },
  leaveParty: async (req, res) => {
    const { userId } = res.locals; // 토큰에 있는 유저 아이디
    const { userId: targetUserId } = req.params; // 도큐먼트 아이디와 타겟 유저 아이디
    const documenId = Number(req.params.documenId);

    try {
      // 해당 유저의 documentUserInfo 정보가 없다면 그 유저는 참여중이 아님
      const documentUserInfo = await User_findDocument({
        userId: targetUserId,
        documenId,
      });
      if (!documentUserInfo) {
        return res.status(400).json({ message: "참여중인 유저가 아닙니다." });
      }

      const documentInfo = await findDocument(documenId);
      const { currentNum, title, user_id } = documentInfo;

      const userInfo = await findUser({ id: targetUserId });
      const { nickname } = userInfo;

      // 토큰의 유저아이디와 해당 document의 user_id가 같다면 요청한 유저는 호스트
      const host = userId === user_id;
      // 호스트가 아니면서 타켓유저아이디와 토큰에 유저아이디가 다르다면 권한이 없음
      if (!host && targetUserId !== userId) {
        return res.status(400).json({ message: "You don't have permission" });
      }

      const noticeMessage = host
        ? `${nickname}님이 강퇴 되었습니다.`
        : `${nickname}님이 채팅방을 나갔습니다.`;

      const meetingMember = req.app.get("meetingMember");
      delete meetingMember[documenId][userId];
      const userIds = Object.keys(meetingMember[documenId]);
      const _id = mongoose.Types.ObjectId();
      const main = req.app.get("main");
      const chat = req.app.get("chat");
      const noticeInfo = {
        id: _id,
        documenId: documenId,
        url: `/chat/${documenId}`,
        target: targetUserId,
        title: title,
        message: noticeMessage,
      };
      // 채팅 시스템 알람이 없기 때문에 채팅에 참여중인 사람도 같이 알람을 받아야 함

      Notification.createNotice(userIds, noticeInfo);
      main.to(documenId).emit("notice", noticeInfo);
      chat.to(documenId).emit("leave", targetUserId);
      // 이벤트

      await documentUserInfo.remove();
      documentInfo.update({ currentNum }, { $inc: { currentNum: -1 } });
      const leftDocumentInfo = await findAllDocument(documenId);
      return res.status(200).json(modifyDocument(leftDocumentInfo)[0]);
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
