import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import Map from "./pages/Map";
import ChatRoom from "./pages/ChatRoom";
function App() {
  const [documentData, setDocumentData] = useState(null);

  const render = async () => {
    await axios
      .get("http://localhost:3000/document")
      .then((res) => setDocumentData(res.data.documentList));
  };

  useEffect(() => {
    render();
    console.log("ddd", documentData);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chatroom" element={<ChatRoom />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
