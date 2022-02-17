import React from "react";
import { Link } from "react-router-dom";
// import { useRecoilState, useRecoilValue ,useSetRecoilState } from "recoil";
// import { IsLoginState } from "../../states/LoginState";
import Logo from "../../images/Logo.png";
import Notification from "./NavNotification";

// * 알림창 참고
// https://github.com/codestates/sweatmate/blob/dev/client/src/components/Notification.jsx

function Nav() {
  // useState 역할
  // const [isLogin, setIsLogin] = useRecoilState(IsLoginState); // false
  // const logOutHandler = useSetRecoilState(IsLoginState)
  // const logOutHandler = () => {
  //   logOutHandler(false);
  //   window.location.replace('/');
  //   alert('로그아웃이 완료되었습니다.')
  // }

  return (
    <nav>
      <Link to="/">
        <img src={Logo} className="logo" alt="Logo"></img>
      </Link>
      <div className="user-access">
        <Notification />
        <Link to="/signin" className="user-button">
          로그인
        </Link>
        <Link to="/signup" className="user-button">
          회원가입
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
