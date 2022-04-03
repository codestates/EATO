import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import IsLoginState from "../../states/IsLoginState";
import { userLocation, userNickname } from "../../states/UserInfoState";
import myImg from "../../../src/images/1.png";
import ChatRoomCardList from "./ChatRoomCardList";
import pinImg from "../../../src/images/map-pin.png";
axios.defaults.withCredentials = true;

export default function MyPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(IsLoginState);
  const [userNick, setUserNick] = useRecoilState(userNickname);
  const [userLoca, setUserLoca] = useRecoilState(userLocation);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDltModal, setIsDltModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 요청 api 주소에 userId를 추가하기 위해 로그인할 때 localStorage에 할당된 userId를 불러온다.
  const userId = localStorage.getItem("userId");
  const nicknameExp = /^([a-zA-Z0-9가-힣]){1,6}$/;
  const addressExp = /^([a-zA-Z0-9가-힣/\s/g-]){1,30}$/;
  const config = {
    "Content-Type": "application/json",
    withCredentials: true,
  };

  // 처음 접속시 유저 정보 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/mypage/${userId}`)
      .then((res) => {
        const initNick = res.data.user.nickname;
        const initLoca = res.data.user.location;
        setUserNick(initNick);
        setUserLoca(initLoca);
        localStorage.getItem("nickname");
        localStorage.getItem("location");
      });
  }, [setUserLoca, setUserNick, userId]);

  // 탈퇴 모달창 open
  const deleteModal = () => {
    setIsDltModal(!isDltModal);
  };

  // 회원탈퇴 함수
  const deleteHandler = () => {
    const deleteUserInfo = axios.delete(
      `${process.env.REACT_APP_API_URL}/user/userInfo/${userId}`,
      config
    );
    const deleteUserPost = axios.delete(
      `${process.env.REACT_APP_API_URL}/document/allpost/${userId}`,
      config
    );
    axios.all([deleteUserInfo, deleteUserPost]).then(
      axios.spread((...res) => {
        const res1 = res[0];
        const res2 = res[1];
        console.log(res1, res2);
        localStorage.clear();
        setIsLogin(false);
        navigate("/");
      })
    );
  };

  // PATCH 회원정보 수정 요청
  const onSubmit = (data) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/user/userInfo/${userId}`,
        {
          nickname: data.nickname,
          location: data.location,
        },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          const nickname = res.data.user.nickname;
          const location = res.data.user.location;
          setUserNick(nickname);
          setUserLoca(location);
          localStorage.setItem("nickname", nickname);
          localStorage.setItem("location", location);
          setIsEditMode(false);
        }
      })
      .catch((err) => {
        console.log(err, isLogin);
      });
  };

  // 편집 버튼 클릭 핸들러
  const handleEditOpen = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <section className="mypage">
      <div className="mypage-whole-container">
        <div className="mypage-container-top">
          <div className="mypage-img-box">
            <img src={myImg} className="mypage-img" alt="user-img" />
          </div>
          <div className="mypage-line-box">
            <div className="mypage-line"></div>
          </div>
          <div className="mypage-userinfo-box">
            {/* user/:userid patch */}
            {isEditMode ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mypage-ub-top-box">
                  <div className="mypage-ub-tb-nickbox">
                    {/* user/:userid get */}
                    <input
                      className="mypage-ub-tb-nickname-input"
                      maxLength="6"
                      placeholder="닉네임 입력"
                      {...register("nickname", {
                        pattern: {
                          value: nicknameExp,
                          message: "올바른 닉네임을 입력해주세요.",
                        },
                      })}
                    ></input>
                    {errors?.nickname && (
                      <p className="mypage-ub-tb-err-msg">
                        {errors.nickname.message}
                      </p>
                    )}
                  </div>

                  <div className="mypage-ub-tb-edit-box">
                    <button
                      className="mypage-ub-tb-edit-btn"
                      onClick={handleEditOpen}
                    >
                      취소
                    </button>

                    {/* patch 요청하기 */}
                    <button className="mypage-ub-tb-delete-btn" type="submit">
                      확인
                    </button>
                  </div>
                </div>
                <input
                  className="mypage-bb-location-input"
                  placeholder="주소를 입력해주세요."
                  {...register("location", {
                    pattern: {
                      value: addressExp,
                      message: "올바른 주소를 입력해주세요.",
                    },
                  })}
                ></input>
                {errors?.location && (
                  <p className="mypage-ub-tb-err-msg">
                    {errors.location.message}
                  </p>
                )}
              </form>
            ) : (
              <>
                <div className="mypage-ub-top-box">
                  <div className="mypage-ub-tb-nickbox">
                    {/* user/:userid get */}
                    <p className="mypage-ub-tb-nickname">{userNick}</p>
                  </div>
                  <div className="mypage-ub-tb-edit-box">
                    <button
                      className="mypage-ub-tb-edit-btn"
                      onClick={handleEditOpen}
                    >
                      편집
                    </button>
                    <button
                      onClick={deleteModal}
                      className="mypage-ub-tb-delete-btn"
                    >
                      탈퇴
                    </button>
                    {isDltModal ? (
                      <section
                        className="dlt-modal-backdrop"
                        onClick={deleteModal}
                      >
                        <div className="dlt-modal-container">
                          <div className="dlt-modal">
                            <p className="dlt-modal-text">
                              정말 계정을 삭제하실 건가요? 계정을 삭제하면
                              <br />
                              지금까지 이용한 &nbsp;
                              <span className="dlt-modal-emphasis-text">
                                모든 콘텐츠 및 데이터가 제거됩니다.
                              </span>
                            </p>
                            <div className="dlt-modal-btn-box">
                              <button
                                className="dlt-modal-yes-btn"
                                onClick={deleteHandler}
                              >
                                삭제
                              </button>
                              <button className="dlt-modal-no-btn">취소</button>
                            </div>
                          </div>
                        </div>
                      </section>
                    ) : null}
                  </div>
                </div>
                <p className="mypage-bb-location">{userLoca}</p>
              </>
            )}
            {/* user 위치 */}
          </div>
          <div className="mypage-delivery-fee">
            <img src={pinImg} alt="pinImg" className="mypage-pin" />
            <p className="mypage-df-text">현재 위치가 어딘지 궁금한가요?</p>
          </div>
        </div>
        <ChatRoomCardList />
      </div>
    </section>
  );
}
