import React, { useEffect, useState } from "react";

import PostCardDate from "./PostCardDate";
import PostCardTime from "./PostCardTime";
import Card from "../UI/Card";
import "./PostCardItem.scss";

const PostCardItem = (props) => {
  console.log("item props", props);
  return (
    <Card className="postCard-item">
      <div className="postCard-item__description">
        <div className="postCard-item__list">{props.category}</div>
        <div className="postCard-item__list">{props.title}</div>
        <div className="postCard-item__list">
          {props.located}
          {"지도 설정하면 들어가는 자리"}
        </div>
        <div className="postCard-item__price">{props.deliveryFee}원</div>
      </div>
      <div>
        <PostCardDate date={props.date} />
      </div>
      <div>
        <div className="postCard-item__people">
          1&nbsp;/&nbsp;{props.totalNum}
        </div>
        <div>모집중</div>
        <PostCardTime date={props.date} />
        ~
        <PostCardTime date={props.date} />
      </div>
    </Card>
  );
};

export default PostCardItem;
