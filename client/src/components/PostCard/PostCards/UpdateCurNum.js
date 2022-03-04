import React from "react";

const CurNum = (props) => {
  console.log("CurNum props : ", props.prop);
  const joinedNum = props.prop;
  const countCurNum = joinedNum + 1;
  return countCurNum;
};

export default CurNum;
