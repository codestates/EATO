import mongoose from "mongoose";

const ChattingSchema = new Schema({
  user_id: Number,
  post_id: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Chatting = mongoose.model("Chatting", ChattingSchema);
export default Chatting;
