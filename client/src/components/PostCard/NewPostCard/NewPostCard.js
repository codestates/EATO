import React, { useState } from "react";
import PostCardForm from "./PostCardForm";
import { IoClose } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import "./NewPostCard.scss";

const NewPostCard = (props) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    localStorage.removeItem("address");
  };

  const savePostCardDataHandler = (enteredPostCardData) => {
    const postCardData = {
      ...enteredPostCardData,
      id: Math.random().toString(),
    };

    props.onAddPostCard(postCardData);
    setModal(false);
  };

  return (
    <div className="NewPostCard">
      <button onClick={toggleModal} className="btn-modal">
        <FaPencilAlt />
        &nbsp;글작성
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="postClose-btn">
              <button
                className="postCard-close"
                data-backdrop="static"
                data-keyboard="false"
                onClick={toggleModal}
              >
                <IoClose />
              </button>
            </div>
            <PostCardForm onSavePostCardData={savePostCardDataHandler} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPostCard;
