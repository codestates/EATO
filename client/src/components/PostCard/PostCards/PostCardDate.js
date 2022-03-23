import React from "react";

const PostCardDate = ({ meetDay }) => {
  console.log("getday : ", meetDay);
  const year = meetDay.slice(2, 4);
  const month = meetDay.slice(5, 7);
  const day = meetDay.slice(8, 10);
  const hour = meetDay.slice(11, 13);
  const min = meetDay.slice(14, 16);
  const date = `${year}.${month}.${day} ${hour}:${min}`;

  return (
    <div>
      <div>{date}</div>
    </div>
  );
};

export default PostCardDate;
