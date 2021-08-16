import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/";

const login = (email, password) => {
  return axios
    .post(API_URL + "login", { email, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("logedOut", false);
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
  localStorage.setItem("logedOut", true);
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
