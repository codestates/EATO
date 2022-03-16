import React, { useState } from "react";
import { FcShop } from "react-icons/fc";
import "./PostCategory.scss";

const Dropdown = ({ options, selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected && selected ? (
          <>
            <FcShop size="2.25rem" /> {selected}
          </>
        ) : (
          <>
            <FcShop size="2.25rem" /> &nbsp;Category
          </>
        )}
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
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
