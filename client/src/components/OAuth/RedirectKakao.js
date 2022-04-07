import React, { useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
export default function RedirectKakao() {
  axios.defaults.withCredentials = true;
  let params = new URL(document.location.toString()).searchParams;
  let code = params.get("code"); // 인가코드 받는 부분
  useEffect(() => {
    console.log(code);
    // let grant_type = "authorization_code";
    // let client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;

    axios
      // .post(
      //   `https://cors-anywhere.herokuapp.com/https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code}&client_secret=Hl0YYxbzzA9dGvbXzFqVjarPzR1nmsSF`,
      //   {
      //     headers: {
      //       "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      //       withCredentials: true,
      //     },
      //   }
      // )
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code}&client_secret=Hl0YYxbzzA9dGvbXzFqVjarPzR1nmsSF`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log(res);
        // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
      });
  }, [code]);

  return (
    <>
      <Loading>로딩중</Loading>
    </>
  );
}
