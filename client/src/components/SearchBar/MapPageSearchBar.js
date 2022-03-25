import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { deliTagName, payTagName } from "../../resource/datas";
import "./MapPageSearchBar.scss";

const MapPageSearchBar = () => {
  const [currentTag, setcurrentTag] = useState(0);
  const [currentPayTag, setcurrentPayTag] = useState(0);

  const handleChangeColor = (index) => {
    setcurrentTag(index);
  };
  const handleChangePayColor = (inx) => {
    setcurrentPayTag(inx);
  };

  return (
    <article className="mapSearch">
      <section className="mapSearchBar">
        <div className="mapSearchBar-inputArea">
          <input
            className="mapSearchBar__input"
            type="text"
            placeholder="지역 또는 역명을 검색하세요."
          />
          <div className="mapSearchBar__imgIcon">
            <GoSearch size="30" color="#ff4234" />
          </div>
        </div>
        <ul className="mapSearchBar__tag">
          {deliTagName.map((ele, index) => {
            return (
              <li
                key={index}
                className={
                  currentTag === index
                    ? "mapSearchBar__tagIcon focus"
                    : "mapSearchBar__tagIcon"
                }
                onClick={() => handleChangeColor(index)}
              >
                {ele.text}
              </li>
            );
          })}

          {payTagName.map((ele, inx) => {
            return (
              <li
                key={inx}
                className={
                  currentPayTag === inx
                    ? "mapSearchBar__tagIcon focus"
                    : "mapSearchBar__tagIcon"
                }
                onClick={() => handleChangePayColor(inx)}
              >
                {ele.text}
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
};

export default MapPageSearchBar;
