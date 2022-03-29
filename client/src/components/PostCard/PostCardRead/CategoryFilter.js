import React, { useState } from "react";
import { categoryOptions, filterHead } from "../../../resource/datas";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import totalImg from "../../../images/CategoryImg/Category0.png";
import hansik from "../../../images/CategoryImg/Category1.png";
import joongsik from "../../../images/CategoryImg/Category2.png";
import yangsik from "../../../images/CategoryImg/Category3.png";
import ilsik from "../../../images/CategoryImg/Category4.png";
import bunsik from "../../../images/CategoryImg/Category5.png";
import chicken from "../../../images/CategoryImg/Category6.png";
import fastfood from "../../../images/CategoryImg/Category7.png";
import jockbal from "../../../images/CategoryImg/Category8.png";
import yasik from "../../../images/CategoryImg/Category9.png";
import cafe from "../../../images/CategoryImg/Category10.png";
import etc from "../../../images/CategoryImg/Category11.png";
import totalImgHover from "../../../images/CategoryImgHover/CategoryHover0.png";
import hansikHover from "../../../images/CategoryImgHover/CategoryHover1.png";
import joongsikHover from "../../../images/CategoryImgHover/CategoryHover2.png";
import yangsikHover from "../../../images/CategoryImgHover/CategoryHover3.png";
import ilsikHover from "../../../images/CategoryImgHover/CategoryHover4.png";
import bunsikHover from "../../../images/CategoryImgHover/CategoryHover5.png";
import chickenHover from "../../../images/CategoryImgHover/CategoryHover6.png";
import fastfoodHover from "../../../images/CategoryImgHover/CategoryHover7.png";
import jockbalHover from "../../../images/CategoryImgHover/CategoryHover8.png";
import yasikHover from "../../../images/CategoryImgHover/CategoryHover9.png";
import cafeHover from "../../../images/CategoryImgHover/CategoryHover10.png";
import etcHover from "../../../images/CategoryImgHover/CategoryHover11.png";

import "./CategoryFilter.scss";

export const CategoryFilter = ({ options, setOptions }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const imgChangeHandler = (idx) => {
    setCurrentImg(idx);
  };

  const categoryImgs = [
    totalImg,
    hansik,
    joongsik,
    yangsik,
    ilsik,
    bunsik,
    chicken,
    fastfood,
    jockbal,
    yasik,
    cafe,
    etc,
  ];

  const categoryHoverImgs = [
    totalImgHover,
    hansikHover,
    joongsikHover,
    yangsikHover,
    ilsikHover,
    bunsikHover,
    chickenHover,
    fastfoodHover,
    jockbalHover,
    yasikHover,
    cafeHover,
    etcHover,
  ];

  const categoryLists = [{ name: "전체" }, ...categoryOptions];
  return (
    <article className="categoryFilter_wrap">
      <section className="categoryFilter">
        {categoryLists.map((category, idx) => {
          return (
            <li
              className="categoryFilter_area"
              key={idx}
              onClick={() => {
                imgChangeHandler(idx);
                setOptions(category.name);
              }}
            >
              <img
                className={"categoryFilter_img"}
                src={
                  currentImg === idx
                    ? categoryHoverImgs[idx]
                    : categoryImgs[idx]
                }
                alt="categoryImg"
                value={category.name}
                value-key={idx}
              />
              <div
                className={
                  currentImg === idx
                    ? "categoryFilter_clickedName"
                    : "categoryFilter_name"
                }
                value={category.name}
                value-key={idx}
              >
                {category.name}
              </div>
            </li>
          );
        })}
      </section>
    </article>
  );
};

export const CategoryfilterChart = ({ options, setOtions }) => {
  const [isActive, setIsActive] = useState(false);

  const activeChangeHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="filter-head">
      <div className="filter-headContent" onClick={activeChangeHandler}>
        {options}&nbsp;
        {isActive ? <GoTriangleDown /> : <GoTriangleUp />}
      </div>
      {isActive && (
        <div className="filter-headLists" onMouseLeave={activeChangeHandler}>
          {filterHead.map((head, idx) => {
            return (
              <li
                className="filter-headItem"
                key={idx}
                onClick={() => {
                  setOtions(head.text);
                  setIsActive(false);
                }}
              >
                {head.text}
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};
