import React, { useState, useEffect } from "react";
const { kakao } = window; // or /*global kakao */

const KakaoMap = () => {
  useEffect(() => {
    // 지도를 표시할 div
    const mapContainer = document.getElementById("eatoMap");

    // 지도의 옵션 설정
    const mapOption = {
      // 지도 중심 좌표 latitude, longitude
      center: new kakao.maps.LatLng(37.54526254025057, 126.97073456478535),
      // 지도의 확대 레벨
      level: 6,
    };
    // 지도를 표시할 div와 지도 욥션으로 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);
    var positions = [
      {
        title: "빌리프커피로스터스",
        latlng: new kakao.maps.LatLng(37.55230751125696, 126.91398476182088),
      },
      {
        title: "쿠시카츠 쿠시엔",
        latlng: new kakao.maps.LatLng(37.55769916158911, 126.91657781720895),
      },
      {
        title: "피에트라",
        latlng: new kakao.maps.LatLng(37.56623882367195, 126.9199740642144),
      },
      {
        title: "근린몽마르뜨언덕위공원",
        latlng: new kakao.maps.LatLng(37.554798475356336, 126.91584333833079),
      },
    ];

    // 마커 이미지의 이미지 주소입니다
    const imageSrc =
      "https://media.discordapp.net/attachments/935903391253692419/947743102028906496/My_project_4.png?width=686&height=686";
    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(35, 40);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
  }, []);

  return (
    <div
      id="eatoMap"
      className="eato-map"
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
};

export default KakaoMap;
