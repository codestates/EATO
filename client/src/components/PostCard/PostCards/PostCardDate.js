import React from "react";

const PostCardDate = (props) => {
  const date = props.date.toLocaleDateString("ko-kr");

  return (
    <div className="postCard-date">
      <div className="postCard-date__D">{date}</div>
    </div>
  );
};

export default PostCardDate;
