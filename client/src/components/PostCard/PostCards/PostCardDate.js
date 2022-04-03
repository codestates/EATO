import React from "react";

const PostCardDate = ({ meetDay }) => {
  const strMeetDay = new Date(meetDay).toLocaleString("ko-Kr");
  const time = new Date(meetDay).toLocaleString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = strMeetDay.slice(2, 12);

  return (
    <div>
      <div>
        {date} &nbsp;
        {time}
      </div>
    </div>
  );
};

export default PostCardDate;
