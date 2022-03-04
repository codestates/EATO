import React from "react";
import { BsThreeDotsVertical, BsFillPersonFill } from "react-icons/bs";
import { VscSmiley } from "react-icons/vsc";
import SendBtn from "../../images/send-msg-btn.svg";
export default function Chatting() {
  return (
    // {/* 채팅방 전체*/}
    <main className="chatroom-container">
      <section className="chatroom">
        {/* 왼쪽 */}
        <div className="chatroom-left">
          {/* 메세지 컨테이너 + 스크롤바 */}
          <div className="get-msg-container">
            {/* 메세지 박스 : 메시지가 범위 초과시 무형 스크롤(invisible) 되도록 설정함 */}
            <article className="msg-box">
              {/* 여기에 유저 이미지 get */}
              <div className="chatroom-user-img"></div>
              {/* <img className="chatroom-user-img" alt="user-img"></img> */}

              {/* 여기에 채팅방 제목 get */}
              <p className="msg-title">여기가니다</p>
              <div className="time-alert-box">
                {/* 여기에 채팅 시간 get */}
                <p className="msg-time">35분전</p>
                <div className="msg-alert-box">
                  <div className="msg-alert-circle">
                    {/* 여기에 채팅 숫자 get */}
                    <p>5</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="chatroom-right">
          {/* 컨테이너 */}
          <div className="chatroom-right-content">
            {/* 제목 박스 */}
            <div className="chatroom-title-box">
              <h1 className="chat-title">마라탕 시키실분!</h1>

              <div className="chat-user-info">
                <p className="chat-person-num">3</p>
                <BsFillPersonFill size="22" />
                <div className="dot-box">
                  <BsThreeDotsVertical size="28" />
                </div>
              </div>
            </div>
            <hr width="99%" color="#EFECEF" />

            {/* 채팅방 컨테이너 */}
            <section className="chatroom-inner-container">
              {/* 채팅방 간격 */}
              <div className="inner-container-padding">
                {/* 전체 채팅 메시지 */}
                <article className="chatroom-msg-container">
                  {/* 유저 채팅 박스 */}
                  <div className="chatroom-msg-box">
                    <div className="chatroom-mb-left">
                      {/* <img className="chatroom-user-img" alt="user-img"></img> */}
                      <div className="chatroom-user-img"></div>
                      <span className="chatroom-time">11:01</span>
                    </div>
                    <div className="chatting-mb-right">
                      <div className="chatting-msg-container">
                        <div className="chatting-nickname">닉네임</div>
                        <div className="chatting-msg-box">
                          <div className="chatting-msg">
                            메세지가 채팅창에 알맞게 들어갑니다.메세지가
                            채팅창에 알맞게 들어갑니다.메세지가 채팅창에 알맞게
                            들어갑니다.메세지가 채메세지가 채팅창에 알맞게
                            들어갑니다.메세지가 채팅창에 알맞게
                            들어갑니다.메세지가 채팅창에 알맞게
                            들어갑니다.팅창에 알맞게 들어갑니다.메세지가
                            채팅창에 알맞게 들어갑니다.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chatroom-msg-box">
                    <div className="chatroom-mb-left">
                      {/* <img className="chatroom-user-img" alt="user-img"></img> */}
                      <div className="chatroom-user-img"></div>
                      <span className="chatroom-time">11:01</span>
                    </div>
                    <div className="chatting-mb-right">
                      <div className="chatting-msg-container">
                        <div className="chatting-nickname">닉네임</div>
                        <div className="chatting-msg-box">
                          <div className="chatting-msg">
                            메세지가 채팅창에 알맞게 들어갑니다.메세지가
                            채팅창에 알맞게 들어갑니다.메세지가 채팅창에 알맞게
                            들어갑니다.메세지가 채메세지가 채팅창에 알맞게
                            들어갑니다.메세지가 채팅창에 알맞게
                            들어갑니다.메세지가 채팅창에 알맞게
                            들어갑니다.팅창에 알맞게 들어갑니다.메세지가
                            채팅창에 알맞게 들어갑니다.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="chatroom-msg-box">
                    <div className="chatroom-mb-left">
                      {/* <img className="chatroom-user-img" alt="user-img"></img> */}
                      <div className="chatroom-user-img"></div>
                      <span className="chatroom-time">11:01</span>
                    </div>
                    <div className="chatting-mb-right">
                      <div className="chatting-msg-container">
                        <div className="chatting-nickname">닉네임</div>
                        <div className="chatting-msg-box">
                          <div className="chatting-msg">
                            메세지가 채팅창에 알맞게 들어갑니다.메세지가
                            채팅창에 알맞게 들어갑니다.메세지가 채팅창에 알맞게
                            들어갑니다.메세지가 채메세지가 채팅창에 알맞게
                            들어갑니다.메세지가 채팅창에 알맞게
                            들어갑니다.메세지가 채팅창에 알맞게
                            들어갑니다.팅창에 알맞게 들어갑니다.메세지가
                            채팅창에 알맞게 들어갑니다.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>
            <form className="chatting-input-container">
              <div className="chatting-input-box">
                <div className="input-padding-box">
                  
                {/* 이모지 라이브러리 https://www.npmjs.com/package/emoji-picker-react */}
                  <div className="emoji">
                    <VscSmiley size="22" />
                  </div>
                  <input
                    type="text"
                    placeholder="메시지를 입력하세요."
                    className="chatting-input"
                  ></input>
                  <div className="add-picture-box">
                    {/* 아이콘 <div className='add-picture'></div> */}
                  </div>
                  <div className="sending-msg-box">
                    <button className="sending-msg-btn">
                      <img src={SendBtn} alt="send-btn" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
