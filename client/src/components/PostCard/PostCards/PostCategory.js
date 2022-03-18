import React, { useState } from "react";
import "./PostCategory.scss";

const Dropdown = ({ options, selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
        {selected && selected ? <>{selected}</> : <>Category</>}
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={() => {
                setSelected((prevState) => {
                  return { ...prevState, category: option };
                });
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
