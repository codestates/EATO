import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const kakaoUser = atom({
  key: "kakaoUser",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
