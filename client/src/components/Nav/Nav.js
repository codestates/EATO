import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import IsLoginState from "../../states/IsLoginState";
import Notification from "./NavNotification";
import Logo from "../../images/Logo.png";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { gsap } from "gsap";

// * 알림창 참고
// https://github.com/codestates/sweatmate/blob/dev/client/src/components/Notification.jsx
axios.defaults.withCredentials = true;

function Nav() {
  // - replace / assign 의 차이
  // replace 와 assign 은 둘 다 페이지를 다른 URL 로 이동시키지만 히스토리를 남기느냐 남기지 않느냐의 차이를 갖고 있습니다.
  // assign 은 다음 페이지로 이동하면서 현재 페이지를 히스토리에 남기고 replace 는 남기지 않습니다.
  // 이는 브라우저의 뒤로가기를 눌렀을 때 그 차이를 확실히 알 수 있습니다.
  const navigate = useNavigate();

  // recoil 전역상태 false
  const [isLogin, setIsLogin] = useRecoilState(IsLoginState);
  const [toggle, setToggle] = useState(false);

  const config = {
    "Content-Type": "application/json",
  };

  // isLogin false 설정
  const logoutHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/logout`, config)
      .then(() => {
        // 로그아웃 버튼 클릭 시 recoil 전역상태 false로 전환
        setIsLogin(false);
        localStorage.clear();
        navigate("/", { replace: true });
      });
  };

  return (
    <>
      {isLogin ? (
        <header>
          <Link to="/home">
            <img src={Logo} className="logo" alt="Logo"></img>
          </Link>
          <div className="user-access">
            <Notification />
            {/* 햄버거 토글 버튼 */}
            {toggle ? (
              <section className="hamburger-container">
                <div className="hamburger-box" onClick={() => setToggle(false)}>
                  <span className="hamburger-top"></span>
                  <span className="hamburger-mid"></span>
                  <span className="hamburger-bot"></span>
                </div>
                {/* 사이드바 컨테이너 */}
                <div className="toggle-sidebar">
                  <div className="sidebar-btn-box">
                    <Link to="/chatroom">
                      <BsFillChatDotsFill
                        size="1.5rem"
                        className="sidebar-btn"
                      />
                    </Link>
                    <Link to="/map">
                      <FaMapMarkerAlt size="1.5rem" className="sidebar-btn" />
                    </Link>
                    <Link to="/mypage">
                      <FaUserAlt size="1.5rem" className="sidebar-btn" />
                    </Link>
                  </div>
                  <div className="signout-btn-box">
                    <FaPowerOff
                      size="1.5rem"
                      className="signout-btn"
                      onClick={logoutHandler}
                    />
                  </div>
                </div>
              </section>
            ) : (
              <section className="hamburger-container">
                <div className="hamburger-box" onClick={() => setToggle(true)}>
                  <span className="hamburger-toggle"></span>
                  <span className="hamburger-toggle"></span>
                  <span className="hamburger-toggle"></span>
                </div>
              </section>
            )}
            <article className="user-buttons">
              <Link to="/chatroom">
                <BsFillChatDotsFill className="user-button" size="1.5rem" />
              </Link>
              <Link to="/map">
                <FaMapMarkerAlt className="user-button" size="1.5rem" />
              </Link>
              <Link to="/mypage" className="user-button">
                마이페이지
              </Link>
              <button className="user-button" onClick={logoutHandler}>
                로그아웃
              </button>
            </article>
          </div>
        </header>
      ) : (
        <header>
          <Link to="/">
            <img src={Logo} className="logo" alt="Logo"></img>
          </Link>
          <div className="user-access">
            <Link to="/signin" className="signing-button">
              로그인
            </Link>
            <Link to="/signup" className="signing-button">
              회원가입
            </Link>
          </div>
        </header>
      )}
    </>
  );
}

export default Nav;
