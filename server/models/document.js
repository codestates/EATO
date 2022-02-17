const mongoose = require("mongoose");
const { Schema } = mongoose;
const DocumentSchema = new Schema({
  title: String,
  deliveryFee: Number,
  area_id: Number,
  placeName: String,
  latitude: Number,
  longitude: Number,
  date: Date,
  time: String, //Number로 변경할수도
  totalNum: Number,
  currentNum: Number,
  description: String,
  category: Number,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  done: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", DocumentSchema);
