import axios from "axios";
const API_URL = "http://localhost:8000/api/";

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

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
