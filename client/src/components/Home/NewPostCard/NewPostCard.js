import React, { useState } from "react";
import PostCardForm from "./PostCardForm";
import "./NewPostCard.scss";

const NewPostCard = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const savePostCardDataHandler = (enteredPostCardData) => {
    const postCardData = {
      ...enteredPostCardData,
      id: Math.random().toString(),
    };
    props.onAddPostCard(postCardData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-postCard">
      {!isEditing && <button onClick={startEditingHandler}>글쓰기</button>}
      {isEditing && (
        <PostCardForm
          onSavePostCardData={savePostCardDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewPostCard;
