import { atom } from "recoil";
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist();

const LoginState = atom({
  key: 'IsLoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default LoginState;