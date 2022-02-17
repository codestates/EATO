const jwt = require("jsonwebtoken");

module.exports = {
  // 토큰 생성
  generateToken: (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
  },

  // 유효한 토큰인지 검증
  verifyToken: (token) => {
    try {
      const decoded = verify(token, process.env.JWT_SECRET_KEY);
      return decoded;
    } catch (err) {
      return null;
    }
  },

  // 토큰 해독
  isAuthorized: (req) => {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];
      try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
      } catch (err) {
        return null;
      }
    }
    return null;
  },

  // 토큰 전달
  sendAccessToken: (res, accessToken) => {
    res.cookie("jwt", accessToken, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ message: "ok" });
  },
};
