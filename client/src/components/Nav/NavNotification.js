import React from "react";
import { useRecoilState } from "recoil";
import NavState from "../../states/NavState";
import { FaBell } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import Profile from "../../images/noti-profile.png";

export default function NavNotificationModal() {
  const [isNotiClicked, setIsNotiClicked] = useRecoilState(NavState);
  const HandleClickNoti = () => {
    setIsNotiClicked((prev) => !prev);
  };
  return (
    <div className="noti-container">
      <FaBell
        size="1.5rem"
        className="noti-button"
        onClick={HandleClickNoti}
      ></FaBell>

      {/* 종모양 클릭시 알림창 Open*/}
      {isNotiClicked ? (
        <div className="noti-box">
          <div className="noti-title">알림</div>
          <hr className="noti-line-style" color="#DADADA" />

          {/* 알림 내용 컨테이너 */}
          <div className="noti-content-container">
            <div className="noti-content-box">
              {/* 비로그인 상태 알림*/}
              {/* <p className="noti-none">알림이 존재하지 않습니다</p> */}

              {/* 로그인 상태 알림 */}
              <div className="noti-content">
                <BsDot size="24" color="#EE4E34" />

                {/* 프로필 이미지 Read */}
                <img src={Profile} alt="profile" />
                {/* <div className="user-img"></div> */}

                {/* 닉네임, 채팅방, message */}
                <p className="noti-text">
                  호미들님이 소디스커피 파티에 메시지를 남겼습니다.
                </p>
              </div>

              <IoClose size="32" color="#B0ACAC" className="delete-btn" />
              {/* X 버튼 클릭시 알림창에 담긴 데이터 Delete*/}
            </div>
          </div>
        </div>
      ) : (
        []
      )}
    </div>
  );
}
