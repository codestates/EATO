import { atom } from "recoil";
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist();

const SignInState = atom({
  key: 'SignInState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default SignInState;