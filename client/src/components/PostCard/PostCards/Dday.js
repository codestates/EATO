import React, { useState, useEffect } from "react";

const Dday = () => {
  const calculateTimeLeft = (date) => {
    // dueDate 형식은 "2021-11-07 01:39:40" 형식이거나 "2021.11.07 01:39:40" 형식 이어야 합니다.
    const difference = new Date(date) - new Date();
    let timeLeft = {};
    // 남은 시간이 존재할 경우 3일 이하로 시간, 3일 이상 디데이
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // 남은 시간이 존재하지 않을 경우 00:00 으로 설정
      timeLeft = {
        days: 0,
        hours: "0",
        minutes: "0",
      };
    }

    if (!timeLeft.days && timeLeft.hours === "0" && timeLeft.minutes === "0") {
      return "마감";
    } else if (timeLeft.days >= 1) {
      return `D-${timeLeft.days}`;
      // 시간이나 분이 한자리 수 일때 뒤에 0 붙여주기
    } else if (timeLeft.minutes < 10) {
      return `${timeLeft.days * 24 + timeLeft.hours}:0${timeLeft.minutes}`;
    } else if (timeLeft.days * 24 + timeLeft.hours < 10) {
      return `0${timeLeft.days * 24 + timeLeft.hours}:${timeLeft.minutes}`;
    } else if (
      timeLeft.minutes < 10 &&
      timeLeft.days * 24 + timeLeft.hours < 10
    ) {
      return `0${timeLeft.days * 24 + timeLeft.hours}:0${timeLeft.minutes}`;
    } else {
      return `${timeLeft.days * 24 + timeLeft.hours}:${timeLeft.minutes}`;
    }
  };
  const timerLeft = timeInfo.props;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timerLeft));

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(timerLeft));
  }, []);
  return (
    <>
      <div>
        {timeLeft === "마감" ? (
          <div>종료</div>
        ) : (
          <div>{timeInfo.props.slice(0, 10).replace(/-/g, ". ")}</div>
        )}
      </div>
    </>
  );
};
export default Dday;
// import React from "react";
// import Presenter from "./presenter";

// Container

//   state = {
//     days: "0",
//     hours: "0",
//     minutes: "0",
//     seconds: "0",
//   };

//   intervalId;
//   // 만약 d-day 카운트가 끝난다면 interval을 중지시켜주어야 하기 때문에
//   // intervalId 를 미리 선언해줍니다.
//   intervalId2;

//   componentDidMount() {
//     const march = new Date("2019-3-01");
//     // 3월 1일 기준으로 d-day 를 세야하기 때문에 3월 1일의 날짜 객체를 하나 만들어줍니다.

//     this.intervalId = setInterval(() => {
//       this.countDayFN(march);
//     }, 1000);
//     // countDayFN 함수에 매개변수로 3월1일 객체를 넣어준 후 매 초마다 호출시켜줍니다.
//   }

//   render() {
//     const { days, hours, minutes, seconds, progress } = this.state;
//     return (
//       <Presenter
//         days={days}
//         hours={hours}
//         minutes={minutes}
//         seconds={seconds}
//         progress={progress}
//       />
//     );
//   }
//   //화면을 구성해주는 부분입니다. 눈여겨 보실 필요 없으십니다.

//   countDayFN = (toDate) => {
//     // 매개변수로는 목표날짜를 받아와줍니다.
//     const now = new Date(); // 현재의 날짜 객체를 생성해줍니다.
//     let amount = toDate.getTime() - now.getTime(); // 목표날짜와 현재의 날짜의 gap 을 계산해줍니다.
//     // 그러면 날짜 객체의 모양으로 차이가 나오는게 아니라 일반 실수형의 값이 반환됩니다.

//     // time is already past
//     if (amount < 0) {
//       this.setState({
//         ...this.state,
//         day: "0",
//         hours: "0",
//         minutes: "0",
//         seconds: "0",
//       });
//       // 일, 시, 분, 초를 모두 0으로 셋팅해주고,
//       clearInterval(this.intervalId);
//       // intervalId 를 삭제시켜줌으로써 더이상의 함수 호출을 멈춰줍니다.
//     } else {
//       let days = 0;
//       let hours = 0;
//       let mins = 0;
//       let secs = 0;

//       // 일, 시, 분, 초 를 모두 0으로 초기화시켜줍니다.

//       amount = Math.floor(amount / 1000); // milliseconds 모두 지워줍니다.

//       days = Math.floor(amount / 86400);
//       // 하루는 총 86400 초이기 때문에 86400 으로 나눈 값이 d-day와의 남은 일수를 나타내줍니다.
//       amount = amount % 86400;
//       // 나머지값만 받아와줍니다.

//       hours = Math.floor(amount / 3600);
//       // 1시간은 총 3600 초이기 때문에 3600 으로 나눈 값이 d-day와의 남은 시간수를 나타내줍니다.
//       amount = amount % 3600;
//       // 나머지값만 받아와줍니다.

//       mins = Math.floor(amount / 60);
//       // 1분은 총 60 초이기 때문에 60 으로 나눈 값이 d-day와의 남은 분 수를 나타내줍니다.
//       amount = amount % 60;
//       // 나머지값만 받아와줍니다.

//       secs = Math.floor(amount);
//       // 나머지 값은 남은 초가 됩니다.

//       this.setState({
//         ...this.state,
//         days,
//         hours,
//         minutes: mins,
//         seconds: secs,
//       });
//       // day, hours, minutes, seconds 에 각각 대입해줍니다.
//     }
//   };
// }

// export default Container;
