import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostCardDate from "../PostCards/PostCardDate";
import postLogo from "../../../images/Logo.png";
import PostMap from "../../Map/PostMap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "./PostCardCheck.scss";

const PostCardCheck = (props) => {
  const [count, setCount] = useState(1);
  const [isModified, setIsModified] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const userId = localStorage.getItem("userId");
  const documentId = props.id;
  const navigate = useNavigate();
  const joinHandler = () => {
    navigate("/chatroom");
  };

  const plusCurNum = () => {
    setCount(count + 1);
  };

  const showClicked = () => {
    setIsModified(!isModified);
  };

  const finalPay =
    "각 " +
    String(props.deliveryFee).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    "원";

  const config = {
    "Content-Type": "application/json",
    withCredentials: true,
  };
  axios.defaults.withCredentials = true;

  const deletePostCard = () => {
    if (props.creatorId === userId) {
      if (window.confirm("모임을 삭제 할까요?")) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/document/${documentId}`,
            config
          )
          .then((res) => {
            alert("삭제완료");
            setIsModified(false);
            props.closeModal(false);
          });
      }
    } else {
      setIsModified(false);
      alert("해당 작성자가 아닙니다.");
    }
  };

  // const modifiedPostCard = () => {
  //   if (creatorId === userId) {
  //     if (window.confirm("모임을 삭제 할까요?")) {
  //       axios
  //         .patch(`${process.env.REACT_APP_API_URL}/document/${documentId}`, {

  //         },config)
  //         .then((res) => {
  //           alert("삭제완료");
  //           setIsModified(false);
  //           props.closeModal(false);
  //         });
  //     }
  //   } else {
  //     setIsModified(false);
  //     alert("해당 작성자가 아닙니다.");
  //   }
  // };

  return (
    <div className="postInfoWrap">
      <article className="postInfo__Nav">
        <div className="imgLogo">
          <img src={postLogo} className="postLogo" alt="postLogo"></img>
        </div>
      </article>

      <article className="postInfo__Header">
        <div className="postInfo__title">
          <div className="postInfo__InputTitle">{props.title}</div>
        </div>
        <div className="postInfo__work">
          <HiOutlineDotsVertical size="1.5rem" onClick={showClicked} />
          {isModified && (
            <div className="modify-box" onMouseLeave={showClicked}>
              <button className="modify-btn">편집</button>
              <button className="del-btn" onClick={deletePostCard}>
                삭제
              </button>
            </div>
          )}
        </div>
      </article>

      <article className="postInfo__Body">
        <section className="postInfo__Left">
          <div className="postInfo__description">
            <div className="postInfo__inputDescription">
              {props.description}
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputListT">{props.category}</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputListD">
              <PostCardDate meetDay={props.date} />
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputList">{finalPay}</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputList">
              {props.currentNum} / {props.totalNum}명
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputListT">{props.deliveryTag}</div>
          </div>
          <div className="postInfo__list">
            <div className="postInfo__inputListT">{props.payTag}</div>
          </div>
        </section>

        <section className="postInfo__right">
          <div className="postInfo__postMap">
            <div className="postInfo__InputPostMap">{props.located}</div>
          </div>
          <div className="postInfo__titleMap">
            <FaMapMarkerAlt size="1.2rem" color="#ff4234" />
            {props.located}
          </div>
          <div className="postInfo__map">
            <PostMap located={props.located} />
          </div>
        </section>
      </article>

      <article className="postInfo__Footer">
        <button
          className="postInfo__actions"
          onClick={(plusCurNum, joinHandler)}
        >
          참여하기
        </button>
      </article>
    </div>
  );
};

export default PostCardCheck;
