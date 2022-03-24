import React from "react";

const PostCardDate = ({ meetDay }) => {
  const strMeetDay = new Date(meetDay).toLocaleString();
  const date = strMeetDay.slice(2, 20);

  return (
    <div>
      <div>{date}</div>
    </div>
  );
};

export default PostCardDate;
