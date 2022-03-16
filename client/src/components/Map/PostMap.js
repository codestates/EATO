import React, { useEffect } from "react";
const { kakao } = window; // or /*global kakao */

const PostMap = (props) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(
        props.address.latitude,
        props.address.longitude
      ),
      level: 5,
    };
    const makerName = props.address.title;
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
    const markerPosition = mapOption.center;

    const marker = new kakao.maps.Marker({
      map: map,
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);

    const iwContent =
      `<div style= "text-indent:0.5rem">` + `${makerName}` + `</div>`;

    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
    });

    kakao.maps.event.addListener(marker, "mouseover", function () {
      infowindow.open(map, marker);
    });

    kakao.maps.event.addListener(marker, "mouseout", function () {
      infowindow.close();
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
export default PostMap;
