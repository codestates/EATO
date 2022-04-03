import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import user2 from "../../../src/images/2.png";
import user3 from "../../../src/images/3.png";
import user4 from "../../../src/images/4.png";
import user5 from "../../../src/images/5.png";
import ChatRoomCard from "./ChatRoomCard";
axios.defaults.withCredentials = true;

export default function ChatRoomCardList() {
  const navigate = useNavigate();
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    const creatorId = localStorage.getItem("userId");
    axios.get(`${process.env.REACT_APP_API_URL}/document`).then((res) => {
      const cardInfoList = res.data.documentList;
      console.log("qwer", cardInfoList);

      for (let i = 0; i < cardInfoList.length; i++) {
        // creatorId가 맨 처음에 생성이 안돼서 users에 담긴 id값으로 사용함.
        // 하지만 굳이 creatorId를 사용하지 않아도
        if (cardInfoList[i].creatorId === creatorId) {
          const myInfo = cardInfoList[i];
          console.log("ddd", myInfo);
          setMyData((prev) => {
            return [myInfo, ...prev];
          });
        }
      }
    });
  }, []);

  return (
    <>
      {/* 채팅 목록, 작성한 게시물 컨테이너 */}
      <div className="mypage-container-bottom">
        {/* 채팅 목록 */}
        <article className="mypage-chatpost-box">
          <p className="mypage-cb-title">채팅 목록</p>

          {/* 카드 리스트 */}
          <article className="mypage-cb-card-list">
            {/* 카드 */}
            <div className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-card-content">
                  {/* 유저 랜덤 이미지 get*/}
                  <img
                    src={user2}
                    className="mypage-img"
                    alt="user-img"
                    width="60"
                  />
                  <p className="mypage-cb-chatname">모임제목은열두글자까지만</p>
                </div>
              </div>
            </div>
            <div className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-card-content">
                  {/* 유저 랜덤 이미지 get*/}
                  <img
                    src={user3}
                    className="mypage-img"
                    alt="user-img"
                    width="60"
                  />
                  <p className="mypage-cb-chatname">동대문엽떡</p>
                </div>
              </div>
            </div>
            <div className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-card-content">
                  {/* 유저 랜덤 이미지 get*/}
                  <img
                    src={user4}
                    className="mypage-img"
                    alt="user-img"
                    width="60"
                  />
                  <p className="mypage-cb-chatname">bhc</p>
                </div>
              </div>
            </div>
            <div className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-card-content">
                  {/* 유저 랜덤 이미지 get*/}
                  <img
                    src={user5}
                    className="mypage-img"
                    alt="user-img"
                    width="60"
                  />
                  <p className="mypage-cb-chatname">중화루</p>
                </div>
              </div>
            </div>
          </article>
        </article>

        {/* 작성한 게시물 */}
        <article className="mypage-chatpost-box">
          <p className="mypage-cb-title">작성한 게시물</p>
          {/* 카드 리스트 */}
          {myData.length === 0 ? (
            <div className="mypage-cb-card-list">
              <div className="mypage-blank-container">
                <p className="mypage-blank-text">
                  아직 작성한 게시물이 없어요.
                </p>
                {/* 승섭님 글 작성 form 사용하기 */}
                <button
                  className="mypage-blank-btn"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  주변 이웃과 함께 주문하기
                </button>
              </div>
            </div>
          ) : (
            <div className="mypage-cb-card-list">
              {/* 카드 */}
              {/* document/:userid 제목, 배달비*/}
              {myData.map((user, idx) => {
                // console.log("카드리스트 126번째", myData);
                // console.log("카드리스트 126번째", user.title);
                return (
                  <ChatRoomCard
                    title={user.title}
                    deliveryFee={user.deliveryFee}
                    key={idx}
                  />
                );
              })}
            </div>
          )}
        </article>
      </div>
    </>
  );
}
