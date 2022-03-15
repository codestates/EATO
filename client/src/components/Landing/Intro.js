import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Text1 from "../../images/text_1.png";
import Text2 from "../../images/text_2.png";
import Text3 from "../../images/text_3.png";
import CardImg from "../../images/intro-card.png";
import MapImg from "../../images/intro-map.png";
import Pin from "../../images/map-pin.png";
function Intro() {
  useEffect(() => {
    // 애니메이션이 순차적, 동기적으로 실행되도록 하기 위해서 스크롤 트리거가 필요함.
    // ScrollTrigger 플러그인 적용
    gsap.registerPlugin(ScrollTrigger);

    // Intro-1 카드
    gsap.from(".card-img", {
      x: -100,
      opacity: 0,
      duration: 1.5,
    });

    // intro-1 시작하기
    gsap.from(".start-box-top", {
      y: -100,
      opacity: 0,
      duration: 1.5,
    });

    // intro-2 서치바
    gsap.from(".search-bar", {
      scrollTrigger: {
        trigger: ".intro-2",
        start: "top 30%",
        end: "bottom 100%",
        toggleActions: "restart none reverse none",
      },
      x: -100,
      opacity: 0,
      duration: 0.7,
    });

    // intro-3 Pin
    gsap.from(".pin-one", {
      scrollTrigger: {
        trigger: ".intro-3",
        start: "top 70%",
        toggleActions: "restart none reverse none",
      },
      y: -50,
      opacity: 0,
      delay: 0.4,
    });
    gsap.from(".pin-two", {
      scrollTrigger: {
        trigger: ".intro-3",
        start: "top 70%",
        toggleActions: "restart none reverse none",
      },
      y: -50,
      opacity: 0,
      delay: 0.8,
    });
    gsap.from(".pin-three", {
      scrollTrigger: {
        trigger: ".intro-3",
        start: "top 70%",
        toggleActions: "restart none reverse none",
      },
      y: -50,
      opacity: 0,
      delay: 1.2,
    });

    // intro-4 대화 1,2,3
    gsap.from(".img-1", {
      scrollTrigger: {
        trigger: ".intro-4",
        start: "top 70%",
        toggleActions: "restart none reverse none",
      },
      x: -100,
      opacity: 0,
      delay: 0.3,
      ease: 1,
    });
    gsap.from(".img-2", {
      scrollTrigger: {
        trigger: ".intro-4",
        start: "top 70%",
        toggleActions: "restart none reverse none",
      },
      x: 100,
      opacity: 0,
      delay: 0.8,
    });
    gsap.from(".img-3", {
      scrollTrigger: {
        trigger: ".intro-4",
        start: "top 70%",
        toggleActions: "restart none reverse none",
      },
      x: -100,
      opacity: 0,
      delay: 1.3,
    });

    // intro-5 시작하기
    gsap.from(".intro-text-5", {
      scrollTrigger: {
        trigger: ".intro-5",
        start: "top 70%",
        toggleActions: "restart none reverse none",
      },
      opacity: 0,
      delay: 0.8,
    });

    gsap.from(".start-box-bottom", {
      scrollTrigger: {
        trigger: ".intro-5",
        start: "top 70%",
        toggleActions: "restart none reverse none",
      },
      opacity: 0,
      delay: 0.8,
    });
  }, []);

  return (
    <>
      <main className="intro-all-container">
        <section className="intro-1">
          <div className="wrapper">
            <div className="start-box-top">
              <h1 className="intro-text-1">
                이웃과 <span className="join">배달비</span>를 <br />
                나눠 보세요
              </h1>
              <Link to="/signin" className="start-btn-top">
                시작하기
              </Link>
            </div>
            <div className="wrapper-ani">
              <img className="card-img" src={CardImg} alt="card-img"></img>
            </div>
          </div>
        </section>

        <section className="intro-2">
          <div className="wrapper">
            <div className="search-bar">
              <div className="search-text">서울특별시 동작구 대방동 포장</div>
              <FaSearch className="search-icon" size="32" />
            </div>
            <h1 className="intro-text-2">
              오래 기다릴 필요없어요 포장하는 이웃과 <br />
              <span className="join">JOIN</span>해 보세요
            </h1>
          </div>
        </section>

        <section className="intro-3">
          <div className="wrapper">
            <h1 className="intro-text-3">
              <span className="join">주변</span>
              에서 함께 주문할 이웃을 찾아보세요
            </h1>
            <div className="intro-3-map-box">
              <img className="intro-3-map" src={MapImg} alt="map-img" />
              <article className="intro-3-pin-box">
                <img src={Pin} className="pin-one" alt="pin-img" />
                <img src={Pin} className="pin-two" alt="pin-img" />
                <img src={Pin} className="pin-three" alt="pin-img" />
              </article>
            </div>
          </div>
        </section>

        <section className="intro-4">
          <div className="wrapper">
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
            <h1 className="intro-text-4">
              무엇을 먹을지 고민된다면 <br />
              <span className="join">동네 이웃</span>과{" "}
              <span className="join">소통</span>해 보세요
            </h1>
          </div>
        </section>

        <div className="intro-5">
          <div className="wrapper">
            <h1 className="intro-text-5">
              Let's <br />
              <span className="join">EA</span>t <span className="join">TO</span>
              gether!
            </h1>
            <div className="start-box-bottom">
              <Link to="/signin" className="start-btn-bottom">
                시작하기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Intro;
