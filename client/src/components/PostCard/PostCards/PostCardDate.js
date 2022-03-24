import React from "react";

const PostCardDate = ({ meetDay }) => {
  const strMeetDay = new Date(meetDay).toLocaleString("ko-Kr");
  const date = strMeetDay.slice(2, 20);

  return (
    <div>
      <div>{date}</div>
    </div>
  );
};

export default PostCardDate;
