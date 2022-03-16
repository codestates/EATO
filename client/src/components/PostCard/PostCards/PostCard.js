import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCardItem from "./PostCardItem";
import NewPostCard from "../NewPostCard/NewPostCard";
import { DUMMY_POSTCARDS } from "../../../resource/datas";
import "./PostCard.scss";

const PostCard = () => {
  const [postCards, setPostCards] = useState(DUMMY_POSTCARDS);
  const config = {
    "Content-Type": "application/json",
    withCredentials: true,
  };
  const addPostCardHandler = (postCard) => {
    axios.get("http://localhost:3000/document", {
      postCards: postCards,
    });
    setPostCards((prevPostCards) => {
      return [postCard, ...prevPostCards];
    });
  };

  useEffect(() => {
    window.localStorage.setItem("postCards", JSON.stringify(postCards));
  }, [postCards]);

  return (
    <div className="postCard">
      <NewPostCard onAddPostCard={addPostCardHandler} />
      <div className="postCardWrap">
        <div className="postCards">
          {postCards.map((postCard) => (
            <PostCardItem
              _id={postCard.id}
              category={postCard.category}
              description={postCard.description}
              title={postCard.title}
              date={postCard.date}
              joinTime={postCard.joinTime}
              deliveryFee={postCard.deliveryFee}
              totalNum={postCard.totalNum}
              currentNum={postCard.currentNum}
              located={postCard.located}
              latitude={postCard.latitude}
              longitude={postCard.longitude}
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
