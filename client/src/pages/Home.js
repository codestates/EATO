import React from "react";
import Nav from "../components/Nav/Nav";
import HomePageSearchBar from "../components/SearchBar/HomePageSearchBar";
import PostCard from "../components/PostCard/PostCards/PostCard";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Nav />
      <HomePageSearchBar />
      <PostCard />
      <Footer />
    </>
  );
};

export default Home;
