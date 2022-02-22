import React, { useState } from "react";
import PostCardDate from "../PostCards/PostCardDate";
import PostCardTime from "../PostCards/PostCardTime";
import postLogo from "../../../images/Logo.png";
import { GrClose } from "react-icons/gr";

import "./PostCardCheck.scss";

const PostCardCheck = (props) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="postInfoWrap">
      <button className="postCard-close" onClick={toggleModal}>
        <GrClose />
      </button>
      <img src={postLogo} className="postLogo" alt="postLogo"></img>
      <div className="postInfo">
        <div className="postInfo__title">
          <div className="postInfo__InputTitle">{props.posts.title}</div>
        </div>
        <section className="postInfo__Main">
          <section className="postInfo__Left">
            <div className="postInfo__description">
              <div className="postInfo__InputDescription">
                {props.posts.description}
              </div>
            </div>

            <div className="postInfo__category">
              <div className="postInfo__InputCategory">
                {props.posts.category}
              </div>
            </div>

            <div className="postInfo__date">
              <div className="postInfo__InputDate">
                <PostCardDate date={props.posts.date} />
              </div>
            </div>

            <div className="postInfo__time">
              <div className="postInfo__InputTime">
                <PostCardTime date={props.posts.joinTime} />
              </div>
            </div>

            <div className="postInfo__deliveryFee">
              <div className="postInfo__InputDeliveryFee">
                {props.posts.deliveryFee}원
              </div>
            </div>

            <div className="postInfo__person">
              <div className="postInfo__InputPerson">
                {props.posts.totalNum}명
              </div>
            </div>
          </section>

          <section className="postInfo__right">
            <div className="postInfo__rightTop">
              <div className="postInfo__postMap">
                <div className="postInfo__InputPostMap">
                  {props.posts.postMap}postMap
                </div>
              </div>
            </div>

            <div className="postInfo__PayTag">
              <div className="postInfo__InputPayTag">{props.posts.payTag}</div>
            </div>

            <div className="postInfo__deliveryTag">
              <div className="postInfo__InputDeliveryTag">
                {props.posts.deliveryTag}
              </div>
            </div>
            <div className="postInfo__titleMap">주소</div>
            <div className="postInfo__map">지도</div>
          </section>
        </section>
        <button className="postInfo__actions">참여하기</button>
      </div>
    </div>
  );
};

export default PostCardCheck;
