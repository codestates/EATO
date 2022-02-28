const asyncHandler = require("express-async-handler");
const User = require("../models/user.js");
const {
  getOption,
  revokeAccess,
  updateAccessToken,
} = require("../support/oAuth.js");

module.exports = {
  // 회원가입
  // POST
  // user/signUp
  createUser: asyncHandler(async (req, res) => {
    const { email, password, nickname } = req.body;
    const alreadyEmail = await User.findOne({ email: email });

    if (alreadyEmail) {
      return res.status(401).json({ message: "존재하는 이메일 입니다." });
    } else {
      if (email && password && nickname) {
        const user = new User({
          // profile: { email, password },
          email,
          password,
          nickname,
        });
        user.save();

        res.status(201).json({ message: "회원가입에 성공했습니다." });
      } else {
        res.status(400).json({ message: "모든 항목을 작성해 주세요." });
      }
    }
  }),

  // 로그인
  // POST
  // user/login
  userLogin: asyncHandler(async (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "존재하지 않는 아이디입니다.",
        });
      }
      res.locals.userId = user._id;
      user
        .comparePassword(req.body.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.json({
              loginSuccess: false,
              message: "비밀번호가 일치하지 않습니다.",
            });
          }
          user
            .generateToken()
            .then((user) => {
              res
                .cookie("x_auth", user.token)
                .cookie("userId", user._id)
                .status(200)
                .json({
                  loginSuccess: console
                    .log
                    // res.cookie.split("=")[1].split(";")[0]
                    // document.cookie
                    (),
                  userId: user._id,
                });
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

  kakaoSignin: asyncHandler(async (req, res) => {
    const { kakaoClientId, kakaoClientSecret } = kakao;
    const { authorizationCode } = req.body;
    try {
      const tokenResponse = await axios({
        method: "POST",
        url: "https://kauth.kakao.com/oauth/token",
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params: {
          grant_type: "authorization_code",
          client_id: kakaoClientId,
          client_secret: kakaoClientSecret,
          code: authorizationCode,
        },
      });
      const { access_token: accessToken } = tokenResponse.data;
      const kakaoUserInfo = await axios({
        method: "GET",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { nickname, email } = kakaoUserInfo.data.kakao_account;

      User.findOne({ email }, (err, user) => {
        if (user) {
          user.generateToken().then((user) => {
            res
              .cookie("x_auth", user.toekn)
              .status(200)
              .json({ id, email, nickname });
          });
        }
        const person = new User({
          email,
          nickname,
          authStatus: 1,
        });
        person.save();
        res.status(201).json({ message: "회원가입에 성공했습니다." });
      });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error occured during social login" });
    }
  }),

  naverSignin: asyncHandler(async (req, res) => {
    const { naverClientId, naverClientSecret } = kakao;
    const { authorizationCode } = req.body;
    try {
      const tokenResponse = await axios({
        method: "POST",
        url: "https://nid.naver.com/oauth2.0/token",
        params: {
          grant_type: "authorization_code",
          client_id: naverClientId,
          client_secret: naverClientSecret,
          code: authorizationCode,
        },
      });
      const { access_token: accessToken } = tokenResponse.data;
      const naveroUserInfo = await axios({
        method: "GET",
        url: "https://openapi.naver.com/v1/nid/me",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { nickname, email } = naveroUserInfo.response;

      User.findOne({ email }, (err, user) => {
        if (user) {
          user.generateToken().then((user) => {
            res
              .cookie("x_auth", user.toekn)
              .status(200)
              .json({ id, email, nickname });
          });
        }
        const person = new User({
          email,
          nickname,
          authStatus: 1,
        });
        person.save();
        res.status(201).json({ message: "회원가입에 성공했습니다." });
      });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error occured during social login" });
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
      await User.deleteOne({ _id: user._id });
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
    await User.deleteOne({ _id: user._id });
    res.status(200).json(message);
  }),
};
