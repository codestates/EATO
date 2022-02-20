import { atom } from "recoil";

const NavState = atom({
  key: 'IsClickedNoti',
  default: false,
});

export default NavState;