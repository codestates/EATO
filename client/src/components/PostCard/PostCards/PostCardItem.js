import React, { useState } from "react";
import PostCardDate from "./PostCardDate";
import PostCardTime from "./PostCardTime";
import PostCardCheck from "../PostCardRead/PostCardCheck";
import "./PostCardItem.scss";

const PostCardItem = (props) => {
  const [isClick, setIsClick] = useState(false);

  const handleCardClick = () => {
    setIsClick(!isClick);
  };

  const payKr = `${props.deliveryFee
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;

  return (
    <artivle className="postCard-item" onClick={handleCardClick}>
      {isClick && (
        <section className="modal">
          <div onClick={setIsClick} className="overlay"></div>
          <div className="modal-content">
            <PostCardCheck posts={props} />
          </div>
        </section>
      )}
      <section className="postCard-item__left">
        <div className="postCard-item__leftListC">{props.category}</div>
        <div className="postCard-item__leftListT">{props.title}</div>
        <div className="postCard-item__leftListL">
          {props.located}
          {"지도 설정하면 들어가는 자리"}
        </div>
        <div className="postCard-item__leftListD">{payKr}</div>
      </section>
      <section className="postCard-item__center">
        <PostCardDate date={props.date} />
      </section>
      <section className="postCard-item__right">
        <div className="postCard-item__listN">1 / {props.totalNum}</div>
        {/* 삼항연잔자 !== 모집중 사용할것 */}
        <div className="postCard-item__listState">모집중</div>
        <PostCardTime
          className="postCard-item__listTime"
          date={props.joinTime}
        />
        <div className="postCard-item__Tag">
          <div className="postCard-item__deliveryTag">{props.deliveryTag}</div>
          <div className="postCard-item__payTag">{props.payTag}</div>
        </div>
      </section>
    </artivle>
  );
};

export default PostCardItem;
