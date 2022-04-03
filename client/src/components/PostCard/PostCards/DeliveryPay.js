import React, { useState } from "react";
import { FcExpand, FcCollapse } from "react-icons/fc";
import "./DeliveryPay.scss";

const DeliveryPay = ({ pay, setPay }) => {
  const [isActive, setIsActive] = useState(false);
  const activeChangeHandler = () => {
    setIsActive(!isActive);
  };

  const increaseHandler = () => {
    setPay((prevState) => {
      return { ...prevState, deliveryFee: pay + 500 };
    });
  };

  const decreaseHandler = () => {
    setPay((prevState) => {
      return { ...prevState, deliveryFee: pay - 500 };
    });
  };

  const finalPay = `각 ${pay
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;

  return (
    <div className="payInput">
      <div className="payInput-btn" onClick={activeChangeHandler}>
        {pay && pay > 0 ? (
          <div className="payInput-finalpay">{finalPay}</div>
        ) : (
          <>배달비용</>
        )}
      </div>
      {isActive &&
        (pay && pay < 0 ? (
          setPay(0)
        ) : (
          <div className="payInput-content" onMouseLeave={activeChangeHandler}>
            <FcExpand className="icons" onClick={decreaseHandler} />
            500원
            <FcCollapse className="icons" onClick={increaseHandler} />
          </div>
        ))}
    </div>
  );
};
export default DeliveryPay;
