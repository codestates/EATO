import React from "react";
import Naver from "../../../images/login_naver_icon.png";
import Kakao from "../../../images/login_kakao_icon.png";

export default function SocialLogBtn() {
  return (
    <>
      <p className="signup-social-text">SNS 계정으로 간편하게 시작하기</p>
      <article className="signup-social-btn-box">
        {/* Naver Login */}
        <div className="naver-icon-box">
          <button className="naver-signup-btn">
            <img src={Naver} alt="naver" className="naver-icon-img" />
          </button>
        </div>
        {/* Kakao Login*/}
        <div className="kakao-icon-box">
          <button className="kakao-signup-btn">
            <img src={Kakao} alt="kakao" className="kakao-icon-img" />
          </button>
        </div>
      </article>
    </>
  );
}
