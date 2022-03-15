import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav/Nav";
import HomePageSearchBar from "../components/SearchBar/HomePageSearchBar";
import PostCard from "../components/PostCard/PostCards/PostCard";
import Footer from "../components/Footer/Footer";

const Home = () => {
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
    <>
      <Nav />
      <HomePageSearchBar />
      <PostCard />
      <Footer />
    </>
  );
};

export default Home;
