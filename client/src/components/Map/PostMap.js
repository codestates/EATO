import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
const PostMap = () => {
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [isPostOpen, setIsPostOpen] = useState(true);

  const handleComplete = (data) => {
    console.log(data); // postCardform 으로 보내줘야함.
    console.log(fullAddress); // postCardform 으로 보내줘야함.
    console.log(extraAddress); // postCardform 으로 보내줘야함.
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    setIsPostOpen(false);
  };

  return (
    <div className="actInput-content">
      <DaumPostcode
        className="postCodeStyle"
        autoClose
        onComplete={handleComplete}
      />
    </div>
  );
};

export default PostMap;
