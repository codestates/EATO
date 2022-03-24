import React, { useState } from "react";
import { FcExpand, FcCollapse } from "react-icons/fc";
import "./DeliveryPay.scss";

const DeliveryPay = ({ pay, setPay }) => {
  const [isActive, setIsActive] = useState(false);

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
      <div
        className="payInput-btn"
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
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
          <div className="payInput-content">
            <FcExpand onClick={decreaseHandler}>-</FcExpand>
            500원
            <FcCollapse onClick={increaseHandler}>+</FcCollapse>
          </div>
        ))}
    </div>
  );
};
export default DeliveryPay;
