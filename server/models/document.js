const mongoose = require("mongoose");
const { Schema } = mongoose;
const DocumentSchema = new Schema(
  {
    title: String,
    deliveryFee: Number,
    placeName: String,
    latitude: Number,
    longitude: Number,
    date: Date,
    time: String, //Number로 변경할수도
    totalNum: Number,
    currentNum: Number,
    description: String,
    category: Number,
    categoryImg: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //required: true,
    },
    userDocument_id: {
      type: Schema.Types.ObjectId,
      ref: "Document",
      //required: true,
    },

    done: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Document", DocumentSchema);
