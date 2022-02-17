import React from "react";
import { Link } from "react-router-dom";
import Card from "./UI/Card";
import { GoSearch } from "react-icons/go";
import "./HomePageSearchBar.scss";
import logo from "../../images/logo.png";

function HomesSearchBar() {
  return (
    <>
      <div>
        <Card className="homeSearch">
          <div>
            <img src={logo} />
            <input
              className="homeSearchBar"
              type="text"
              placeholder="가까운 배달 크루 찾으러가기"
            />
            <Link to="/map">
              <GoSearch />
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}

export default HomesSearchBar;
