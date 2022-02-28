import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import IsLoginState from "../../states/IsLoginState";
import ChatRoomCard from "./ChatRoomCard";

export default function MyPage() {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(IsLoginState);
  const config = {
    "Content-Type": "application/json",
    withCredentials: false,
  };
  const withdrawalHandler = () => {
    axios
      .delete("http://localhost:3000/user/userinfo", 
        config
      )
      .then(res => {
        console.log(res);
        setIsLogin(false);
        alert("탈퇴");
        navigate('/');
      })
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
              <p className="mypage-ub-tb-nickname">여섯글자제한</p>
              <div className="mypage-ub-tb-edit-box">
                <button className="mypage-ub-tb-edit-btn">편집</button>
                <button onClick={withdrawalHandler} className="mypage-ub-tb-delete-btn">탈퇴</button>
              </div>
            </div>
            <p className="mypage-bb-location">부산광역시</p>
          </div>
          <div className="mypage-delivery-fee">
            <p className="mypage-df-text">
              “지금까지 배달비를 총 12,000원을 절약했어요.”
            </p>
          </div>
        </div>
        <ChatRoomCard />
      </div>
    </section>
  );
}
