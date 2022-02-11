import React from "react";
import { Link } from "react-router-dom";

// 메인페이지
// 1. 로고
// 2. 로그인
// 3. 회원가입

// 홈페이지
// 1. 알림종
// 2. 마이페이지
// 3. 로그아웃

function Nav() {
  return (
    <>
      <Link to="/">로고</Link>
      <Link to="/signin">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </>
  );
}

export default Nav;
