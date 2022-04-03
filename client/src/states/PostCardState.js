import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const CardState = atom({
  key: "CardState",
  default: {
    _id: "",
    title: "",
    description: "",
    category: "",
    date: new Date(),
    deliveryFee: 0,
    currentNum: 1,
    totalNum: 1,
    deliveryTag: "수령방법",
    payTag: "지불방법",
    located: "",
    latitude: "",
    longitude: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  effects_UNSTABLE: [persistAtom],
});

export default CardState;
