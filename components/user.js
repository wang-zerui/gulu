import Cookies from "js-cookie";

const loginUserPhone = () => {
  return Cookies.get("phone");
};

const isLogin = () => {
  // TODO
  // 这里之后写自动登录逻辑
  if (loginUserPhone() === undefined) {
    return false;
  } else {
    return true;
  }
};

const logout = () => {
  Cookies.remove("phone");
};

export { loginUserPhone, isLogin, logout };
