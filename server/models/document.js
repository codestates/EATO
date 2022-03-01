const mongoose = require("mongoose");
const { Schema } = mongoose;
const DocumentSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    deliveryFee: Number,
    placeName: String,
    latitude: Number,
    longitude: Number,
    date: Date,
    time: String, //Number로 변경할수도
    totalNum: Number,
    currentNum: {
      default: 1,
      type: Number,
    },
    description: String,
    category: Number,
    categoryImg: String,
    user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        //required: true,
      },
    ], // 작성자
    userDocument_id: {
      type: Schema.Types.ObjectId,
      ref: "UserDocument",
      //required: true,
    }, //
    chatting_id: {
      type: Schema.Types.ObjectId,
      ref: "Chatting",
      //required: true,
    }, //
    done: {
      default: 0,
      type: Boolean,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Document", DocumentSchema);
