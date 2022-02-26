import React, { useState } from "react";
import PostCardDate from "../PostCards/PostCardDate";
import PostCardTime from "../PostCards/PostCardTime";
import postLogo from "../../../images/Logo.png";
import { IoClose } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "./PostCardCheck.scss";

const PostCardCheck = (props) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const editHandler = () => {};

  return (
    <div className="postInfoWrap">
      <article className="postInfo__Nav">
        <div className="imgLogo">
          <img src={postLogo} className="postLogo" alt="postLogo"></img>
        </div>
        <div className="postClose-btn">
          <button
            className="postCard-close"
            onClick={toggleModal}
            data-backdrop="static"
            data-keyboard="false"
          >
            <IoClose />
          </button>
        </div>
      </article>

      <article className="postInfo__Header">
        <div className="postInfo__title">
          <div className="postInfo__InputTitle">{props.posts.title}</div>
        </div>
        <div className="postInfo__work">
          <HiOutlineDotsVertical size="1.5rem" onClick={editHandler} />
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
              {/* <div className="postInfo__InputDate1"> */}
              <PostCardDate date={props.posts.date} />
            </div>
            {/* </div> */}
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">
              {/* <div className="postInfo__InputTime1"> */}
              <PostCardTime date={props.posts.joinTime} />
            </div>
            {/* </div> */}
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">
              {props.posts.deliveryFee}원
            </div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__InputList">{props.posts.totalNum}명</div>
          </div>

          <div className="postInfo__list">
            <div className="postInfo__tag">
              <div className="postInfo__inputTag">
                {props.posts.deliveryTag}
              </div>
              <div className="postInfo__inputTag">{props.posts.payTag}</div>
            </div>
          </div>
        </section>

        <section className="postInfo__right">
          <div className="postInfo__postMap">
            <div className="postInfo__InputPostMap">
              {props.posts.postMap}postMap
            </div>
          </div>
          <div className="postInfo__titleMap">
            <FaMapMarkerAlt size="1.2rem" />
            주소
          </div>
          <div className="postInfo__map">지도</div>
        </section>
      </article>

      <article className="postInfo__Footer">
        <button className="postInfo__actions">&nbsp;참여하기</button>
      </article>
    </div>
  );
};

export default PostCardCheck;
