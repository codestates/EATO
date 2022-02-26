import React, { useState } from "react";
import PostCardItem from "./PostCardItem";
import NewPostCard from "../NewPostCard/NewPostCard";
import "./PostCard.scss";

const DUMMY_POSTCARDS = [
  {
    id: "1",
    category: "카페 / 디저트",
    title: "빌리프커피로스터스",
    description: "여기는 descriptions가 들어갑니다.",
    located: "서울특별시 연남동",
    deliveryFee: 4000,
    date: new Date(2022, 2, 14, 9, 24, 0),
    joinTime: new Date(2022, 2, 14, 9, 24, 0),
    startTime: new Date(2022, 2, 14, 9, 24, 0),
    endTime: new Date(2022, 2, 14, 9, 24, 0),
    totalNum: 3,
    payTag: "선불",
    deliveryTag: "배달",
  },
  {
    id: "2",
    category: "야식",
    title: "투다리",
    description: "여기는 descriptions가 들어갑니다.",
    located: "서울특별시 연남동",
    deliveryFee: 5000,
    date: new Date(2022, 2, 12, 10, 10, 40),
    joinTime: new Date(2022, 2, 12, 10, 10, 40),
    startTime: new Date(2022, 2, 12, 10, 10, 40),
    endTime: new Date(2022, 2, 12, 10, 10, 40),
    totalNum: 5,
    payTag: "후불",
    deliveryTag: "포장",
  },
  {
    id: "3",
    category: "카페 / 디저트",
    title: "소디스에스프레소바",
    description: "여기는 descriptions가 들어갑니다.",
    located: "서울특별시 연남동",
    deliveryFee: 2000,
    date: new Date(2022, 2, 28, 12, 40, 58),
    joinTime: new Date(2022, 2, 28, 12, 40, 58),
    startTime: new Date(2022, 2, 28, 12, 40, 58),
    endTime: new Date(2022, 2, 28, 12, 40, 58),
    totalNum: 4,
    payTag: "후불",
    deliveryTag: "배달",
  },
  {
    id: "4",
    category: "카페 / 디저트",
    title: "멜로우선샤인",
    description: "여기는 descriptions가 들어갑니다.",
    located: "서울특별시 연남동",
    deliveryFee: 3000,
    date: new Date(2022, 5, 12, 16, 20, 20),
    joinTime: new Date(2022, 5, 12, 16, 20, 20),
    startTime: new Date(2022, 5, 12, 16, 20, 20),
    endTime: new Date(2022, 5, 12, 16, 20, 20),
    totalNum: 6,
    payTag: "선불",
    deliveryTag: "포장",
  },
];

const PostCard = () => {
  const [postCards, setPostCards] = useState(DUMMY_POSTCARDS);

  const addPostCardHandler = (postCard) => {
    setPostCards((prevPostCards) => {
      return [postCard, ...prevPostCards];
    });
  };

  return (
    <div className="postCard">
      <NewPostCard onAddPostCard={addPostCardHandler} />
      <div className="postCardWrap">
        <div className="postCards">
          {postCards.map((postCard) => (
            <PostCardItem
              key={postCard.id}
              category={postCard.category}
              description={postCard.description}
              title={postCard.title}
              date={postCard.date}
              joinTime={postCard.date}
              deliveryFee={postCard.deliveryFee}
              totalNum={postCard.totalNum}
              // located={postCard.located}
              deliveryTag={postCard.deliveryTag}
              payTag={postCard.payTag}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
