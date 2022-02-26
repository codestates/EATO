import React from "react";

const PostCardTime = (props) => {
  // 아래가 문제 입력하는 시간 못받아옴
  const postTime = props.date.toLocaleTimeString();
  const postTimeGet = props.date.getTime(); // time :  1655018420000
  // console.log("time-props : ", props);
  // console.log("postTime : ", postTime);
  // console.log("time : ", postTimeGet);
  return <div className="postCard-dateTime">{postTime}</div>;
};

export default PostCardTime;

// 시간을 24시간으로 적용하는 것으로 교체  [ ]
//시간을 넘겨받았다. props 정상적으로 받아오는 것 ok [v]
// 시간 표시 확인후 시간 한시간 연산 검색 적용 [ ]

//getSecondsToTomorrow() === 3600 몇초남았는지

// function formatDate(date) {
//   let dayOfMonth = date.getDate();
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();
//   let hour = date.getHours();
//   let minutes = date.getMinutes();
//   let diffMs = new Date() - date;
//   let diffSec = Math.round(diffMs / 1000);
//   let diffMin = diffSec / 60;
//   let diffHour = diffMin / 60;

//   // formatting
//   year = year.toString().slice(-2);
//   month = month < 10 ? '0' + month : month;
//   dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
//   hour = hour < 10 ? '0' + hour : hour;
//   minutes = minutes < 10 ? '0' + minutes : minutes;

//   if (diffSec < 1) {
//     return 'right now';
//   } else if (diffMin < 1) {
//     return `${diffSec} sec. ago`
//   } else if (diffHour < 1) {
//     return `${diffMin} min. ago`
//   } else {
//     return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
//   }
// }
