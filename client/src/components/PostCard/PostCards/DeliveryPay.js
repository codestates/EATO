import React, { useState } from "react";
import { FcCalculator, FcExpand, FcCollapse } from "react-icons/fc";
import "./DeliveryPay.scss";

const DeliveryPay = ({ pay, setPay }) => {
  const [isActive, setIsActive] = useState(false);

  const increaseHandler = () => {
    setPay(pay + 500);
  };

  const decreaseHandler = () => {
    setPay(pay - 500);
  };

  const finalPay = `${pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;

  return (
    <div className="payInput">
      <div
        className="payInput-btn"
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        {pay && pay > 0 ? (
          <>
            <FcCalculator size="1.8rem" />
            &nbsp;&nbsp; {finalPay}
          </>
        ) : (
          <>
            <FcCalculator size="1.8rem" />
            &nbsp;&nbsp; 배달비용
          </>
        )}
      </div>
      {isActive &&
        (pay && pay < 0 ? (
          setPay(0)
        ) : (
          <div className="payInput-content">
            <FcExpand onClick={decreaseHandler}>-</FcExpand>
            {finalPay}
            <FcCollapse onClick={increaseHandler}>+</FcCollapse>
          </div>
        ))}
    </div>
  );
};
export default DeliveryPay;
