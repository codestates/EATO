import React from "react";
import user2 from "../../../src/images/2.png";
import user3 from "../../../src/images/3.png";
import user4 from "../../../src/images/4.png";
import user5 from "../../../src/images/5.png";

export default function ChatRoomCard() {
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
                  <p className="mypage-cb-chatname">교촌치킨</p>
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
            {/*  */}
          </article>
          {/*  */}
        </article>

        {/* 작성한 게시물 */}
        <article className="mypage-chatpost-box">
          <p className="mypage-cb-title">작성한 게시물</p>
          {/* 카드 리스트 */}
          <div className="mypage-cb-card-list">
            {/* 카드 */}
            <article className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-leftbox">
                  {/* document/:userid 제목, 배달비*/}
                  <p className="mypage-cb-lb-title">스타벅스</p>
                  <p className="mypage-cb-lb-fee">3,000원</p>
                </div>
                <div className="mypage-cb-rightbox">
                  <button className="mypage-cb-rb-btn"></button>
                </div>
              </div>
            </article>
            <article className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-leftbox">
                  <p className="mypage-cb-lb-title">라화쿵부</p>
                  <p className="mypage-cb-lb-fee">4,500원</p>
                </div>
                <div className="mypage-cb-rightbox">
                  <button className="mypage-cb-rb-btn"></button>
                </div>
              </div>
            </article>
            <article className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-leftbox">
                  <p className="mypage-cb-lb-title">에머이</p>
                  <p className="mypage-cb-lb-fee">4,000원</p>
                </div>
                <div className="mypage-cb-rightbox">
                  <button className="mypage-cb-rb-btn"></button>
                </div>
              </div>
            </article>
            <article className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-leftbox">
                  <p className="mypage-cb-lb-title">빌리프커피로스터스</p>
                  <p className="mypage-cb-lb-fee">4,000원</p>
                </div>
                <div className="mypage-cb-rightbox">
                  <button className="mypage-cb-rb-btn"></button>
                </div>
              </div>
            </article>

            {/*  */}
          </div>
        </article>
      </div>
    </>
  );
}
