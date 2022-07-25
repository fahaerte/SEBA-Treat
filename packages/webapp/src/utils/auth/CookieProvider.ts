import Cookies from "universal-cookie";

export const setCookie = (cookieName: string, cookieValue: string) => {
  const cookies = new Cookies();
  cookies.set(cookieName, cookieValue);
};

export const getCookie = (cookieName: string) => {
  const cookies = new Cookies();
  return cookies.get(cookieName);
};

export const removeCookies = () => {
  const cookies = new Cookies();
  cookies.remove("address");
  cookies.remove("userId");
};
