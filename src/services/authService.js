import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/";

const login = (email, password, checked) => {
  localStorage.setItem("remember", checked);
  return axios
    .post(API_URL + "login", { email, password })
    .then((response) => {
      if (response.data.accessToken) {
          checked ? localStorage.setItem("user", JSON.stringify(response.data)) :
                    sessionStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("loggedOut", false);
          localStorage.setItem("index", '0');
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  localStorage.setItem("loggedOut", true);
  localStorage.removeItem("remember");
  localStorage.removeItem("index");
};

const getCurrentUser = () => {
  if(JSON.parse(localStorage.getItem("remember")) === true) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return JSON.parse(sessionStorage.getItem("user"));
  }
};

const getLoggedOutValue = () => {
  return JSON.parse(localStorage.getItem("loggedOut"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
  getLoggedOutValue
};

export default authService;
