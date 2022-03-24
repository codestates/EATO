import React, { useState } from "react";
import { FcCollapse, FcExpand } from "react-icons/fc";
import "./CountPeople.scss";

const CountPeople = ({ num, setNum }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="actInput">
      <div className="actInput-btn" onClick={(e) => setIsActive(!isActive)}>
        {num && num > 1 ? <>총 {num} 명</> : <>모집인원</>}
      </div>
      {isActive &&
        (num && num < 0 ? (
          setNum(0)
        ) : (
          <div className="actInput-content">
            <FcExpand
              onClick={() =>
                setNum((prevState) => {
                  return { ...prevState, totalNum: num - 1 };
                })
              }
            />
            {num}
            <FcCollapse
              onClick={() =>
                setNum((prevState) => {
                  return { ...prevState, totalNum: num + 1 };
                })
              }
            />
          </div>
        ))}
    </div>
  );
};

export default CountPeople;
