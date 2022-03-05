import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { FaMapMarkerAlt } from "react-icons/fa";
import PostCategory from "../PostCards/PostCategory";
import DropdownT from "../PostCards/DropDownT";
import PostMap from "../../Map/PostMap";
import postLogo from "../../../images/Logo.png";
import DeliveryPay from "../PostCards/DeliveryPay";
import CountPeople from "../PostCards/CountPeople";
import { categoryOptions, deOption, paOptions } from "../../../resource/datas";
import "./PostCardForm.scss";
import axios from "axios";
import PostAddress from "../../Map/PostAddress";

axios.defaults.withCredentials = true;

const PostCardForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredDeliveryFee, setEnteredDeliveryFee] = useState(0);
  const [enteredCurrentNum, setEnteredCurrentNum] = useState(1);
  const [enteredTotalNum, setEnteredTotalNum] = useState(1);
  const [enteredDate, setEnteredDate] = useState(new Date());
  const [enteredLocated, setEnteredLocated] = useState("");
  const [enteredDeliveryTag, setEnteredDeliveryTag] = useState("배달");
  const [enteredPayTag, setEnteredPayTag] = useState("선불");
  const [disabled, setDisabled] = useState("disabled");

  // const [postCardInput, setPostCardInput] = useState({
  //   enteredTitle: "",
  //   enteredDescription: "",
  //   enteredCategory: "",
  //   enteredDeliveryFee: 0,
  //   enteredCurrentNum: 1,
  //   enteredTotalNum: 1,
  //   enteredDeliveryTag: "배달",
  //   enteredDate: new Date(),
  //   enteredLocated: "",
  //   enteredPayTag: "선불",
  //   disabled: "disabled",
  // });

  useEffect(() => {
    disable();
  }, [
    enteredTitle,
    enteredCategory,
    enteredDescription,
    enteredDeliveryFee,
    enteredTotalNum,
    enteredCurrentNum,
  ]);

  const disable = () => {
    if (
      enteredTitle !== "" &&
      enteredCategory !== "" &&
      enteredDescription !== "" &&
      enteredDeliveryFee !== "" &&
      enteredTotalNum > enteredCurrentNum
    ) {
      setDisabled("");
    }
  };

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

  const locatedChangeHandler = (event) => {
    setEnteredLocated(event.target.value);
  };

  const getDayName = (date) => {
    return date.toLocaleDateString("ko-KR", { weekday: "long" }).substr(0, 1);
  };
  const createDate = (date) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
  };
  const config = {
    "Content-Type": "application/json",
    withCredentials: true,
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const postCardData = {
      title: enteredTitle,
      category: enteredCategory,
      description: enteredDescription,
      deliveryFee: enteredDeliveryFee,
      date: new Date(enteredDate),
      currentNum: enteredCurrentNum,
      totalNum: enteredTotalNum,
      located: enteredLocated,
      deliveryTag: enteredDeliveryTag,
      payTag: enteredPayTag,
    };

    props.onSavePostCardData(postCardData);
    setEnteredTitle("");
    setEnteredCategory("");
    setEnteredDescription("");
    setEnteredDeliveryFee("");
    setEnteredDate("");
    setEnteredCurrentNum("");
    setEnteredTotalNum("");
    setEnteredDeliveryTag("");
    setEnteredPayTag("");

    if (
      postCardData.title !== "" &&
      postCardData.description !== "" &&
      postCardData.category !== "" &&
      postCardData.totalNum > postCardData.currentNum &&
      postCardData.deliveryFee !== ""
    ) {
      axios
        .post(
          "http://localhost:3000/document",
          {
            title: postCardData.title,
            deliveryFee: postCardData.deliveryFee,
            currentNum: postCardData.currentNum,
            date: postCardData.date,
            totalNum: postCardData.totalNum,
            description: postCardData.description,
            category: postCardData.category,
          },
          config
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("모임이 등록되었습니다!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <form className="postLogoWrap" onSubmit={submitHandler}>
        <article className="new-postCard__Nav">
          <div className="postImgLogo">
            <img src={postLogo} className="postLogo" alt="postLogo"></img>
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
            <PostCategory
              options={categoryOptions}
              selected={enteredCategory}
              setSelected={setEnteredCategory}
              placeholder="분류"
            />
            {/* //todo datepicker plugin 나중에  css 작업 */}
            <div className="new-postCard__date">
              <DatePicker
                className="new-postCard__InputDate"
                selected={enteredDate}
                onChange={(date) => setEnteredDate(date)}
                showTimeSelect
                minDate={new Date()}
                locale={ko}
                dateFormat="yy. MM. dd. hh:mm"
                dateFormatCalendar={"yyyy. MM."}
                dayClassName={(date) =>
                  getDayName(createDate(date)) === "토"
                    ? "saturday"
                    : getDayName(createDate(date)) === "일"
                    ? "sunday"
                    : undefined
                }
              />
            </div>

            <DeliveryPay
              pay={enteredDeliveryFee}
              setPay={setEnteredDeliveryFee}
              placeholder="배달비용"
            />
            <CountPeople
              num={enteredTotalNum}
              setNum={setEnteredTotalNum}
              placeholder="참여인원"
            />
            <div className="new-postCard__tag">
              <DropdownT
                options={deOption}
                selected={enteredDeliveryTag}
                setSelected={setEnteredDeliveryTag}
              />
            </div>
            <div className="new-postCard__tag">
              <DropdownT
                options={paOptions}
                selected={enteredPayTag}
                setSelected={setEnteredPayTag}
              />
            </div>
          </section>
          <section className="new-postCard__right">
            <div className="new-postCard__postMap">
              <div
                className="new-postCard__InputPostMap"
                value={enteredLocated}
              >
                <PostAddress />
              </div>
              {/* <input
                className="new-postCard__InputPostMap"
                type="text"
                value={enteredLocated}
                placeholder="만날 장소를 입력해 주세요."
                onChange={locatedChangeHandler}
              /> */}
            </div>
            <div className="new-postCard__titleMap">
              <FaMapMarkerAlt size="1.4rem" color="#ff4234" />
              주소
            </div>
            <div className="new-postCard__map">
              <PostMap />
            </div>
          </section>
        </article>
        <article className="new-postCard__Fotter">
          {/* <button disabled={disabled} className="new-postCard__actions">
          등록하기
        </button> */}
          <button
            className="new-postCard__actions"
            type="submit"
            disabled={disabled}
          >
            등록하기
          </button>
        </article>
      </form>
    </>
  );
};

export default PostCardForm;
