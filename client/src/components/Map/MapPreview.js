import React, { useEffect } from "react";
const { kakao } = window; // or /*global kakao */

const MapPreview = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.552304095917314, 126.9139941978578),
      level: 5,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const images =
      "https://media.discordapp.net/attachments/935903391253692419/947743102028906496/My_project_4.png?width=686&height=686";
    const imageSize = new kakao.maps.Size(40, 50);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };
    const markerImage = new kakao.maps.MarkerImage(
      images,
      imageSize,
      imageOption
    );

    const address = localStorage.getItem("address");
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result, status) {
      console.log("주소야 : ", address);
      console.log(typeof address);
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: markerImage,
        });

        const markerPosition = mapOption.center;

        marker.setMap(map);

        const iwContent = "<div>&nbsp;</div>";
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });

        kakao.maps.event.addListener(marker, "mouseover", function () {
          infowindow.open(map, marker);
        });

        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });
      }
    });
  }, []);

  return (
    <div className="postmap">
      <div
        id="map"
        style={{
          width: "18rem",
          height: "21.5rem",
          borderRadius: "1rem",
        }}
      />
    </div>
  );
};
export default MapPreview;
