import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Text1 from "../../images/text_1.png";
import Text2 from "../../images/text_2.png";
import Text3 from "../../images/text_3.png";
import CardImg from "../../images/intro-card.png";
import MapImg from "../../images/intro-map.png";

function Intro() {
  return (
    <>
      <section className="intro-1">
        <div className="wrapper">
          <img src={CardImg} alt="card-img" className="card"></img>

          <div className="start-box">
            <h1 className="intro-text-1">이웃과 배달비를 나눠 보세요</h1>
            <Link to="/signin" className="btn">
              시작하기
            </Link>
          </div>
        </div>
      </section>

      <section className="intro-2">
        <div className="wrapper">
          <h1 className="intro-text-2">오래 기다릴 필요없어요 포장하는 이웃과 JOIN해 보세요</h1>

          <div className="search-bar">
            <div className="search-text">서울특별시 동작구 대방동 포장</div>
            <FaSearch className="search-icon" size="32" />
          </div>
        </div>
      </section>

      <section className="intro-3">
        <div className="wrapper">
          <img src={MapImg} alt="map-img" className="map"></img>
          <h1 className="intro-text-3">주변에서 함께 주문할 이웃을 찾아보세요</h1>
        </div>
      </section>

      <section className="intro-4">
        <div className="wrapper">
          <h1 className="intro-text-4">무엇을 먹을지 고민된다면 동네 이웃들과 소통해 보세요</h1>
          <div className="img-wrapper">
            <div className="img-box-l">
              <img src={Text1} alt="text-img" className="img-1" />
            </div>

            <div className="img-box-r">
              <img src={Text2} alt="text-img" className="img-2" />
            </div>

            <div className="img-box-l">
              <img src={Text3} alt="text-img" className="img-3" />
            </div>
          </div>
        </div>
      </section>

      <div className="intro-5">
        <div className="wrapper">
          <h1 className="intro-text-5">지금 바로 시작해 보세요</h1>
          <div className="start-box">
            <Link to="/signin" className="btn">
              시작하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Intro;
