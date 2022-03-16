import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import PostCardForm from "../PostCard/NewPostCard/PostCardForm";
import "./PostAddress.scss";

const PostAddress = (props) => {
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [isPostOpen, setIsPostOpen] = useState(false);
  const { onClose } = props;

  const handleComplete = (data) => {
    const addProps = data;
    let fullAddress = data.address;
    localStorage.setItem("address", fullAddress);
    // let extraAddress = "";

    // if (data.addressType === "R") {
    //   if (data.bname !== "") {
    //     extraAddress += data.bname;
    //   }
    //   if (data.buildingName !== "") {
    //     extraAddress +=
    //       extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    //   }
    //   fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    setIsZoneCode(data.zonecode);
    setIsPostOpen(true);
    setIsAddress(fullAddress);
  };
  const test = localStorage.getItem("address");
  useEffect(() => {
    localStorage.getItem("address");
  }, [test]);

  return (
    <div className="popWrap">
      <div className="popContent">
        <div className="btnPop-box">
          <div
            className="btnPop"
            onClick={() => {
              onClose();
            }}
          >
            닫기
          </div>
          <div className="input-content">
            <DaumPostcode
              className="postCodeStyle"
              autoClose
              onComplete={handleComplete}
            ></DaumPostcode>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostAddress;
