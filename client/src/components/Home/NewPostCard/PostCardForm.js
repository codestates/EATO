import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
// import { HiPlusSm, HiMinusSm } from "react-icons/hi";

import "./PostCardForm.scss";

const PostCardForm = (props) => {
  const today = new Date().toISOString().slice(0, 10);
  const startSetTime = "00:00:00";
  const endSetTime = "12:00:00";

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredComment, setEnteredComment] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredDeliveryFee, setEnteredDeliveryFee] = useState("");
  const [enteredTotalNum, setEnteredTotalNum] = useState("");
  const [enteredDate, setEnteredDate] = useState(today);
  const [enteredStartTime, setEnteredStartTime] = useState(startSetTime);
  const [enteredEndTime, setEnteredEndTime] = useState(endSetTime);
  const [enteredLocated, setEnteredLocated] = useState("");

  // const [postCardInput, setPostCardInput] = useState({
  //   enteredTitle: "",
  //   enteredComment: "",
  //   enteredDeliveryFee: "",
  //   enteredDate: today,
  //   enteredStartTime: startSetTime,
  //   enteredEndTime: endSetTime,
  //   enteredLocated: ""
  // })

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    // setPostCardInput({
    //   ...postCardInput,
    //   enteredTitle: event.target.value,
    // });
    // or
    // setPostCardInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
  };

  const commnetChangeHandler = (event) => {
    setEnteredComment(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  // const dropDownChangeHandler = (event) => {
  //   props.onChangeFliter(event.target.value);
  // };

  const deliveryFeeChangeHandler = (event) => {
    setEnteredDeliveryFee(event.target.value);
  };

  const totalNumChangeHandler = (event) => {
    setEnteredTotalNum(event.target.value);
  };

  const startTimeChangeHandler = (event) => {
    setEnteredStartTime(event.target.value);
  };

  const endTimeChangeHandler = (event) => {
    setEnteredEndTime(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const locatedChangeHandler = (event) => {
    setEnteredLocated(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const postCardData = {
      title: enteredTitle,
      category: enteredCategory,
      deliveryFee: enteredDeliveryFee,
      date: new Date(enteredDate),
      startTime: enteredStartTime,
      endTime: enteredEndTime,
      totalNum: enteredTotalNum,
    };

    props.onSavePostCardData(postCardData);
    setEnteredTitle("");
    setEnteredCategory("");
    setEnteredDeliveryFee("");
    setEnteredDate("");
    setEnteredStartTime("");
    setEnteredEndTime("");
    setEnteredTotalNum("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="button-close" type="button" onClick={props.onCancel}>
        <GrClose />
      </div>
      <section>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <input
              type="text"
              value={enteredTitle}
              maxLength="20"
              placeholder="모임 제목을 작성해주세요."
              onChange={titleChangeHandler}
            />
          </div>

          <div className="new-expense__control">
            <input
              type="text"
              value={enteredComment}
              maxLength="100"
              placeholder="짧게 모임에 대해 설명해주세요."
              onChange={commnetChangeHandler}
            />
          </div>

          <div className="new-postCard__control">
            <select value={enteredCategory} onChange={categoryChangeHandler}>
              <option value="음식">음식</option>
              <option value="한식">한식</option>
              <option value="중식">중식</option>
              <option value="양식">양식</option>
              <option value="일식">일식</option>
              <option value="치킨">치킨</option>
              <option value="치킨">치킨</option>
              <option value="피자">피자</option>
              <option value="야식">야식</option>
              <option value="족박 / 보쌈">족발 / 보쌈</option>
              <option value="찜 / 탕">찜 / 탕</option>
              <option value="카페 / 디저트">카페 / 디저트</option>
            </select>
          </div>

          <div className="new-expense__control">
            <input
              type="date"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>

          <div className="new-expense__control">
            <input
              type="time"
              value={enteredStartTime}
              onChange={startTimeChangeHandler}
            />
            &nbsp;~&nbsp;
            <input
              type="time"
              value={enteredEndTime}
              onChange={endTimeChangeHandler}
            />
          </div>

          <div className="new-expense__control">
            <input
              type="number"
              placeholder="배달 비용"
              min="0"
              step="500"
              value={enteredDeliveryFee}
              onChange={deliveryFeeChangeHandler}
            />
          </div>

          <div className="new-expense__control">
            <input
              type="number"
              placeholder="참여 인원"
              min="2"
              step="1"
              value={enteredTotalNum}
              onChange={totalNumChangeHandler}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="new-expense__control">
          <input
            type="text"
            value={enteredLocated}
            placeholder="만날 장소를 입력해 주세요."
            onChange={locatedChangeHandler}
          />
        </div>
      </section>

      <div className="new-expense__actions">
        <button type="submit">등록하기</button>
      </div>
    </form>
  );
};

export default PostCardForm;
