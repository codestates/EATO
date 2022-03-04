import { atom } from "recoil";
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist();

export const userNickname = atom({
  key: 'nicknameState',
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userLocation = atom({
  key: 'locationState',
  default: "",
  effects_UNSTABLE: [persistAtom],
});
