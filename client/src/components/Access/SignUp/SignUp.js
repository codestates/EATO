import React from "react";
import axios from "axios";
// import IsSignupState from "../../../states/SignupState";
import Logo from "../../../images/logo-signup.png";
import ForkW from "../../../images/fork_white.png";
import ForkR from "../../../images/fork_red.png";
import SocialLogBtn from "./SocialLogBtn";

axios.defaults.withCredentials = false;

function SignUp() {
  // Value State
  // const [signupInputInfo, setSignupInputInfo] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   passwordCheck: "",
  // });

  // const [errorMessage, setErrorMessage] = useState("");

  // const loginHandler = (key) => (e) => {
  //   setSignupInputInfo({ ...signupInputInfo, [key]: e.target.value });
  // };

  // const signupClickHandler = (e) => {
  //   // Event 인터페이스의 preventDefault() 메서드는 어떤 이벤트를 명시적으로 처리하지 않은 경우,
  //   // 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 지정합니다.
  //   e.preventDefault();
  //   const { email, nickname, password, passwordCheck } = signupInputInfo;
  //   const emailregExp =
  //     /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  //   const digitsregExp = /\d/;

  //   if (!signupInputInfo) {
  //     setErrorMessage("모든 항목은 필수입니다");
  //   } else if (!emailregExp.test(email)) {
  //     setErrorMessage("이메일 형식이 올바르지 않습니다");
  //   } else if (!digitsregExp.test(password)) {
  //     setErrorMessage("비밀번호에 숫자기 하나 이상 포함되어야 합니다");
  //   } else if (password !== passwordCheck) {
  //     setErrorMessage("비밀번호가 동일해야 합니다");
  //   } else {
  //     axios
  //       .post(
  //         "http://localhost:3000/signup",
  //         { email, nickname, password },
  //         {
  //           "Content-Type": "application/json",
  //           withCredentials: false,
  //         }
  //       )
  //       .then((data) => {
  //         if (data.data.message === "Email exists") {
  //           setErrorMessage("이미 가입된 이메일입니다.");
  //         } else {
  //         }
  //       });
  //   }
  // };

  return (
    <main className="signin-up-wrapper">
      {/* 재사용 가능한 Left Page의 클래스명은 signin-up-left로 명명해놨음 */}
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

      {/* Right Page */}
      <section className="signup-right">
        <img src={ForkR} className="right-fork" alt="fork-img" />

        <div className="signup-box">
          <div className="signup-title-text">회원가입</div>

          {/* Input 컨테이너 */}
          <div className="signup-input-container">
            {/* 이메일 */}
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
                minLength="1"
                maxLength="6"
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
                minLength="8"
                maxLength="16"
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
                minLength="8"
                maxLength="16"
                placeholder="영문, 숫자, 특수문자 조합 8-16자"
              ></input>
              <hr color="#DADADA" />
            </article>
          </div>

          {/* 소셜 로그인 컨테이너 */}
          <article className="signup-social-container">
            <div className="signup-btn">가입하기</div>
            <SocialLogBtn />
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