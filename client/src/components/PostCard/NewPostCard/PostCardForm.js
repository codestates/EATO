import React, { useState } from "react";
import postLogo from "../../../images/Logo.png";
import { GrClose } from "react-icons/gr";
// import { HiPlusSm, HiMinusSm } from "react-icons/hi";

import "./PostCardForm.scss";

const PostCardForm = (props) => {
  const today = new Date().toISOString().slice(0, 10);
  const time = "00:00:00";
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("기타");
  const [enteredDeliveryFee, setEnteredDeliveryFee] = useState("");
  const [enteredTotalNum, setEnteredTotalNum] = useState("");
  const [enteredDate, setEnteredDate] = useState(today);
  const [enteredJoinTime, setEnteredJoinTime] = useState(time);
  // const [enteredStartTime, setEnteredStartTime] = useState(startSetTime);
  // const [enteredEndTime, setEnteredEndTime] = useState(endSetTime);
  const [enteredLocated, setEnteredLocated] = useState("");
  const [enteredDeliveryTag, setEnteredDeliveryTag] = useState("");
  const [enteredPayTag, setEnteredPayTag] = useState("");

  // const [postCardInput, setPostCardInput] = useState({
  //   enteredTitle: "",
  //   enteredDescription: "",
  //   enteredDeliveryFee: "",
  //   enteredDate: today,
  // enteredJoinTime: ""
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
    setEnteredDescription(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    const { value } = event.target;
    setEnteredCategory(value);
  };

  const categoryOptions = [
    { value: "기타", label: "Category 선택" },
    { value: "한식", label: "한식" },
    { value: "중식", label: "중식" },
    { value: "양식", label: "양식" },
    { value: "일식", label: "일식" },
    { value: "치킨", label: "치킨" },
    { value: "피자", label: "피자" },
    { value: "야식", label: "야식" },
    { value: "찜 / 탕", label: "찜 /탕" },
    { value: "족발 / 보쌈", label: "족발 / 보쌈" },
    { value: "카페 / 디저트", label: "카페 / 디저트" },
    { value: "기타", label: "기타" },
  ];
  // const dropDownChangeHandler = (event) => {
  //   props.onChangeFliter(event.target.value);
  // };

  const deliveryFeeChangeHandler = (event) => {
    setEnteredDeliveryFee(event.target.value);
  };

  const totalNumChangeHandler = (event) => {
    setEnteredTotalNum(event.target.value);
  };

  const joinTimeChangeHandler = (event) => {
    setEnteredJoinTime(event.target.value);
  };

  // const startTimeChangeHandler = (event) => {
  //   setEnteredStartTime(event.target.value);
  // };

  // const endTimeChangeHandler = (event) => {
  //   setEnteredEndTime(event.target.value);
  // };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const locatedChangeHandler = (event) => {
    setEnteredLocated(event.target.value);
  };

  const payTagChangeHandler = (event) => {
    setEnteredPayTag(event.target.value);
  };

  const deliveryTagChangeHandler = (event) => {
    setEnteredDeliveryTag(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const postCardData = {
      title: enteredTitle,
      category: enteredCategory,
      Description: enteredDescription,
      deliveryFee: enteredDeliveryFee,
      date: new Date(enteredDate),
      joinTime: enteredJoinTime,
      // startTime: enteredStartTime,
      // endTime: enteredEndTime,
      totalNum: enteredTotalNum,
      deliveryTag: enteredDeliveryTag,
      payTag: enteredPayTag,
    };

    props.onSavePostCardData(postCardData);
    setEnteredTitle("");
    setEnteredCategory("");
    setEnteredDescription("");
    setEnteredDeliveryFee("");
    setEnteredDate("");
    setEnteredJoinTime("");
    // setEnteredStartTime("");
    // setEnteredEndTime("");
    setEnteredTotalNum("");
    setEnteredDeliveryTag("");
    setEnteredPayTag("");
  };

  return (
    <form className="postLogoWrap" onSubmit={submitHandler}>
      <button className="postCard-close" onClick={toggleModal}>
        <GrClose />
      </button>
      <img src={postLogo} className="postLogo" alt="postLogo"></img>
      <div className="new-postCard">
        <div className="new-postCard__title">
          <input
            className="new-postCard__InputTitle"
            type="text"
            value={enteredTitle}
            maxLength="20"
            placeholder="모임 제목을 작성해주세요."
            onChange={titleChangeHandler}
          />
        </div>
        <section className="new-postCard__Main">
          <section className="new-postCard__Left">
            <div className="new-postCard__description">
              <input
                className="new-postCard__InputDescription"
                type="text"
                value={enteredDescription}
                maxLength="100"
                placeholder="모임에 대해 간략히 설명해주세요."
                onChange={commnetChangeHandler}
              />
            </div>

            <div className="new-postCard__category">
              <select
                className="new-postCard__InputCategory"
                value={enteredCategory}
                onChange={categoryChangeHandler}
              >
                {categoryOptions.map((enteredCategory) => (
                  <option value={enteredCategory.value}>
                    {enteredCategory.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="new-postCard__date">
              <input
                className="new-postCard__InputDate"
                type="date"
                value={enteredDate}
                onChange={dateChangeHandler}
              />
            </div>

            <div className="new-postCard__time">
              <input
                className="new-postCard__InputTime"
                type="time"
                value={enteredJoinTime}
                onChange={joinTimeChangeHandler}
              />
            </div>

            <div className="new-postCard__deliveryFee">
              <input
                className="new-postCard__InputDeliveryFee"
                type="number"
                placeholder="배달 비용"
                min="0"
                step="1000"
                value={enteredDeliveryFee}
                onChange={deliveryFeeChangeHandler}
              />
            </div>

            <div className="new-postCard__person">
              <input
                className="new-postCard__InputPerson"
                type="number"
                placeholder="참여 인원"
                min="2"
                step="1"
                value={enteredTotalNum}
                onChange={totalNumChangeHandler}
              />
            </div>
          </section>

          <section className="new-postCard__right">
            <div className="new-postCard__rightTop">
              <div className="new-postCard__postMap">
                <input
                  className="new-postCard__InputPostMap"
                  type="text"
                  value={enteredLocated}
                  placeholder="만날 장소를 입력해 주세요."
                  onChange={locatedChangeHandler}
                />
              </div>

              <div className="new-postCard__PayTag">
                <select
                  className="new-postCard__InputPayTag"
                  value={enteredPayTag}
                  onChange={payTagChangeHandler}
                >
                  <option className="new-postCard__options" value="선불">
                    선불
                  </option>
                  <option className="new-postCard__options" value="후불">
                    후불
                  </option>
                </select>
              </div>

              <div className="new-postCard__deliveryTag">
                <select
                  className="new-postCard__InputDeliveryTag"
                  value={enteredDeliveryTag}
                  onChange={deliveryTagChangeHandler}
                >
                  <option className="new-postCard__options" value="배달">
                    배달
                  </option>
                  <option className="new-postCard__options" value="포장">
                    포장
                  </option>
                </select>
              </div>
            </div>
            <div className="new-postCard__titleMap">주소</div>
            <div className="new-postCard__map">지도</div>
          </section>
        </section>
        <button className="new-postCard__actions" type="submit">
          등록하기
        </button>
      </div>
    </form>
  );
};

export default PostCardForm;
