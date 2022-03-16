import React from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import "./HomePageSearchBar.scss";

const HomesSearchBar = () => {
  return (
    <div className="homeSearch">
      <div className="homeSearchBar">
        <input
          className="homeSearchBar-input"
          type="text"
          placeholder="주변에 같이 주문할 사람을 찾아볼까요?"
        />
        <div className="homeSerchBar-icon">
          <Link to="/map">
            <GoSearch size="40" color="white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomesSearchBar;
