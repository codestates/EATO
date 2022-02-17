import React from "react";

import "./PostCardTime.scss";

const PostCardTime = (props) => {
  const postTime = props.date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log("시간콘솔", props, postTime);

  return (
    <div className="postCard-date">
      <div className="postCard-date__month">{postTime}</div>
    </div>
  );
};

export default PostCardTime;
