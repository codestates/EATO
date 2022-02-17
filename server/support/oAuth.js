const axios = require("axios");
const qs = require("qs");

class Kakao {
  constructor(code) {
    this.url = "https://kauth.kakao.com/oauth/token";
    this.client_id = process.env.KAKAO_CLIENT_ID;
    this.redirect_uri = `${process.env.REDIRECT_URI}/kakao`;
    this.code = code; // 인가 코드 혹은 갱신 토큰

    // userInfo
    this.userInfo_url = "https://kapi.kakao.com/v2/user/me";
  }
}

class Naver {
  constructor(code) {
    this.url = "https://nid.naver.com/oauth2.0/token";
    this.client_id = process.env.NAVER_CLIENT_ID;
    this.client_secret = process.env.NAVER_CLIENT_SECRET;
    this.redirect_uri = `${process.env.REDIRECT_URI}/naver`;
    this.code = code;
    this.state = process.env.NAVER_STATE;

    // userInfo
    this.userInfo_url = "https://openapi.naver.com/v1/nid/me";
  }
}

module.exports = {
  getOption: (kana, code) => {
    switch (kana) {
      case "kakao":
        return new Kakao(code);
      case "naver":
        return new Naver(code);
      default:
        return null;
    }
  },

  config: {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  },

  // 토큰 얻기
  getAccessToken: async (options, grantType) => {
    if (options.state) {
      const res = await axios.post(
        // 네이버
        options.url,
        qs.stringify({
          grant_type: grantType,
          client_id: options.client_id,
          client_secret: options.client_secret,
          redirect_uri: options.redirect_uri,
          code: options.code,
          state: options.state,
        }),
        config
      );
      return res.data;
    }
    const res = await axios.post(
      // 카카오
      options.url,
      qs.stringify({
        grant_type: grantType,
        client_id: options.client_id,
        redirect_uri: options.redirect_uri,
        code: options.code,
      }),
      config
    );
    return res.data;
  },

  // 유저 정보 얻기
  getUserInfo: async (url, token) => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    return res.data;
  },

  // 토큰 갱신
  updateAccessToken: async (options, grantType) => {
    const res = await axios.post(
      options.url,
      qs.stringify({
        grant_type: grantType,
        client_id: options.client_id,
        client_secret: options.client_secret,
        refresh_token: options.code,
      }),
      config
    );
    return res.data;
  },

  // 연결 끊기
  revokeAccess: async (kana, token) => {
    // 복수의 if 조건문은 switch문으로 바꿀 수 있습니다.
    switch (kana) {
      case "naver":
        return await axios.post(
          `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&access_token=${token}&service_provider=NAVER`
        );
      case "kakao":
        return await axios.get("https://kapi.kakao.com/v1/user/unlink", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      default:
        return null;
    }
  },
};
