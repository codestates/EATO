const mongoose = require("mongoose");
mongoose.set("bufferCommands", true);
// 1999년에 publish된 password-hashing function이다.
// Blowfish 암호를 기반으로 설계된 암호화 함수이며 현재까지 사용중인 가장 강력한 해시 메커니즘 중 하나이다.
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const saltRounds = 10;
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    //profile: {
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "이메일 형식에 맞지 않습니다",
      ],
    },
    password: {
      type: String,
    },
    nickname: {
      type: String,
      required: true,
      minlength: [2, "2자 이상 입력해주세요."],
      maxlength: [10, "10자 이하로 입력해주세요."],
    },
    location: {
      type: String,
    },
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
    authStatus: {
      type: Boolean,
      default: 0,
    },
    createDocument: [
      {
        type: Object,
        ref: "Document",
      },
    ],
    userChat: [
      {
        type: Object,
      },
    ],
  },
  {
    versionKey: false,
  },
  // __v 안보이게 하고싶을때
  { bufferCommands: false }
);
userSchema.pre("save", function (next) {
  let user = this;

  //model 안의 paswsword가 변환될때만 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword) {
  //plainPassword를 암호화해서 현재 비밀번호화 비교
  return bcrypt
    .compare(plainPassword, this.password)
    .then((isMatch) => isMatch)
    .catch((err) => err);
};
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    (this._id.toHexString(), this.nickname),
    process.env.JWT_SECRET_KEY
  );
  this.token = token;

  return this.save()
    .then((user) => user)
    .catch((err) => err);
};
userSchema.statics.findByToken = function (token) {
  let user = this;
  //secretToken을 통해 user의 id값을 받아오고 해당 아이디를 통해
  //Db에 접근해서 유저의 정보를 가져온다
  return jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    return user
      .findOne({ _id: decoded, token: token })
      .then((user) => user)
      .catch((err) => err);
  });
};
module.exports = mongoose.model("User", userSchema);
