const UserDocument = require("../models/userDocument");
const Document = require("../models/document");
const asyncHandler = require("express-async-handler");
module.exports = {
  getVaildGatheringId: asyncHandler(async (userId) => {
    const usersGatherings = await UserDocument.find(
      { userId: userId, done: 0 },
      { document_id: true }
    );
    return [...usersGatherings];
  }),
  realTimeUserStatus: asyncHandler(async () => {
    // const gatheringList = await Document.find(
    //   { done: 0 },
    //   { chatting_id: true }
    // );
    // const list = [...gatheringList];
    // const result = {};
    // list.forEach((document) => {
    //   const { id } = document.dataValues;
    // });
  }),
  getCurrentTime: function timestamp() {
    const today = new Date();
    today.setHours(today.getHours() + 9);
    return today.toISOString().replace("T", " ").substring(0, 16);
  },
};
