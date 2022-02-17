import React from "react";
import Logo from "../../../images/logo-signup.png";
import ForkW from "../../../images/fork_white.png";
import ForkR from "../../../images/fork_red.png";
import Naver from "../../../images/login_naver.png";
import Kakao from "../../../images/login_kakao.png";

function SignUp() {
  return (
    <main className="signin-up-wrapper">
      {/* 재사용 가능한 left page는 signin-up-left로 명명해놨음 */}
      <section className="signin-up-left">
        <div className="text-box">
          <h1 className="welcome">welcome</h1>
          <h1 className="welcome">EAt TOgether!</h1>
          <img src={Logo} className="left-logo" alt="logo"></img>
        </div>
        <div className="fork-box">
          <img src={ForkW} className="left-fork" alt="fork-img"></img>
        </div>
      </section>

      {/* 오른쪽 정보입력 페이지 */}
      <section className="signup-right">
        <img src={ForkR} className="right-fork" alt="fork-img" />

        <div className="signup-box">
          <div className="signup-title-text">회원가입</div>
          {/* 이메일 */}
          <div className="signup-input-container">
            <article className="signup-input-box">
              <p className="signup-input-title">이메일 주소</p>
              <input
                className="signup-input"
                type="email"
                placeholder="예) eato@gmail.com"
              ></input>
              <hr color="#DADADA" />
            </article>

            {/* 닉네임 */}
            <article className="signup-input-box">
              <p className="signup-input-title">닉네임</p>
              <input
                className="signup-input"
                type="text"
                minlength="1"
                maxlength="6"
                placeholder="영문 또는 한글 1-6자"
              ></input>
              <hr color="#DADADA" />
            </article>

            {/* 비밀번호 */}
            <article className="signup-input-box">
              <p className="signup-input-title">비밀번호</p>
              <input
                className="signup-input"
                type="password"
                minlength="8"
                maxlength="16"
                placeholder="영문, 숫자, 특수문자 조합 8-16자"
              ></input>
              <hr color="#DADADA" />
            </article>

            {/* 비밀번호 확인*/}
            <article className="signup-input-box">
              <p className="signup-input-title">비밀번호 확인</p>
              <input
                className="signup-input"
                type="password"
                minlength="8"
                maxlength="16"
                placeholder="영문, 숫자, 특수문자 조합 8-16자"
              ></input>
              <hr color="#DADADA" />
            </article>
          </div>

          <article className="signup-social-container">

          <p className="signup-social-text">소셜 계정으로 간편하게 시작하기</p>
          <div className="signup-social-btn">
            {/* <img src={Naver} alt="naver" className="signup-naver" />
            <img src={Kakao} alt="kakao" className="signup-kakao" /> */}
            <label className="signup-naver"></label>
            <label className="signup-kakao"></label>

          </div>

          <div className="signup-btn">가입하기</div>
          </article>
          {/* 
          * 소셜 회원가입 버튼 클릭시
          1. 네이버 or 카카오 oauth 연결

          * 가입하기 버튼 클릭시 
          - 참고
          https://github.com/codestates/sweatmate/blob/9fc177e5dc605d0c686f8570a16e32a400d9fbcb/client/src/components/Signing.jsx
          1. 입력 데이터 DB에 저장
          2. 홈페이지로 라우팅 
          */}
        </div>
      </section>
    </main>
  );
}
export default SignUp;
