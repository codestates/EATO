import React, { useState } from "react";
import { categoryOptions } from "../../../resource/datas";
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

const CategoryFilter = () => {
  const [currentImg, setCurrentImg] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const filterChangeHandler = (selectedCategory) => {
    setFilterCategory(selectedCategory);
  };
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
      <section className="categoryFilter" onClick={filterChangeHandler}>
        {categoryLists.map((category, idx) => {
          return (
            <li
              className="categoryFilter_area"
              key={idx}
              onMouseOver={() => imgChangeHandler(idx)}
            >
              <img
                className={"categoryFilter_img"}
                src={
                  currentImg === idx
                    ? categoryHoverImgs[idx]
                    : categoryImgs[idx]
                }
                onClick={() => imgChangeHandler(idx)}
              />
              <div
                className={
                  currentImg === idx
                    ? "categoryFilter_clickedName"
                    : "categoryFilter_name"
                }
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

export default CategoryFilter;
