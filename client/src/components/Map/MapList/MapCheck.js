import React, { useState, useEffect } from "react";
// import PostCardDate from "../PostCards/PostCardDate";
import postLogo from "../../../images/Logo.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "./MapCheck.scss";

const MapCheck = (props) => {
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

  return (
    <div className="mapInfoWrap">
      <article className="mapInfo__Nav">
        <div className="imgLogo">
          <img src={postLogo} className="postLogo" alt="postLogo"></img>
        </div>
      </article>

      <article className="mapInfo__Header">
        <div className="mapInfo__title">
          <div className="mapInfo__InputTitle">{props.posts.title}</div>
        </div>
        <div className="mapInfo__work">
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

      <article className="mapInfo__Body">
        <section className="mapInfo__Left">
          <div className="mapInfo__description">
            <div className="mapInfo__InputDescription">
              {props.posts.description}
            </div>
          </div>

          <div className="mapInfo__list">
            <div className="mapInfo__InputList">{props.posts.category}</div>
          </div>

          <div className="mapInfo__list">
            <div className="mapInfo__InputList">
              {/* <PostCardDate date={props.posts.date} /> */}
            </div>
          </div>

          <div className="mapInfo__list">
            <div className="mapInfo__InputList"></div>
          </div>

          <div className="mapInfo__list">
            <div className="mapInfo__InputList">
              {setCount} / {props.posts.totalNum}명
            </div>
          </div>

          <div className="mapInfo__list">
            <div className="mapInfo__inputTag">{props.posts.deliveryTag}</div>
          </div>
          <div className="mapInfo__list">
            <div className="mapInfo__inputTag">{props.posts.payTag}</div>
          </div>
        </section>

        <section className="mapInfo__right">
          <div className="mapInfo__postMap">
            <div className="mapInfo__InputPostMap">{props.posts.located}</div>
          </div>
          <div className="mapInfo__titleMap">
            <FaMapMarkerAlt size="1.2rem" color="#ff4234" />
            &nbsp;{props.posts.located}
          </div>
          <div className="mapInfo__map">
            {/* <PostMap address={props.posts} /> */}
          </div>
        </section>
      </article>

      <article className="mapInfo__Footer">
        <button className="mapInfo__actions" onClick={plusCurNum}>
          &nbsp;참여하기
        </button>
      </article>
    </div>
  );
};

export default MapCheck;
