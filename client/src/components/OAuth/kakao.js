const CLIENT_ID = "32999d6520e747ba0baa452bcdfd00c7";
const REDIRECT_URI = "http://127.0.0.1:5500/client/public/index.html";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}/kakao`;

//카카오 로그인 버튼에 href로 링크걸어서 연결해주기
