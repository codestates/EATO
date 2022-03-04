import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import IsLoginState from "../../../states/IsLoginState";
import { useRecoilState } from "recoil";
import axios from "axios";
import Logo from "../../../images/logo-signup.png";
import ForkW from "../../../images/fork_white.png";
import ForkR from "../../../images/fork_red.png";
import SocialLogBtn from "./SocialLogBtn";

axios.defaults.withCredentials = true;

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // console.log(watch("password"));

  // 유효성 검사 정규 표현식
  const emailExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nicknameExp = /^([a-zA-Z0-9가-힣]){2,6}$/;
  const pwdExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

  // Input창 passwordCheck (비밀번호 확인)에서 사용됨
  const password = useRef();
  password.current = watch("password");

  // <form> 태그안에 속하는 <input> 값들을 출력해주는 함수
  // const onSubmit = (data) => {
  //   console.log("data", data);
  // };

  const [emailErr, setEmailErr] = useState("");

  const config = {
    "Content-Type": "application/json",
    withCredentials: false,
  };

  const [isLogin, setIsLogin] = useRecoilState(IsLoginState);

  const onSubmit = (data) => {
    axios
      .post(
        "http://localhost:3000/user/signup",
        {
          email: data.email,
          password: data.password,
          nickname: data.nickname,
        },
        config
      )
      .then((res) => {
        if (res.status === 201) {
          alert("Welcome to EATO!");
          setIsLogin(true);
          navigate("/signin");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setEmailErr("이미 사용중인 이메일이에요.");
        }
      });
  };

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
          <p className="signup-title-text">회원가입</p>

          {/* Input 컨테이너 */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="signup-input-container">
              {/* 이메일 */}
              <article className="signup-input-box">
                <p className="signup-input-title">이메일 주소</p>
                <input
                  name="email"
                  type="email"
                  className="signup-input"
                  placeholder="예) eato@gmail.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "이메일을 입력해주세요.",
                    },
                    pattern: {
                      value: emailExp,
                      message: "이메일 형식으로 입력해주세요.",
                    },
                  })}
                ></input>
                <hr color="#DADADA" />
                {errors?.email && (
                  <p className="input-err-text">{errors.email.message}</p>
                )}
                <p className="input-err-text">{emailErr}</p>
              </article>

              {/* 닉네임 */}
              <article className="signup-input-box">
                <p className="signup-input-title">닉네임</p>
                <input
                  name="nickname"
                  type="text"
                  className="signup-input"
                  minLength="2"
                  maxLength="6"
                  placeholder="영문 또는 한글 2-6자"
                  {...register("nickname", {
                    required: {
                      value: true,
                      message: "닉네임을 입력해주세요.",
                    },
                    pattern: {
                      value: nicknameExp,
                      message: "올바른 닉네임을 입력해주세요.",
                    },
                  })}
                ></input>
                <hr color="#DADADA" />
                {errors?.nickname && (
                  <p className="input-err-text">{errors.nickname.message}</p>
                )}
              </article>

              {/* 비밀번호 */}
              <article className="signup-input-box">
                <p className="signup-input-title">비밀번호</p>
                <input
                  name="password"
                  className="signup-input"
                  type="password"
                  minLength="8"
                  maxLength="16"
                  placeholder="영문, 숫자, 특수문자 조합 8-16자"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "비밀번호를 입력해주세요.",
                    },
                    minLength: {
                      value: 8,
                      message: "비밀번호는 8자 이상 입력해주세요.",
                    },
                    pattern: {
                      value: pwdExp,
                      message:
                        "영문, 숫자, 특수문자를 포함한 8-16자를 입력해주세요.",
                    },
                  })}
                ></input>
                <hr color="#DADADA" />
                {errors?.password && (
                  <p className="input-err-text">{errors.password.message}</p>
                )}
              </article>

              {/* 비밀번호 확인*/}
              <article className="signup-input-box">
                <p className="signup-input-title">비밀번호 확인</p>
                <input
                  name="passwordCheck"
                  className="signup-input"
                  type="password"
                  minLength="8"
                  maxLength="16"
                  placeholder="영문, 숫자, 특수문자 조합 8-16자"
                  {...register("passwordCheck", {
                    required: {
                      value: true,
                      message: "비밀번호를 입력해주세요.",
                    },
                    validate: (value) =>
                      value === password.current ||
                      "동일한 비밀번호를 입력해주세요.",
                  })}
                ></input>
                <hr color="#DADADA" />
                {errors?.passwordCheck && (
                  <p className="input-err-text">
                    {errors.passwordCheck.message}
                  </p>
                )}
              </article>
              <button type="submit" className="signup-btn">
                가입하기
              </button>
            </div>
          </form>

          {/* 소셜 로그인 컨테이너 */}
          <article className="signup-social-container">
            <SocialLogBtn />
            <div className="signup-question-box">
              <p className="signup-question">이미 회원이신가요?</p>
              <Link to="/signin" className="go-signup">
                로그인하기
              </Link>
            </div>
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
