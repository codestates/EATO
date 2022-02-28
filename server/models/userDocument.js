const mongoose = require("mongoose");
const { Schema } = mongoose;

// 유저가 참여하고 있는 게시물 (채팅방의 게시물)
const userDocumentSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  documentId: {
    type: Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  chattingId: {
    type: Schema.Types.ObjectId,
    ref: "Chatting",
    required: true,
  },
});

module.exports = mongoose.model("UserDocument", userDocumentSchema);
