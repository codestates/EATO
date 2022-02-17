import React from "react";

import PostCardItem from "./PostCardItem";
import Card from "../UI/Card";
import "./PostCard.scss";

const PostCard = (props) => {
  console.log("postcard props", props);
  return (
    <Card className="postCards">
      {props.items.map((postCard) => (
        //Home PostCard Overview
        <PostCardItem
          key={postCard.id}
          category={postCard.category}
          title={postCard.title}
          date={postCard.date}
          startTime={postCard.date}
          endTime={postCard.date}
          deliveryFee={postCard.deliveryFee}
          totalNum={postCard.totalNum}
          // located={postCard.located}
        />
      ))}
    </Card>
  );
};

export default PostCard;
