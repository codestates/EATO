import React from "react";

const PostCardDate = (props) => {
  const day = props.date.toLocaleDateString("ko-kr");
  const time = props.date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = `${day} ${time}`;

  return (
    <div>
      <div>{date}</div>
    </div>
  );
};

export default PostCardDate;
