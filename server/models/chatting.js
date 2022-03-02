const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  id: {
    type: String,
    //required: true,
  },
  message: {
    type: String,
    required: true,
  },

  date: {
    type: String,
  },
});
const chattingSchema = new Schema(
  {
    chatInfo: {
      type: Object,
    },
    chatLog: {
      type: [chatSchema],
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }, // 게시물 작성자
    documentChatId: {
      type: Schema.Types.ObjectId,
      ref: "Document",
    }, // 채팅이랑 연결된 게시물
  },
  { versionKey: false }
);

chattingSchema.statics.typeChat = async function (
  room,
  _id,
  userId,
  nickname,
  message,
  date
) {
  const AddedChatInfo = await this.findOneAndUpdate(
    { _id: room },
    {
      $push: { chatLog: { _id, id: userId, message, nickname, date } },
    },
    { returnDocument: "after" }
  );
  return AddedChatInfo.chatInfo;
};

chattingSchema.statics.removeChattingOfUser = async function (userId) {
  await this.deleteMany({ creatorId: userId });
  return;
};

module.exports = mongoose.model("Chatting", chattingSchema);
