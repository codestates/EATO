import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import Map from "./pages/Map";
import ChatRoom from "./pages/ChatRoom";
import RedirectKakao from "../src/components/OAuth/RedirectKakao";
import RedirectNaver from "../src/components/OAuth/RedirectNaver";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/kakao" element={<RedirectKakao />} />
        <Route path="/naver" element={<RedirectNaver />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
