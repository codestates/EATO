import React, { useState } from "react";
import PostCardDate from "./PostCardDate";
import PostCardCheck from "../PostCardRead/PostCardCheck";
import { IoClose } from "react-icons/io5";
import "./PostCardItem.scss";

const PostCardItem = (props) => {
  const [isClick, setIsClick] = useState(false);

  const day = new Date(props.date).toLocaleString("ko-KR");
  const strDay = String(day).substring(0, 12);
  const joinTime = new Date(props.date).toLocaleString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const payKr =
    String(props.deliveryFee).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

  const handleCardClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      <article className="postCard-item" onClick={handleCardClick}>
        <section className="postCard-item__left">
          <div className="postCard-top">
            <div className="postCard-item__leftListC">{props.category}</div>
            <div className="postCard-item__leftListC">{strDay}</div>
          </div>
          <div className="postCard-item__leftListT">{props.title}</div>
          <div className="postCard-item__leftListL">{props.located}</div>
          <div className="postCard-item__leftListD">{payKr}</div>
        </section>
        <section className="postCard-item__right">
          <div className="postCard-item__listN">
            {props.currentNum} / {props.totalNum}
          </div>
          <div className="postCard-item__listState">
            {props.totalNum > props.currentNum ? "모집중" : "모집완료"}
          </div>
          <div className="postCard-item__listTime">{joinTime}</div>
          <div className="postCard-item__Tag">
            <div className="postCard-item__deliveryTag">
              {props.deliveryTag}
            </div>
            <div className="postCard-item__payTag">{props.payTag}</div>
          </div>
        </section>
        <section className="half-border-raidus"></section>
      </article>
      {isClick && (
        <section className="modal">
          <div className="overlay" onClick={handleCardClick}></div>
          <div className="modal-content">
            <div className="postClose-btn">
              <button
                className="postCard-close"
                data-backdrop="static"
                data-keyboard="false"
                onClick={handleCardClick}
              >
                <IoClose />
              </button>
            </div>
            <PostCardCheck
              id={props.id}
              category={props.category}
              description={props.description}
              title={props.title}
              date={props.date}
              deliveryFee={props.deliveryFee}
              totalNum={props.totalNum}
              currentNum={props.currentNum}
              located={props.located}
              deliveryTag={props.deliveryTag}
              payTag={props.payTag}
              closeModal={handleCardClick}
              creatorId={props.creatorId}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default PostCardItem;
