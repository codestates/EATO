import React, { useState } from "react";
import PostCardDate from "./PostCardDate";
import PostCardTime from "./PostCardTime";
import PostCardCheck from "../PostCardRead/PostCardCheck";
import "./PostCardItem.scss";

const PostCardItem = (props) => {
  console.log("Home화면에 있는 post카드 컴퍼넌트에서 받는 props", props);

  const [isClick, setIsClick] = useState(false);

  const handleCardClick = () => {
    setIsClick(!isClick);
  };

  // 리턴값으로 모달 수정창 props 값 다 가지고 있도록 추가하기
  // 삼항 연산자를 통해 안보이게 설정하기 ? 여기서 더미데이터를 가지고 있는데 클릭시 왜 안보이게 해야하지? 체크
  // 클릭이벤트시 더미데이터 줄 수 있을 듯!!!!!! Home에서 더미데이터를 가지고 있는게 아님! 체크할것
  // 오늘 아침 전까지 끝내고 지도가즈아!
  //(isClick ? true : false)

  return (
    <div className="postCard-item" onClick={handleCardClick}>
      {isClick && (
        <div className="modal">
          <div onClick={setIsClick} className="overlay"></div>
          <div className="modal-content">
            <PostCardCheck posts={props} />
          </div>
        </div>
      )}
      <div className="postCard-item__left">
        <div className="postCard-item__leftListC">{props.category}</div>
        <div className="postCard-item__leftListT">{props.title}</div>
        <div className="postCard-item__leftListL">
          {props.located}
          {"지도 설정하면 들어가는 자리"}
        </div>
        <div className="postCard-item__leftListD">{props.deliveryFee}원</div>
      </div>
      <div className="postCard-item__center">
        <PostCardDate date={props.date} />
      </div>
      <div className="postCard-item__right">
        <div className="postCard-item__listN">1 / {props.totalNum}</div>
        {/* 삼항연잔자 !== 모집중 사용할것 */}
        <div className="postCard-item__listState">모집중</div>
        <PostCardTime
          className="postCard-item__listTime"
          date={props.joinTime}
        />
        <div className="postCard-item__Tag">
          <div className="postCard-item__payTag">{props.payTag}</div>
          <div className="postCard-item__deliveryTag">{props.deliveryTag}</div>
        </div>
      </div>
    </div>
  );
};

export default PostCardItem;
