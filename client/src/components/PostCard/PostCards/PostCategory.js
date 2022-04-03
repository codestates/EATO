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
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelected((prevState) => {
                  return { ...prevState, category: option.name };
                });
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
