import React, { useState } from "react";
import "./DropDownT.scss";
const DropdownT = ({ options, selected, setSelected }) => {
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
              onClick={(e) => {
                setSelected(option);
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

export default DropdownT;
