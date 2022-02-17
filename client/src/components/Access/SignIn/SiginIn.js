import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../images/logo-signup.png";
import ForkW from "../../../images/fork_white.png";
import ForkR from "../../../images/fork_red.png";
import Naver from "../../../images/login_naver.png";
import Kakao from "../../../images/login_kakao.png";

const SiginIn = () => {
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

      <section className="signin-right">
        <img src={ForkR} className="right-fork" alt="fork-img" />

        <div className="signin-container">
          <p className="signin-title-text">로그인하기</p>

          {/* 이메일 */}
          <article className="signin-input-box">
            <input
              className="signin-input"
              type="email"
              placeholder="이메일 아이디"
            ></input>
            <hr color="#DADADA" />
          </article>

          {/* 비밀번호 */}
          <article className="signin-input-box">
            <input
              className="signin-input"
              type="password"
              minlength="8"
              maxlength="16"
              placeholder="비밀번호"
            ></input>
            <hr color="#DADADA" />
          </article>
          <div className="signin-btn">로그인</div>
          <p className="signin-social-text">SNS 계정으로 간편하게 시작하기</p>
          <div className="signin-social-box">
            <img src={Naver} alt="naver" className="signin-naver" />
            <img src={Kakao} alt="kakao" className="signin-kakao" />
          </div>
          <div className="signup-question-box">
            <p className="signup-question">아직 EATO 회원이 아니신가요?</p>
            <Link to="/signup" className="go-signup">회원가입</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SiginIn;
