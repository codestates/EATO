import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const UserSchema = new Schema({
  nickname: {
    type: String,
    minlength: [2, "닉네임은 2글자 이상 입력해주세요"],
    maxlength: [10, "닉네임은 10글자 이하로 입력해주세요"],
    trim: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "이메일 형식에 맞게 작성해주세요"],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, "비밀번호를 8자 이상 입력해주세요"],
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
      "비밀번호 형식에 맞지않습니다",
    ],
    trim: true,
    required: true,
  },
  social: {
    naver: {
      id: String,
      accessToken: String,
    },
    kakao: {
      id: String,
      accessToken: String,
    },
  },
  profile_img: String,
  location: String,
  authkey: String,
  authstatus: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);
export default User;
