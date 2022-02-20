import React, { useState } from "react";
import Nav from "../components/Nav/Nav";
// import HomePost from "../components/Home/HomePost";
import HomePageSearchBar from "../components/Home/HomePageSearchBar";
import Footer from "../components/Footer/Footer1";
import NewPostCard from "../components/Home/NewPostCard/NewPostCard";
import PostCard from "../components/Home/PostCards/PostCard";

const DUMMY_POSTCARDS = [
  {
    id: "1",
    category: "카페 / 디저트",
    title: "빌리프커피로스터스",
    located: "서울특별시 연남동",
    deliveryFee: 4000,
    date: new Date(2022, 2, 14, 9, 24, 0),
    startTime: new Date(2022, 2, 14, 9, 24, 0),
    endTime: new Date(2022, 2, 14, 9, 24, 0),
    totalNum: 3,
    feeTag: "선불",
    deliveryTag: "배달",
  },
  {
    id: "2",
    category: "야식",
    title: "투다리",
    located: "서울특별시 연남동",
    deliveryFee: 5000,
    date: new Date(2022, 2, 12, 10, 10, 40),
    startTime: new Date(2022, 2, 12, 10, 10, 40),
    endTime: new Date(2022, 2, 12, 10, 10, 40),
    totalNum: 5,
    feeTag: "후불",
    deliveryTag: "포장",
  },
  {
    id: "3",
    category: "카페 / 디저트",
    title: "소디스에스프레소바",
    located: "서울특별시 연남동",
    deliveryFee: 2000,
    date: new Date(2022, 2, 28, 12, 40, 58),
    startTime: new Date(2022, 2, 28, 12, 40, 58),
    endTime: new Date(2022, 2, 28, 12, 40, 58),
    totalNum: 4,
    feeTag: "후불",
    deliveryTag: "배달",
  },
  {
    id: "4",
    category: "카페 / 디저트",
    title: "멜로우선샤인",
    located: "서울특별시 연남동",
    deliveryFee: 3000,
    date: new Date(2022, 5, 12, 16, 20, 20),
    startTime: new Date(2022, 5, 12, 16, 20, 20),
    endTime: new Date(2022, 5, 12, 16, 20, 20),
    totalNum: 6,
    feeTag: "선불",
    deliveryTag: "포장",
  },
];
const Home = () => {
  const [postCards, setPostCards] = useState(DUMMY_POSTCARDS);

  const addPostCardHandler = (postCard) => {
    setPostCards((prevPostCards) => {
      return [...prevPostCards, postCard];
    });
  };

  return (
    <>
      <Nav />
      <HomePageSearchBar />
      <div>
        <NewPostCard onAddPostCard={addPostCardHandler} />
        <PostCard items={postCards}></PostCard>
      </div>
      <Footer />
    </>
  );
};

export default Home;
