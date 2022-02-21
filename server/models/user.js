const mongoose = require("mongoose");
mongoose.set("bufferCommands", true);
// 1999년에 publish된 password-hashing function이다.
// Blowfish 암호를 기반으로 설계된 암호화 함수이며 현재까지 사용중인 가장 강력한 해시 메커니즘 중 하나이다.
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    profile: {
      email: {
        type: String,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "이메일 형식에 맞지 않습니다",
        ],
      },
      password: {
        type: String,
        minlength: [8, "비밀번호를 8자 이상 입력해주세요"],
        match: [
          /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
          "비밀번호 형식에 맞지 않습니다",
        ],
      },
    },
    naver: {
      uuid: { type: String },
      email: { type: String },
      accessToken: { type: String },
      refreshToken: { type: String },
    },
    kakao: {
      uuid: { type: Number },
      email: { type: String },
      accessToken: { type: String },
      refreshToken: { type: String },
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
  },
  {
    versionKey: false,
  },
  // __v 안보이게 하고싶을때
  { bufferCommands: false }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  const password = await bcrypt.compare(enteredPassword, this.profile.password);
  return password;
};

userSchema.pre("save", async function (next) {
  // 몽구스의 middleware기능이다
  // init, validate, save, remove 메소드 수행시 처리되는 미들웨어 펑션이다
  // 복잡한 유효성검사, 트리거 이벤트 처리등. 예로 사용자를 삭제하면 사용자 관련 블로그포스트도 삭제하기같은 경우 사용 또는 에러 핸들링
  if (!this.isModified("profile")) {
    // isModified는 ()안이 변경 될 경우 항상 true를 리턴한다
    next();
  }
  const salt = await bcrypt.genSalt(10);
  // genSalt()
  // 메서드는 소금 생성기, 소금을 생성하는 메서드이다.
  // 솔트(salt)를 생성하는데 솔트는 해시 함수에서 암호화된 비밀번호를 생성할 때 추가되는 바이트 단위의 임의의 문자열이다.
  // * () 안에 숫자를 넣을 수 있으며 기본값은 10, 숫자가 높아질수록 해시를 생성하고 검증하는 시간이 느려진다.
  // => 보안이 우수해지지만 그만큼 응답 시간이 오래 걸리기 때문에 적절한 숫자를 사용해야 한다.
  this.profile.password = await bcrypt.hash(this.profile.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
