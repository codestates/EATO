import React, { useState, useEffect } from "react";
import MapItem from "./MapItem";
import { DUMMY_POSTCARDS } from "../../../resource/datas";
import "./MapCard.scss";

const MapCard = () => {
  const [mapCards, setMapCards] = useState(DUMMY_POSTCARDS);

  // const addPostCardHandler = (mapCard) => {
  //   setMapCards((prevPostCards) => {
  //     return [mapCard, ...prevPostCards];
  //   });
  // };

  return (
    <div className="map">
      <div className="mapWrap">
        <div className="mapCards">
          {mapCards.map((mapCard) => (
            <MapItem
              _id={mapCard.id}
              category={mapCard.category}
              description={mapCard.description}
              title={mapCard.title}
              date={mapCard.date}
              joinTime={mapCard.joinTime}
              deliveryFee={mapCard.deliveryFee}
              totalNum={mapCard.totalNum}
              currentNum={mapCard.currentNum}
              located={mapCard.located}
              latitude={mapCard.latitude}
              longitude={mapCard.longitude}
              deliveryTag={mapCard.deliveryTag}
              payTag={mapCard.payTag}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapCard;
