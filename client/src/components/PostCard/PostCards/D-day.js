const date = () => {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  const getDate = [year, month, day].join("-");
  const a = `${getDate}`;
  return a;
};

const addTime = (date, paramType, param) => {
  let unit = 0;
  if (paramType === "day") {
    unit = 1000 * 60 * 60 * 24; // 일 단위
  } else if (paramType === "hour") {
    unit = 1000 * 60 * 60; // 시간
  } else if (paramType === "minute") {
    unit = 1000 * 60; // 분
  }
  const b = new Date(new Date(date).getTime() + unit * param);
  return b;
};
