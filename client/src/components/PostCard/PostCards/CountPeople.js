import React, { useState } from "react";
import { FcCollapse, FcConferenceCall, FcExpand } from "react-icons/fc";
import { BsCheckCircle } from "react-icons/bs";
import "./CountPeople.scss";

const CountPeople = ({ num, setNum }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="actInput">
      <div className="actInput-btn" onClick={(e) => setIsActive(!isActive)}>
        {num && num > 1 ? (
          <>
            <FcConferenceCall size="2.4rem" />
            &nbsp; 총 {num} 명
            {/* &nbsp;&nbsp;&nbsp;
            <BsCheckCircle /> */}
          </>
        ) : (
          <>
            <FcConferenceCall size="2.4rem" />
            &nbsp; 모집인원
          </>
        )}
      </div>
      {isActive &&
        (num && num < 0 ? (
          setNum(0)
        ) : (
          <div className="actInput-content">
            <FcExpand size="1.8rem" onClick={() => setNum(num - 1)} />
            {num}
            <FcCollapse size="1.8rem" onClick={() => setNum(num + 1)} />
            {/* <button onClick={increase}>+</button>
          <button onClick={decrease}>-</button> */}
          </div>
        ))}
    </div>
  );
};

export default CountPeople;
