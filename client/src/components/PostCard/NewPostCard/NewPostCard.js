import React, { useState } from "react";
import PostCardForm from "./PostCardForm";
import "./NewPostCard.scss";

const NewPostCard = (props) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const savePostCardDataHandler = (enteredPostCardData) => {
    const postCardData = {
      ...enteredPostCardData,
      id: Math.random().toString(),
    };

    props.onAddPostCard(postCardData);
    setModal(false);
  };

  const stopEditingHandler = () => {
    setModal(false);
  };

  return (
    <div class="NewPostCard">
      <button onClick={toggleModal} className="btn-modal">
        글쓰기
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <PostCardForm
              onSavePostCardData={savePostCardDataHandler}
              onCancel={stopEditingHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPostCard;
