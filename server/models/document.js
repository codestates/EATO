const mongoose = require("mongoose");
const { Schema } = mongoose;
const DocumentSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    deliveryFee: Number,
    payTag: String,
    deliveryTag: String,
    located: String,
    date: String,
    totalNum: Number,
    currentNum: {
      default: 1,
      type: Number,
    },
    description: String,
    category: String,
    categoryImg: String,
    creatorId: {
      type: String,
      ref: "User",
    },
    // 작성자 아이디
    users: [
      {
        type: String,
        ref: "User",
      },
    ],
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
