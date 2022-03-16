const NAVER_STATE = "Welcome,2022";
const CLIENT_ID = "7TTyOgSeDfLlUQRXS94h";
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=http://localhost:3001/naver&state=${NAVER_STATE}`;
