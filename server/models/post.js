import mongoose from "mongoose";

const PostSchema = new Schema({
  title: String,
  deliveryFee: Number,
  payTag: Number,
  deliveryTag: Number,
  area_id: Number,
  placeName: String,
  latitude: Number,
  longitude: Number,
  date: Date,
  time: Number,
  totalNum: Number,
  currentNum: Number,
  description: String,
  category: Number,
  user_id: Number,
  done: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
