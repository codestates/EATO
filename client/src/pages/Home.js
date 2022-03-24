import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav/Nav";
import HomePageSearchBar from "../components/SearchBar/HomePageSearchBar";
import PostCard from "../components/PostCard/PostCards/PostCard";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/document").then((res) => {
      const posts = res.data.documentList;
      setPostData(posts);
    });
  }, []);

  return (
    <>
      <Nav />
      <HomePageSearchBar />
      <PostCard data={postData} />
      <Footer />
    </>
  );
};

export default Home;
