import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PostCategory from "../PostCards/PostCategory";
import postLogo from "../../../images/Logo.png";
import DeliveryPay from "../PostCards/DeliveryPay";
import CountPeople from "../PostCards/CountPeople";
import { DeliveryTag, PayTag } from "../PostCards/DropdownTag";
import {
  categoryOptions,
  deliTagName,
  payTagName,
} from "../../../resource/datas";
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
    located: " ",
    deliveryTag: "수령방법",
    payTag: "지불방법",
  });

  const [disabled, setDisabled] = useState("disabled");
  const [popUp, setPopUp] = useState(false);

  const disable = useCallback(() => {
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
  }, [cardInput]);

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

  const dateChangeHandler = (date) => {
    setCardInput((prevState) => {
      return { ...prevState, date: date };
    });
  };

  const popUpHandler = () => {
    setPopUp(!popUp);
  };

  const alertHandler = () => {
    alert("모임이 등록되었습니다!");
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
    const strDate = String(cardInput.date);
    const postCardData = {
      title: cardInput.title,
      category: cardInput.category,
      description: cardInput.description,
      deliveryFee: cardInput.deliveryFee,
      date: strDate,
      currentNum: cardInput.currentNum,
      totalNum: cardInput.totalNum,
      located: cardInput.located,
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
          `${process.env.REACT_APP_API_URL}/document`,
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
          },
          config
        )
        .then((res) => {
          console.log(res, "등록완료");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    disable();
  }, [disable, cardInput]);

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
              maxLength="16"
              placeholder="모임 제목을 작성해주세요."
              onChange={titleChangeHandler}
            />
          </section>
        </article>
        <article className="new-postCard__Body">
          <section className="new-postCard__Left">
            <div className="new-postCard__description">
              <textarea
                className="new-postCard__InputDescription"
                type="text"
                value={cardInput.description}
                maxLength="43"
                placeholder="모임에 대해 설명해주세요."
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
                onChange={dateChangeHandler}
                locale={ko}
                showTimeSelect
                timeIntervals={15}
                minDate={new Date()}
                dateFormat="yy. MM. dd. HH.mm"
                dateFormatCalendar={"yyyy. MM."}
                dayClassName={(date) =>
                  getDayName(createDate(date)) === "토"
                    ? "saturday"
                    : getDayName(createDate(date)) === "일"
                    ? "sunday"
                    : undefined
                }
                // popperModifiers={{
                //   preventOverflow: { enabled: true },
                // }} // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
                // popperPlacement="auto" // popUP 화면 중앙 위치
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
                options={deliTagName}
                selected={cardInput.deliveryTag}
                setSelected={setCardInput}
              />
            </div>
            <div className="new-postCard__tag">
              <PayTag
                options={payTagName}
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
              <MapPreview addres={cardInput.located} />
            </div>
          </section>
        </article>
        <article className="new-postCard__Fotter">
          <button
            className="new-postCard__actions"
            type="submit"
            disabled={disabled}
            onClick={alertHandler}
          >
            등록하기
          </button>
          {disabled === "disabled" ? (
            <div className="btn-disalbe">
              모든 항목을 입력해야 등록버튼이 활성화됩니다.
            </div>
          ) : null}
        </article>
      </form>
    </>
  );
};

export default PostCardForm;
