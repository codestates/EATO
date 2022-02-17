import React from "react";

import PostCardItem from "../PostCards/PostCardItem";
import Card from "../UI/Card";
import "./PostCardRead.scss";

const PostCardRead = (props) => {
  return (
    <Card className="postCards">
      {props.items.map((postCard) => (
        //Home PostCard Overview
        <PostCardItem
          key={postCard.id}
          category={postCard.category}
          title={postCard.title}
          date={postCard.date}
          time={postCard.startTime}
          deliveryFee={postCard.deliveryFee}
          // located={postCard.located}
        />
      ))}
    </Card>
  );
};

export default PostCardRead;
