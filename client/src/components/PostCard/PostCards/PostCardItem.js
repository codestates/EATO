import React, { useState } from "react";
import PostCardDate from "./PostCardDate";
import PostCardCheck from "../PostCardRead/PostCardCheck";
import { IoClose } from "react-icons/io5";
import "./PostCardItem.scss";

const PostCardItem = ({
  id,
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
}) => {
  const [isClick, setIsClick] = useState(false);

  const day = new Date(date).toLocaleString("ko-KR");
  const strDay = String(day).substring(0, 12);
  const joinTime = new Date(date).toLocaleString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const payKr =
    String(deliveryFee).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

  const handleCardClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      <article className="postCard-item" onClick={handleCardClick}>
        <section className="postCard-item__left">
          <div className="postCard-item__leftListC">{category}</div>
          <div className="postCard-item__leftListT">{title}</div>
          <div className="postCard-item__leftListL">{located}</div>
          <div className="postCard-item__leftListD">{payKr}</div>
        </section>
        <section className="postCard-item__center">
          {strDay}
          <div className="displayNone">
            <PostCardDate meetDay={date} />
          </div>
        </section>
        <section className="postCard-item__right">
          <div className="postCard-item__listN">
            {currentNum} / {totalNum}
          </div>
          <div className="postCard-item__listState">
            {totalNum > currentNum ? "모집중" : "모집완료"}
          </div>
          <div className="postCard-item__listTime">{joinTime}</div>
          <div className="postCard-item__Tag">
            <div className="postCard-item__deliveryTag">{deliveryTag}</div>
            <div className="postCard-item__payTag">{payTag}</div>
          </div>
        </section>
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
              id={id}
              category={category}
              description={description}
              title={title}
              date={date}
              deliveryFee={deliveryFee}
              totalNum={totalNum}
              currentNum={currentNum}
              located={located}
              deliveryTag={deliveryTag}
              payTag={payTag}
              closeModal={handleCardClick}
              creatorId={creatorId}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default PostCardItem;
