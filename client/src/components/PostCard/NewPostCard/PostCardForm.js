import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCategory from "../PostCards/PostCategory";
import postLogo from "../../../images/Logo.png";
import DeliveryPay from "../PostCards/DeliveryPay";
import CountPeople from "../PostCards/CountPeople";
import { DeliveryTag, PayTag } from "../PostCards/DropdownTag";
import { categoryOptions, deOption, paOptions } from "../../../resource/datas";
import PostAddress from "../../Map/PostAddress";
import MapPreview from "../../Map/MapPreview";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./PostCardForm.scss";

const PostCardForm = (props) => {
  const [cardInput, setCardInput] = useState({
    title: "",
    description: "",
    category: "",
    deliveryFee: 0,
    currentNum: 1,
    totalNum: 1,
    date: new Date(),
    located: "",
    latitude: 0,
    longitude: 0,
    deliveryTag: "수령방법",
    payTag: "지불방법",
  });
  const [disabled, setDisabled] = useState("disabled");
  const [popUp, setPopUp] = useState(false);

  const disable = () => {
    if (
      cardInput.title !== "" &&
      cardInput.description !== "" &&
      cardInput.category !== "" &&
      cardInput.totalNum > cardInput.currentNum &&
      cardInput.deliveryFee !== 0 &&
      cardInput.deliveryTag !== "수령방법" &&
      cardInput.payTag !== "지불방법" &&
      cardInput.located !== ""
    ) {
      setDisabled("");
    }
  };

  const titleChangeHandler = (event) => {
    setCardInput((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const descriptionChangeHandler = (event) => {
    setCardInput((prevState) => {
      return { ...prevState, description: event.target.value };
    });
  };

  const popUpHandler = () => {
    setPopUp(!popUp);
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
  axios.defaults.withCredentials = true;

  const submitHandler = async (event) => {
    event.preventDefault();

    const postCardData = {
      title: cardInput.title,
      category: cardInput.category,
      description: cardInput.description,
      deliveryFee: cardInput.deliveryFee,
      date: new Date(cardInput.date),
      currentNum: cardInput.currentNum,
      totalNum: cardInput.totalNum,
      located: cardInput.located,
      latitude: cardInput.latitude,
      longitude: cardInput.longitude,
      deliveryTag: cardInput.deliveryTag,
      payTag: cardInput.payTag,
    };

    props.onSavePostCardData(postCardData);
    setCardInput();

    if (
      postCardData.title !== "" &&
      postCardData.description !== "" &&
      postCardData.category !== "" &&
      postCardData.totalNum > postCardData.currentNum &&
      postCardData.deliveryFee !== 0 &&
      postCardData.deliveryTag !== "수령방법" &&
      postCardData.payTag !== "지불방법" &&
      postCardData.located !== ""
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
            deliveryTag: postCardData.deliveryTag,
            payTag: postCardData.payTag,
            located: postCardData.located,
            latitude: postCardData.latitude,
            longitude: postCardData.longitude,
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

  useEffect(() => {
    disable();
  }, [cardInput]);

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
              value={cardInput.title}
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
                value={cardInput.description}
                maxLength="100"
                placeholder="모임에 대해 간략히 설명해주세요."
                onChange={descriptionChangeHandler}
              />
            </div>
            <PostCategory
              options={categoryOptions}
              selected={cardInput.category}
              setSelected={setCardInput}
            />

            <div className="new-postCard__date">
              <DatePicker
                className="new-postCard__InputDate"
                selected={cardInput.date}
                onChange={(date) =>
                  setCardInput((prevState) => {
                    return { ...prevState, date: date };
                  })
                }
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
              pay={cardInput.deliveryFee}
              setPay={setCardInput}
              placeholder="배달비용"
            />
            <CountPeople
              num={cardInput.totalNum}
              setNum={setCardInput}
              placeholder="참여인원"
            />
            <div className="new-postCard__tag">
              <DeliveryTag
                options={deOption}
                selected={cardInput.deliveryTag}
                setSelected={setCardInput}
              />
            </div>
            <div className="new-postCard__tag">
              <PayTag
                options={paOptions}
                selected={cardInput.payTag}
                setSelected={setCardInput}
              />
            </div>
          </section>
          <section className="new-postCard__right">
            <div className="new-postCard__postMap">
              <input
                className="new-postCard__InputPostMap"
                placeholder="만날 장소 검색해보세요!"
                onClick={popUpHandler}
                readOnly
              />
              {popUp ? (
                <PostAddress onClose={setPopUp} onChange={setCardInput} />
              ) : null}
            </div>
            <div className="new-postCard__titleMap">
              <FaMapMarkerAlt size="1.4rem" color="#ff4234" />
              {cardInput.located}
            </div>
            <div className="new-postCard__map">
              <MapPreview
                addres={cardInput.located}
                lat={setCardInput}
                lon={setCardInput}
              />
            </div>
          </section>
        </article>
        <article className="new-postCard__Fotter">
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
