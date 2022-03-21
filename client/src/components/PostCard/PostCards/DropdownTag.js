import React, { useState } from "react";
import "./DropdownTag.scss";

export const DeliveryTag = ({ options, selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdownT">
      <div className="dropdownT-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
      </div>
      {isActive && (
        <div className="dropdownT-content">
          {options.map((option) => (
            <div
              onClick={() => {
                setSelected((prevState) => {
                  return { ...prevState, deliveryTag: option };
                });
                setIsActive(false);
              }}
              className="dropdownT-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const PayTag = ({ options, selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdownT">
      <div className="dropdownT-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
      </div>
      {isActive && (
        <div className="dropdownT-content">
          {options.map((option) => (
            <div
              onClick={() => {
                setSelected((prevState) => {
                  return { ...prevState, payTag: option };
                });
                setIsActive(false);
              }}
              className="dropdownT-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
