import React from "react";

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
                  <div className="mypage-cb-img" alt="user-img" />
                  <p className="mypage-cb-chatname">교촌치킨</p>
                </div>
              </div>
            </div>
            <div className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-card-content">
                  <div className="mypage-cb-img" alt="user-img" />
                  <p className="mypage-cb-chatname">교촌치킨</p>
                </div>
              </div>
            </div>
            <div className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-card-content">
                  <div className="mypage-cb-img" alt="user-img" />
                  <p className="mypage-cb-chatname">교촌치킨</p>
                </div>
              </div>
            </div>
            <div className="mypage-cb-card-container">
              <div className="mypage-cb-card">
                <div className="mypage-cb-card-content">
                  <div className="mypage-cb-img" alt="user-img" />
                  <p className="mypage-cb-chatname">교촌치킨</p>
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
                  <p className="mypage-cb-lb-title">빌리프커피로스터스</p>
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
