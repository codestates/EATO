import mongoose from "mongoose";

const AreaSchema = new Schema({
  areaName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Area = mongoose.model("Area", AreaSchema);
export default Area;
