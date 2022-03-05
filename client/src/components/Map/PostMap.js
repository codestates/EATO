import React, { useEffect } from "react";
const { kakao } = window; // or /*global kakao */

const PostMap = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.558895633730444, 126.926793078452), // 지도의 중심좌표
      level: 7, // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const geocoder = new kakao.maps.servies.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(
      "서울 마포구 양화로11길 50",
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          const infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      }
    );
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
export default PostMap;
