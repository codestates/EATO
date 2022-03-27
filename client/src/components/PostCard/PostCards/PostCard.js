import React, { useState } from "react";
import PostCardItem from "./PostCardItem";
import NewPostCard from "../NewPostCard/NewPostCard";
import "./PostCard.scss";
import {
  CategoryFilter,
  CategoryfilterChart,
} from "../PostCardRead/CategoryFilter";

const PostCard = ({ data }) => {
  const [postCards, setPostCards] = useState([]);
  const [cateSelected, setCateSelected] = useState("전체");
  const [chartSelected, setChartSelected] = useState("최근등록순");

  const addPostCardHandler = (postCard) => {
    setPostCards((prevPostCards) => {
      return [postCard, ...prevPostCards];
    });
  };

  const filterCategory = data.filter((list) => {
    return list.category === cateSelected;
  });

  const filterListChart = data.filter((list) => {
    return list.category === chartSelected;
  });

  const fullLists = data.map((postCard) => {
    return (
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
    );
  });

  const filterLists = filterCategory.map((postCard) => {
    return (
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
    );
  });

  return (
    <div className="postCard">
      <div className="postCardWrap">
        <CategoryFilter options={cateSelected} setOptions={setCateSelected} />
        <div className="postCard-header">
          <CategoryfilterChart
            options={chartSelected}
            setOtions={setChartSelected}
          />
          <NewPostCard onAddPostCard={addPostCardHandler} />
        </div>
        <div className="postCard-lists">
          {cateSelected === "전체" ? (
            fullLists
          ) : filterLists.length === 0 ? (
            <div className="lists-empty">
              해당 모임이 없습니다. 모임을 만들어 보세요!
            </div>
          ) : (
            filterLists
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
