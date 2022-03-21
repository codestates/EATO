import React from "react";

export default function ChatRoomCard(props) {
  const deliveryFee = `${props.deliveryFee
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;

  return (
    <>
      <article className="mypage-cb-card-container">
        <div className="mypage-cb-card">
          <div className="mypage-cb-leftbox">
            <p className="mypage-cb-lb-title">{props.title}</p>
            <span className="mypage-cb-lb-fee">{deliveryFee}</span>
          </div>
        </div>
      </article>
    </>
  );
}
