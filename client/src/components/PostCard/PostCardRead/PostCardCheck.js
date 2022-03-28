import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostCardDate from "../PostCards/PostCardDate";
import postLogo from "../../../images/Logo.png";
import PostMap from "../../Map/PostMap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "./PostCardCheck.scss";

const PostCardCheck = ({
  id,
  key,
  category,
  description,
  title,
  date,
  deliveryFee,
  totalNum,
  currentNum,
  located,
  deliveryTag,
  payTag,
  creatorId,
  closeModal,
}) => {
  const [count, setCount] = useState(1);
  const [isClick, setIsClick] = useState(false);
  const documentId = id;
  const navigate = useNavigate();
  const plusCurNum = () => {
    setCount(count + 1);
  };

  const showClicked = () => {
    setIsClick(!isClick);
  };

  const joinHandler = () => {
    navigate("/chatroom");
  };

  const config = {
    "Content-Type": "application/json",
    withCredentials: true,
  };
  axios.defaults.withCredentials = true;

  const userId = localStorage.getItem("userId");

  const deletePostCard = (deletePostHandler) => {
    if (creatorId === userId) {
      if (window.confirm("모임을 삭제 할까요?")) {
        axios
          .delete(`http://localhost:3000/document/${documentId}`, config)
          .then((res) => {
            alert("삭제완료");
            setIsClick(false);
            closeModal(false);
          });
      }
    } else {
      setIsClick(false);
      alert("해당 작성자가 아닙니다.");
    }
  };

  const finalPay =
    "각 " + String(deliveryFee).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

  return (
    <div className="postInfoWrap">
      <article className="postInfo__Nav">
        <div className="imgLogo">
          <img src={postLogo} className="postLogo" alt="postLogo"></img>
        </div>
      </article>

      <article className="postInfo__Header">
        <div className="postInfo__title">
          <div className="postInfo__InputTitle">{title}</div>
        </div>
        <div className="postInfo__work">
          <HiOutlineDotsVertical size="1.5rem" onClick={showClicked} />
          {isClick && (
            <div className="delete-box">
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
            <div className="postInfo__inputDescription">{description}</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputListT">{category}</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputListD">
              <PostCardDate meetDay={date} />
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputList">{finalPay}</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputList">
              {currentNum} / {totalNum}명
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputListT">{deliveryTag}</div>
          </div>
          <div className="postInfo__list">
            <div className="postInfo__inputListT">{payTag}</div>
          </div>
        </section>

        <section className="postInfo__right">
          <div className="postInfo__postMap">
            <div className="postInfo__InputPostMap">{located}</div>
          </div>
          <div className="postInfo__titleMap">
            <FaMapMarkerAlt size="1.2rem" color="#ff4234" />
            {located}
          </div>
          <div className="postInfo__map">
            <PostMap located={located} />
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
