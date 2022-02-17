const jwt = require("jsonwebtoken");
const User = require("../models/user");

// 로그인 유저만 private route 접근을 허락해주는 함수
// 토큰 정보를 받아서 해독하고 검증한다.
module.exports = {
  protect: async (req, res, next) => {
    const authorization = req.cookies;
    if (!authorization) {
      return null;
    }
    const token = authorization.jwt;
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.user = await User.findById(decoded.id).select(
        "-profile.password  -naver.accessToken -kakao.accessToken -naver.refreshToken -kakao.refreshToken"
      );
      next();
    } catch (err) {
      console.error(error);
      res.status(401);
      throw new Error("에러에러 삐용삐용");
    }
  },
};
