import React from "react";
import Nav from "../components/Nav/Nav";
import SearchBar from "../components/Home/HomePageSearch"
import HomePost from "../components/Home/HomePost"
import Footer from "../components/Footer/Footer";
// 0. Nav
// 1. 로고
// 2. 검색창
// 3. PostCard
// 4. Footer


function Home() {
  return (
    <>
      <Nav>Nav</Nav>
      <SearchBar>SearchBar</SearchBar>
      <HomePost>HomePost</HomePost>
      <Footer>Footer</Footer>
    </>
  );
}

export default Home;
