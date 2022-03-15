import React, { useState } from "react";

import MapCheck from "./MapCheck";
import { IoClose } from "react-icons/io5";

// import axios from "axios";
// axios.defaults.withCredentials = true;

const MapList = (props) => {
  // const joinTime = props.date.toTimeString().substr(0, 5);
  const [isClick, setIsClick] = useState(false);
  // const config = {
  //   "Content-Type": "application/json",
  //   withCredentials: true,
  // };

  const handleCardClick = () => {
    setIsClick(!isClick);
  };

  // const payKr = `${props.deliveryFee
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;

  return (
    <>
      <article className="postCard-item" onClick={handleCardClick}>
        <section className="postCard-item__left" key={props.id}>
          <div className="postCard-item__leftListC">{props.category}</div>
          <div className="postCard-item__leftListT">{props.title}</div>
          <div className="postCard-item__leftListL">{props.located}</div>
          <div className="postCard-item__leftListD"></div>
        </section>
        <section className="postCard-item__center"></section>
        <section className="postCard-item__right">
          <div className="postCard-item__listN">
            {props.currentNum} / {props.totalNum}
          </div>
          <div className="postCard-item__listState">
            {props.totalNum > props.currentNum ? "모집중" : "모집완료"}
          </div>
          <div className="postCard-item__listTime"></div>

          <div className="postCard-item__Tag">
            <div className="postCard-item__deliveryTag">
              {props.deliveryTag}
            </div>
            <div className="postCard-item__payTag">{props.payTag}</div>
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
            <MapCheck posts={props} />
          </div>
        </section>
      )}
    </>
  );
};

export default MapList;
