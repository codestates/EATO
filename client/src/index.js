import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import App from "./App";
import { RecoilRoot } from "recoil";
// recoil 상태를 사용하는 컴포넌트는 부모 트리 어딘가에 나타나는 RecoilRoot 가 필요하다.
// 루트 컴포넌트가 RecoilRoot를 넣기에 가장 좋은 장소다.

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
