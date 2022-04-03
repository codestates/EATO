import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import "./PostAddress.scss";

const PostAddress = (props) => {
  const [isAddress, setIsAddress] = useState("");
  const [isPostOpen, setIsPostOpen] = useState(false);
  const { onChange, onClose } = props;

  const handleComplete = (data) => {
    let fullAddress = data.address;
    localStorage.setItem("address", fullAddress);
    setIsPostOpen(!isPostOpen);
    setIsAddress(fullAddress);
  };

  return (
    <div className="popWrap">
      <div>
        <div>
          <div className="input-content">
            <DaumPostcode
              style={{ width: 250, height: 350 }}
              autoClose
              onComplete={handleComplete}
            />
          </div>
          <div className={isAddress !== "" ? "btn-content" : null}>
            {isAddress}
          </div>
          <div
            className="btn-pop"
            onClick={() => {
              onChange((prevState) => {
                return { ...prevState, located: isAddress };
              });
              onClose();
            }}
          >
            등록
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostAddress;
