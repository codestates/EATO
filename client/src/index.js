import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import App from "./App";
import { RecoilRoot } from "recoil";
// recoil 상태를 사용하는 컴포넌트는 부모 트리 어딘가에 나타나는 RecoilRoot 가 필요하다.
// 루트 컴포넌트가 RecoilRoot를 넣기에 가장 좋은 장소다.

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById("root")
);