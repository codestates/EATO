import React, { useState } from "react";
import axios from "axios";
import PostCardItem from "./PostCardItem";
import NewPostCard from "../NewPostCard/NewPostCard";
import { DUMMY_POSTCARDS } from "../../../resource/datas";
import "./PostCard.scss";

const PostCard = () => {
  const [postCards, setPostCards] = useState(DUMMY_POSTCARDS);

  const addPostCardHandler = (postCard) => {
    setPostCards((prevPostCards) => {
      return [postCard, ...prevPostCards];
    });
  };

  const config = {
    "Content-Type": "application/json",
    withCredentials: false,
  };

  const axiosTest = async () => {
    return (
      await axios.get("http://localhost:27017/poset"),
      config.then((res) => {
        // console.log(res.data);
      })
    );
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
              joinTime={postCard.joinTime}
              deliveryFee={postCard.deliveryFee}
              totalNum={postCard.totalNum}
              currentNum={postCard.currentNum}
              located={postCard.located}
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
