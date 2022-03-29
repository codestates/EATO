import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PostCardItem from "./PostCardItem";
import NewPostCard from "../NewPostCard/NewPostCard";
import "./PostCard.scss";
import {
  CategoryFilter,
  CategoryfilterChart,
} from "../PostCardRead/CategoryFilter";

const PostCard = () => {
  const [postCards, setPostCards] = useState([]);
  const [cateSelected, setCateSelected] = useState("전체");
  const [chartSelected, setChartSelected] = useState("등록순");

  const addPostCardHandler = useCallback((postCard) => {
    setPostCards((prevPostCards) => {
      return [...prevPostCards, postCard];
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/document").then((res) => {
      const posts = res.data.documentList;
      setPostCards(posts);
    });
  }, [cateSelected, addPostCardHandler]);

  const filterCategory = postCards.filter((list) => {
    return list.category === cateSelected;
  });

  const fullLists = postCards.map((postCard) => {
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
        creatorId={postCard.creatorId}
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
    <article className="postCard">
      <section className="postCardWrap">
        <CategoryFilter options={cateSelected} setOptions={setCateSelected} />
        <div className="postCard-header">
          <CategoryfilterChart
            options={chartSelected}
            setOtions={setChartSelected}
          />
          <NewPostCard onAddPostCard={addPostCardHandler} />
        </div>
        <div className="postCard-lists">
          {cateSelected === "전체" && fullLists}
          {filterLists.length !== 0 && filterLists}
        </div>
        {cateSelected !== "전체" && filterLists.length === 0 && (
          <div className="lists-empty">
            <div className="lists-emptyA">해당 모임이 없습니다.</div>
            <div className="lists-emptyB">모임을 만들어 보세요!</div>
          </div>
        )}

        {/* {cateSelected === "전체" ? (
            fullLists
          ) : filterLists.length === 0 ? (
            <div className="lists-empty">
              <div className="lists-emptyA">해당 모임이 없습니다.</div>
              <div className="lists-emptyB">모임을 만들어 보세요!</div>
            </div>
          ) : (
            filterLists
          )} */}
      </section>
    </article>
  );
};

export default PostCard;
