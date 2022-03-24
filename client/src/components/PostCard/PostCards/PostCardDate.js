import React from "react";

const PostCardDate = ({ meetDay }) => {
  const year = String(meetDay).slice(2, 4);
  const month = String(meetDay).slice(5, 7);
  const day = String(meetDay).slice(8, 10);
  const hour = String(meetDay).slice(11, 13);
  const min = String(meetDay).slice(14, 16);
  const date = `${year}.${month}.${day} ${hour}:${min}`;

  return (
    <div>
      <div>{date}</div>
    </div>
  );
};

export default PostCardDate;
