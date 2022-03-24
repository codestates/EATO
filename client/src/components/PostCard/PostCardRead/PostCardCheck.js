import React, { useState } from "react";
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
}) => {
  const [count, setCount] = useState(1);
  const [isClick, setIsClick] = useState(false);
  const plusCurNum = () => {
    setCount(count + 1);
  };

  const showClicked = () => {
    setIsClick(!isClick);
  };
  const deleteHandler = () => {
    console.log("del clicked");
  };
  // const deleteHandler = () => {
  //   if (window.confirm("모임을 삭제 할까요?")) {
  //     axios
  //       .delete(`http://localhost:3000/user/userInfo/${userId}`, config)
  //       .then((res) => {
  //         localStorage.clear();
  //         setIsLogin(false);
  //         alert("삭제완료");
  //       });
  //   }
  // };

  // const deleteHandler = () => {

  // }

  const finalPay =
    String(deliveryFee).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

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
              <button className="del-btn" onClick={deleteHandler}>
                삭제
              </button>
            </div>
          )}
        </div>
      </article>

      <article className="postInfo__Body">
        <section className="postInfo__Left">
          <div className="postInfo__description">
            <div className="postInfo__InputDescription">{description}</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">{category}</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">
              <PostCardDate date={date} />
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">{finalPay}</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">
              {currentNum} / {totalNum}명
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputTag">{deliveryTag}</div>
          </div>
          <div className="postInfo__list">
            <div className="postInfo__inputTag">{payTag}</div>
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
        <button className="postInfo__actions" onClick={plusCurNum}>
          참여하기
        </button>
      </article>
    </div>
  );
};

export default PostCardCheck;
