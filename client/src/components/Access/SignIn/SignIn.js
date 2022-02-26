import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { useSetRecoilState } from "recoil";
// import IsLoginState from "../../../states/SignInState";
import axios from "axios";
import Logo from "../../../images/logo-signup.png";
import ForkW from "../../../images/fork_white.png";
import ForkR from "../../../images/fork_red.png";
import SocialLogBtn from "../SignUp/SocialLogBtn";

axios.defaults.withCredentials = true;

const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // console.log(watch("password"));

  // 유효성 검사
  const emailExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let pwdExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

  // Input창 passwordCheck (비밀번호 확인)에서 사용됨
  const password = useRef();
  password.current = watch("password");

  const config = {
    "Content-Type": "application/json",
    withCredentials: false,
  };

  // const LoginStateHandler = useSetRecoilState(IsLoginState);

  const onSubmit = (data) => {
    axios
      .post(
        "http://localhost:27017/user/login",
        { email: data.email, password: data.password },
        config
      )
      .then((res) => {
        // console.log(res.data);
        // Object
        // loginSuccess: true
        // userId: "62162830f551062cb17d49a8"
        // [[Prototype]]: Object
        const userInfo = res.data;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate("/home");
      });
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <article className="signin-input-box">
              <input
                name="email"
                type="email"
                className="signin-input"
                placeholder="이메일 아이디"
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
            </article>

            {/* 비밀번호 */}
            <article className="signin-input-box">
              <input
                name="password"
                type="password"
                className="signin-input"
                minLength="8"
                maxLength="16"
                placeholder="비밀번호"
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
            {/* 로그인 버튼 */}
            <button className="signin-btn" type="submit">
              로그인
            </button>
          </form>

          <SocialLogBtn />
          <div className="signup-question-box">
            <p className="signup-question">아직 EATO 회원이 아니신가요?</p>
            <Link to="/signup" className="go-signup">
              회원가입
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
