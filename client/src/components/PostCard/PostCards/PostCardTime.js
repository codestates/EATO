import React from "react";

import "./PostCardTime.scss";

const PostCardTime = (props) => {
  // 아래가 문제 입력하는 시간 못받아옴
  const postTime = props.date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // console.log("time-props : ", props);
  // console.log("postTime : ", postTime);

  return <div className="postCard-dateTime">{postTime}</div>;
};

export default PostCardTime;

// 시간을 24시간으로 적용하는 것으로 교체  [ ]
//시간을 넘겨받았다. props 정상적으로 받아오는 것 ok [v]
// 시간 표시 확인후 시간 한시간 연산 검색 적용 [ ]
