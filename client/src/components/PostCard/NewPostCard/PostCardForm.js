import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { IoClose } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcClock, FcPlanner } from "react-icons/fc";
import PostCategory from "../PostCards/PostCategory";
import DropdownT from "../PostCards/DropDownT";
import postLogo from "../../../images/Logo.png";
import DeliveryPay from "../PostCards/DeliveryPay";
import CountPeople from "../PostCards/CountPeople";
import "./PostCardForm.scss";

const PostCardForm = (props) => {
  // const time = "00:00";
  // const chooeseCategory = "Category";

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  // console.log(watch("password"));

  // // passwordCheck (비밀번호 확인)에서 사용됨
  // const password = useRef();
  // password.current = watch("password");

  // const onSubmit = (data) => {
  //   console.log("data", data);
  // };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const categoryOptions = [
    "한식",
    "중식",
    "양식",
    "일식",
    "치킨",
    "피자",
    "야식",
    "찜 / 탕",
    "족발 / 보쌈",
    "카페 / 디저트",
    "기타",
  ];

  const deliveryTagOptions = ["배달", "포장"];
  const payTagOptions = ["선불", "후불"];

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredDeliveryFee, setEnteredDeliveryFee] = useState(0);
  const [enteredTotalNum, setEnteredTotalNum] = useState(1);
  const [enteredDate, setEnteredDate] = useState(new Date());
  const [enteredJoinTime, setEnteredJoinTime] = useState();
  const [enteredLocated, setEnteredLocated] = useState("");
  const [enteredDeliveryTag, setEnteredDeliveryTag] = useState("배달");
  const [enteredPayTag, setEnteredPayTag] = useState("선불");

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

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const deliveryFeeChangeHandler = (event) => {
    setEnteredDeliveryFee(event.target.value);
  };

  const joinTimeChangeHandler = (event) => {
    setEnteredJoinTime(event.target.value);
  };

  const locatedChangeHandler = (event) => {
    setEnteredLocated(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const postCardData = {
      title: enteredTitle,
      category: enteredCategory,
      description: enteredDescription,
      deliveryFee: enteredDeliveryFee,
      date: new Date(enteredDate),
      joinTime: enteredJoinTime,
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
    setEnteredTotalNum("");
    setEnteredDeliveryTag("");
    setEnteredPayTag("");
  };

  return (
    <form className="postLogoWrap" onSubmit={submitHandler}>
      <article className="new-postCard__Nav">
        <div className="postImgLogo">
          <img src={postLogo} className="postLogo" alt="postLogo"></img>
        </div>
        <div className="postClose-btn">
          <button className="postCard-close" onClick={toggleModal}>
            <IoClose />
          </button>
        </div>
      </article>

      <article className="new-postCard__Header">
        <section className="new-postCard__title">
          <input
            className="new-postCard__InputTitle"
            type="text"
            value={enteredTitle}
            maxLength="20"
            placeholder="모임 제목을 작성해주세요."
            onChange={titleChangeHandler}
          />
        </section>
      </article>

      <article className="new-postCard__Body">
        <section className="new-postCard__Left">
          <div className="new-postCard__description">
            <input
              className="new-postCard__InputDescription"
              type="text"
              value={enteredDescription}
              maxLength="100"
              placeholder="모임에 대해 간략히 설명해주세요."
              onChange={descriptionChangeHandler}
            />
          </div>
          {/* <div className="new-postCard__category"> */}
          <PostCategory
            options={categoryOptions}
            selected={enteredCategory}
            setSelected={setEnteredCategory}
          />
          {/* </div> */}

          {/* //todo datepicker plugin 나중에  css 작업 */}
          <div className="new-postCard__date">
            <DatePicker
              className="new-postCard__InputDate"
              selected={enteredDate}
              onChange={(date) => setEnteredDate(date)}
              enteredDate={enteredDate}
              minDate={new Date()}
              locale={ko}
              FcPlanner
              dateFormat="yyyy년 MM월 dd일"
              dateFormatCalendar={"yyyy년 MM월"}
            />
          </div>

          <div className="new-postCard__time">
            <input
              className="new-postCard__InputTime"
              value={enteredJoinTime}
              placeholder="시간입니다"
              onChange={joinTimeChangeHandler}
            />
          </div>

          {/* <div className="new-postCard__deliveryFee"> */}
          <DeliveryPay
            pay={enteredDeliveryFee}
            setPay={setEnteredDeliveryFee}
          />
          {/* </div> */}
          {/* <div className="new-postCard__person"> */}
          <CountPeople num={enteredTotalNum} setNum={setEnteredTotalNum} />
          {/* </div> */}

          <div className="new-postCard__tag">
            <div className="deliveryTag">
              <DropdownT
                options={deliveryTagOptions}
                selected={enteredDeliveryTag}
                setSelected={setEnteredDeliveryTag}
              />
            </div>
            <div className="payTag">
              <DropdownT
                options={payTagOptions}
                selected={enteredPayTag}
                setSelected={setEnteredPayTag}
              />
            </div>
          </div>
        </section>

        <section className="new-postCard__right">
          <div className="new-postCard__postMap">
            <input
              className="new-postCard__InputPostMap"
              type="text"
              value={enteredLocated}
              placeholder="만날 장소를 입력해 주세요."
              onChange={locatedChangeHandler}
            />
          </div>

          <div className="new-postCard__titleMap">
            <FaMapMarkerAlt size="1.2rem" />
            주소
          </div>
          <div className="new-postCard__map">지도</div>
        </section>
      </article>

      <article className="new-postCard__Fotter">
        <button className="new-postCard__actions" type="submit">
          &nbsp;등록하기
        </button>
      </article>
    </form>
  );
};

export default PostCardForm;
