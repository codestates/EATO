import React, { useEffect } from "react";
const { kakao } = window; // or /*global kakao */

const KakaoMap = () => {
  useEffect(() => {
    // 지도를 표시할 div
    const mapContainer = document.getElementById("eatoMap");

    // 지도의 옵션 설정
    const mapOption = {
      // 지도 중심 좌표 latitude, longitude
      center: new kakao.maps.LatLng(37.552304095917314, 126.9139941978578),
      // 지도의 확대 레벨
      lever: 5,
    };

    // 지도를 표시할 div와 지도 욥션으로 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커가 표시될 위치입니다
    const markerPosition = mapOption.center;

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map: map,
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    const iwContent = "<div>Hello World!</div>"; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    // iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다 마크 표시 위치와 중복되므로 필수 x

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      // position: iwPosition,
      content: iwContent,
    });
    kakao.maps.event.addListener(marker, "click", function () {
      // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
      infowindow.open(map, marker);
    });
    kakao.maps.event.addListener(marker, "mouseover", function () {
      // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
      infowindow.open(map, marker);
    });

    // 마커에 마우스아웃 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "mouseout", function () {
      // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
      infowindow.close();
    });
  }, []);

  return (
    <div>
      <div id="eatoMap" style={{ width: "97rem", height: "43rem" }}></div>
    </div>
  );
};

export default KakaoMap;
