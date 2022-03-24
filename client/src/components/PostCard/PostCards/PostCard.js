import React, { useState } from "react";
import PostCardItem from "./PostCardItem";
import NewPostCard from "../NewPostCard/NewPostCard";
import "./PostCard.scss";
import CategoryFilter from "../PostCardRead/CategoryFilter";

const PostCard = ({ data }) => {
  const [postCards, setPostCards] = useState([]);
  console.log("axios data", data);

  const addPostCardHandler = (postCard) => {
    setPostCards((prevPostCards) => {
      return [postCard, ...prevPostCards];
    });
  };

  const postLists = data.map((postCard) => (
    <PostCardItem
      key={postCard._id}
      id={postCard._id}
      category={postCard.category}
      description={postCard.description}
      title={postCard.title}
      date={postCard.date}
      deliveryFee={postCard.deliveryFee}
      totalNum={postCard.totalNum}
      currentNum={postCard.currentNum}
      located={postCard.located}
      deliveryTag={postCard.deliveryTag}
      payTag={postCard.payTag}
    />
  ));

  return (
    <div className="postCard">
      <CategoryFilter />
      <NewPostCard onAddPostCard={addPostCardHandler} />
      <div className="postCardWrap">
        <div className="postCards">{postLists}</div>
      </div>
    </div>
  );
};

export default PostCard;
