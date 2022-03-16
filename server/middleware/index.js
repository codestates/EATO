const jwt = require("jsonwebtoken");
const User = require("../models/user");

// 로그인 유저만 private route 접근을 허락해주는 함수
// 토큰 정보를 받아서 해독하고 검증한다.
module.exports = {
  protect: async (req, res, next) => {
    let token = req.cookies.x_auth;
    User.findByToken(token)
      .then((user) => {
        if (!user) return res.json({ isAuth: false, error: console.log(req) });
        req.token = token;
        req.user = user;
        next();
      })
      .catch((err) => {
        throw err;
      });
  },
};
