import React from "react";

import "./PostCardDate.scss";

const PostCardDate = (props) => {
  const year = props.date.getFullYear();
  const month = props.date.toLocaleDateString("ko-KR", { month: "short" });
  const day = props.date.toLocaleDateString("ko-KR", { day: "2-digit" });

  return (
    <div className="postCard-date">
      <div className="postCard-date__month">
        {year}년&nbsp;{month}&nbsp;{day}
      </div>
    </div>
  );
};

export default PostCardDate;
