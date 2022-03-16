import React, { useState, useEffect } from "react";
import PostCardDate from "../PostCards/PostCardDate";
import postLogo from "../../../images/Logo.png";
import PostMap from "../../Map/PostMap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "./PostCardCheck.scss";

const PostCardCheck = (props) => {
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

  const finalPay = `${props.posts.deliveryFee
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;

  return (
    <div className="postInfoWrap">
      <article className="postInfo__Nav">
        <div className="imgLogo">
          <img src={postLogo} className="postLogo" alt="postLogo"></img>
        </div>
      </article>

      <article className="postInfo__Header">
        <div className="postInfo__title">
          <div className="postInfo__InputTitle">{props.posts.title}</div>
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
            <div className="postInfo__InputDescription">
              {props.posts.description}
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">{props.posts.category}</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">
              <PostCardDate date={props.posts.date} />
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">{finalPay}</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">
              {props.posts.currentNum} / {props.posts.totalNum}명
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__inputTag">{props.posts.deliveryTag}</div>
          </div>
          <div className="postInfo__list">
            <div className="postInfo__inputTag">{props.posts.payTag}</div>
          </div>
        </section>

        <section className="postInfo__right">
          <div className="postInfo__postMap">
            <div className="postInfo__InputPostMap">{props.posts.located}</div>
          </div>
          <div className="postInfo__titleMap">
            <FaMapMarkerAlt size="1.2rem" color="#ff4234" />
            &nbsp;{props.posts.located}
          </div>
          <div className="postInfo__map">
            <PostMap address={props.posts} />
          </div>
        </section>
      </article>

      <article className="postInfo__Footer">
        <button className="postInfo__actions" onClick={plusCurNum}>
          &nbsp;참여하기
        </button>
      </article>
    </div>
  );
};

export default PostCardCheck;
