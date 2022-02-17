import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loadingWrapper">
      <div className="ring">
        Loading
        <div className="loadingSpan"></div>
      </div>
    </div>
  );
};

export default Loading;
