import React, { useState } from "react";

import MapCheck from "./MapCheck";
import { IoClose } from "react-icons/io5";
import "./MapItem.scss";
// import axios from "axios";
// axios.defaults.withCredentials = true;

const MapItem = (props) => {
  const [isClick, setIsClick] = useState(false);
  // const config = {
  //   "Content-Type": "application/json",
  //   withCredentials: true,
  // };

  const handleCardClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      <article className="map-item" onClick={handleCardClick}>
        <section className="map-item__left" key={props.id}>
          <div className="map-item__leftListC">{props.category}</div>
          <div className="map-item__leftListT">{props.title}</div>
          <div className="map-item__leftListL">{props.located}</div>
          <div className="map-item__leftListD"></div>
        </section>
        <section className="map-item__center"></section>
        <section className="map-item__right">
          <div className="map-item__listN">
            {props.currentNum} / {props.totalNum}
          </div>
          <div className="map-item__listState">
            {props.totalNum > props.currentNum ? "모집중" : "모집완료"}
          </div>
          <div className="map-item__listTime"></div>

          <div className="map-item__Tag">
            <div className="map-item__deliveryTag">{props.deliveryTag}</div>
            <div className="map-item__payTag">{props.payTag}</div>
          </div>
        </section>
      </article>
      {isClick && (
        <section className="modal">
          <div className="overlay" onClick={handleCardClick}></div>
          <div className="modal-content">
            <div className="postClose-btn">
              <button
                className="map-close"
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

export default MapItem;
