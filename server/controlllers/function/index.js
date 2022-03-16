const UserDocument = require("../../models/userDocument");
const Document = require("../../models/document");
const asyncHandler = require("express-async-handler");
module.exports = {
  vaildDocumentId: asyncHandler(async (userId) => {
    const usersDocument = await UserDocument.find(
      { userId: userId, done: 0 },
      { document_id: true }
    );
    return [...usersDocument];
  }),

  meetingMemberStatus: asyncHandler(async () => {
    const findDocu = await Document.find({ done: false });
    const userList = await Document.find({ done: false }, { users: 1 });
    const result = {};

    userList.map((user) => {
      result[findDocu._id] = {};
      result[findDocu._id][user.userId] = 0;
    });

    return result;
  }),

  currentTime: function timestamp() {
    const today = new Date();
    today.setHours(today.getHours() + 9);
    return today.toISOString().replace("T", " ").substring(0, 16);
  },

  findAllDocument: async (queries) => {
    const createor = await Document.find({ _id: queries }).populate(
      "user_id",
      "_id nickname profile_img"
    );

    const documenId = await Document.find({ _id: queries }, { _id });

    const partyUser = await UserDocument.find({ _id: documenId }).populate(
      "user_id",
      "_id nickname profile_img"
    );

    const documenList = [createor, partyUser];
    return documenList.map((el) => {
      const users = el.UserDocument.map((userInfo) => {
        return userInfo.User;
      });
      delete el.UserDocument;
      return { ...el, users };
    });
  },

  findDocument: async (queries) => {
    return Document.findOne({ _id: queries });
  },

  findOrCreateUser_document: async (queries) => {
    const userId = UserDocument.find({ queries }).populate("userId", "_id");
    const documenId = UserDocument.find({ queries }).populate(
      "documentId",
      "_id"
    );

    return { userId, documenId };
  },

  User_findDocument: async (queries) => {
    return UserDocument.findOne({ queries });
  },

  findUser: async (queries) => {
    // const req = attributes.map((el) => `${el}:true`);
    return await User.findOne({ _id: queries });
  },

  modifyDocument: (documentLi) => {
    const sortedDocumentList = documentLi
      .reduce(
        (acc, cur) => {
          if (cur.currentNum >= cur.totalNum) {
            acc[1].push(cur);
            return acc;
          }
          acc[0].push(cur);
          return acc;
        },
        [[], []]
      )
      .flat();
    return sortedDocumentList; // 정보 각각 할당해줘야 될수도
  },
};
