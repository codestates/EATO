import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import IsLoginState from "../../states/IsLoginState";
import ChatRoomCard from "./ChatRoomCard";

axios.defaults.withCredentials = true;

export default function MyPage() {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(IsLoginState);
  
  const config = {
    "Content-Type": "application/json",
    withCredentials: true,
  };

  const deleteHandler = () => {
    if(window.confirm("정말 탈퇴하실 건가요...?")) {
      const userId = localStorage.getItem("userId")
      axios
      .delete(`http://localhost:27017/user/userInfo/${userId}`,
      config
      )
      .then(res => {
        console.log(res);
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        setIsLogin(false);
        alert("탈퇴");
        navigate('/');
      })
    }
  }

  
  return (
    <section className="mypage">
      <div className="mypage-whole-container">
        <div className="mypage-container-top">
          <div className="mypage-img-box">
            <div className="mypage-img" alt="user-img" />
          </div>
          <div className="mypage-line-box">
            <div className="mypage-line"></div>
          </div>
          <div className="mypage-userinfo-box">
            <div className="mypage-ub-top-box">
              <div className="mypage-ub-tb-nickbox">

              {/* user/:userid get */}
              <p className="mypage-ub-tb-nickname">아아아아아아</p>
              </div>
              <div className="mypage-ub-tb-edit-box">
                {/* user/:userid patch */}
                <button className="mypage-ub-tb-edit-btn">편집</button>
                <button onClick={deleteHandler} className="mypage-ub-tb-delete-btn">탈퇴</button>
                <button ></button>
              </div>
            </div>
            {/* user 위치 */}
            <p className="mypage-bb-location">부산광역시</p>
          </div>
          <div className="mypage-delivery-fee">
            {/* <p className="mypage-df-text">
              “지금까지 배달비를 총 12,000원을 절약했어요.”
            </p> */}
          </div>
        </div>
        <ChatRoomCard />
      </div>
    </section>
  );
}
