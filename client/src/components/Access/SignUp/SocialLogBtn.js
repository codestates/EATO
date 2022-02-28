import React from "react";
import Naver from "../../../images/login_naver_icon.png";
import Kakao from "../../../images/login_kakao_icon.png";
// import { NAVER_AUTH_URL } from "../../OAuth/naver";
import { KAKAO_AUTH_URL } from "../../OAuth/kakao";

export default function SocialLogBtn() {

  const HandleKakaoLogin = async () => {
    await window.location.assign(
     KAKAO_AUTH_URL
    );
  };
  
  // const kakaoLogin = () => {
  //   window.Kakao.Auth.login({
  //     scope: 'profile_nickname, profile_image, account_email',
  //       success: function(authObj) {
  //         console.log(authObj);
  //         window.Kakao.API.request({
  //           url: '/v2/user/me',
  //           success: res => {
  //             const kakao_account = res.kakao_account;
  //             console.log(kakao_account);
  //           }})
  //         }
  //     })
  //   }

  return (
    <>
      <p className="signup-social-text">SNS 계정으로 간편하게 시작하기</p>
      <article className="signup-social-btn-box">
        {/* Naver Login */}
        <div className="naver-icon-box">
          <button className="naver-signup-btn" onClick={() => HandleKakaoLogin()}>
            {/* <a href={NAVER_AUTH_URL}> */}
              <img src={Naver} alt="naver" className="naver-icon-img" />
            {/* </a> */}
          </button>
        </div>
        {/* Kakao Login*/}
        <div className="kakao-icon-box">
          <button className="kakao-signup-btn">
            <a href={KAKAO_AUTH_URL}>
              <img src={Kakao} alt="kakao" className="kakao-icon-img" />
            </a>
          </button>
        </div>
      </article>
    </>
  );
}
