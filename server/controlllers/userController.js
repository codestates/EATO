const asyncHandler = require("express-async-handler");
const User = require("../models/user.js");
const getAccessToken = require("../support/token.js");
const {
  getOption,
  getUserInfo,
  revokeAccess,
  updateAccessToken,
} = require("../support/oAuth.js");

module.exports = {
  // 사용가능한 이메일인지 확인
  // POST
  // user/signUp
  validEmail: asyncHandler(async (req, res) => {
    const { email } = req.body;

    const alreadyEmail = await User.findOne({ "profile.email": email });

    if (alreadyEmail) {
      res.status(401).json({ message: "존재하는 이메일 입니다." });
    } else {
      res.status(200).send({ message: "사용가능한 이메일 입니다." });
    }
  }),

  // 회원가입
  // POST
  // user/signUp
  createUser: asyncHandler(async (req, res) => {
    const { email, password, nickname } = req.body;

    if (email && password && nickname) {
      const user = new User({
        // profile: { email, password },
        email,
        password,
        nickname,
      });
      // Mongoose에 Mixed 유형의 값이 변경되었음을 알리려면 doc.markModified(path)방금 변경한 Mixed 유형에 대한 경로를 전달하는 를 호출해야 합니다.
      //user.markModified("profile");
      // user.markModified("nickname");
      user.save();

      res.status(201).json({ message: "회원가입에 성공했습니다." });
    } else {
      res.status(400).json({ message: "모든 항목을 작성해 주세요." });
    }
  }),

  // 로그인
  // POST
  // user/login
  userLogin: asyncHandler(async (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.json({
          loginSuccess: false,
          message: "존재하지 않는 아이디입니다.",
        });
      }
      user
        .comparePassword(req.body.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.json({
              loginSuccess: false,
              message: "비밀번호가 일치하지 않습니다",
            });
          }
          user
            .generateToken()
            .then((user) => {
              res
                .cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id });
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        })
        .catch((err) => res.json({ loginSuccess: false, err }));
      //비밀번호가 일치하면 토큰을 생성한다
      //해야될것: jwt 토큰 생성하는 메소드 작성
    });
    // 비밀번호는 암호화되어있기때문에 암호화해서 전송해서 비교를 해야한다 .
    //암호화 메소드는 User.js에 작성한다.
    //로그인 암호화 비밀번호가 일치하면 jwt 토큰을 발급한다
  }),

  // 로그아웃
  // GET
  // user/logout
  logout: asyncHandler(async (req, res) => {
    res.clearCookie("x_auth");
    res.status(200).json({ message: "로그아웃에 성공했습니다." });
  }),

  // 소셜 로그인
  // GET
  // user/:kana
  socialLogin: asyncHandler(async (req, res) => {
    const { kana } = req.params;
    const { code } = req.query; // ?

    const options = getOption(kana, code);
    const token = await getAccessToken(options, "access_token");
    const userInfo = await getUserInfo(kana, options.userInfo_url, token);

    let uuid;
    let email;
    let nickname;

    if (kana === "kakao") {
      uuid = userInfo.id;
      email = userInfo.kakao_account.email;
      nickname = userInfo.kakao_account.profile.nickname;
    }
    if (kana === "naver") {
      uuid = userInfo.response.id;
      email = userInfo.response.email;
      nickname = userInfo.response.nickname;
    }
    // DB와 연락하기
    const { access_token, refresh_token } = token;
    const cookie = sendAccessToken(res, access_token);
    const user = await User.findOneAndUpdate(
      {
        [`${kana}.uuid`]: uuid,
      },
      {
        [`${kana}.email`]: email,
        [`${kana}.accessToken`]: access_token,
        [`${kana}.refreshToken`]: refresh_token,
      },
      { new: true }
    );

    if (user) {
      res.json({
        _id: user._id,
        nickname: user.nickname,
        cookie,
      });
    } else {
      const newUser = new User({
        [`${kana}.uuid`]: uuid,
        [`${kana}.email`]: email,
        [`${kana}.accessToken`]: access_token,
        [`${kana}.refreshToken`]: refresh_token,
        nickname,
      });

      await newUser.save();
      res.json({
        _id: newUser._id,
        nickname: newUser.nickname,
        cookie,
      });
    }
  }),

  // 유저 프로필 수정(닉네임, 지역) // 수정해야될수도 nickname location 조건 따로 나누기
  // PATCH
  // user/userInfo
  updateProfile: asyncHandler(async (req, res) => {
    const { nickname, location } = req.body;
    const toekn = generateAccessToken(req.user._id);
    const cookie = sendAccessToken(res, toekn);
    if (nickname && location) {
      await User.findByIdAndUpdate(
        req.user._id,
        { nickname: nickname, location: location },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "프로필 업데이트가 완료 되었습니다.",
        cookie,
      });
    } else {
      res.status(400).json({
        message: "닉네임 또는 지역을 작성해 주세요.",
      });
    }
  }),

  // 회원 탈퇴
  // DELETE
  // user/userInfo
  deleteUser: asyncHandler(async (req, res) => {
    // 유저 본인이 탈퇴 요청
    const user = await User.findOne({ email: req.body.email });
    if (user.email) {
      await User.updateOne(
        { _id: user._id },
        {
          $unset: { "profile.password": 1 },
        },
        {
          upsert: true,
        }
      );
      res.status(200).json({ message: "회원탈퇴가 완료 되었습니다." });
      return;
    }
    const { naver, kakao } = user;
    const kana = naver.uuid ? "naver" : kakao.uuid ? "kakao" : null;

    const options = getOption(kana, `${user[kana].refreshToken}`);
    const token = await updateAccessToken(options, "refresh_token");
    const { access_token } = token;

    // 엑세스 끊기
    const revokeRes = await revokeAccess(corp, access_token);
    let message;

    if (revokeRes.data.id && kana === "kakao") {
      message = "카카오 계정과 연결 끊기 완료";
    }
    if (revokeRes.data.result === "success" && kana === "naver") {
      message = "네이버 계정과 연결 끊기 완료";
    }
    await User.updateOne(
      { _id: user._id },
      {
        $unset: {
          [`${kana}.accessToken`]: 1,
          [`${kana}.refreshToken`]: 1,
        },
      },
      // Upsert - 특정한 옵션을 주어서 수정할 대상이 없는 경우 insert 동작을 수행하도록 할 수 있습니다
      // Upsert 기능을 하려면 update, updateOne, updateMany, replaceOne 메소드에 옵션으로 { upsert: true } 를 주면 됩니다.
      // 또는 findAndModify, findOneAndUpdate, findOneAndReplace 메소드에 upsert: true를 추가할 수도 있습니다.
      { upsert: true }
    );
    res.status(200).json(message);
  }),
};
