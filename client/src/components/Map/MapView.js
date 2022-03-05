import React from "react";
import MapPageSearchBar from "../SearchBar/MapPageSearchBar";
import Nav from "../Nav/Nav";
import Maplist from "./MapList";
import KakaoMap from "./KakaoMap";
import "./MapView.scss";

const MapView = () => {
  return (
    <article className="mapPage__area">
      <section className="mapPage__header">
        <Nav />
        <MapPageSearchBar />
      </section>
      <section className="mapView__area">
        <div className="mapView__content">
          <div className="mapView__lists">{/* <Maplist /> */}</div>
        </div>
        <div className="mapView__map">
          <KakaoMap className="kakao__map" />
        </div>
      </section>
    </article>
  );
};

export default MapView;
