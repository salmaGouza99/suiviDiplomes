import axios from "axios";
const API_URL = "http://localhost:8000/";


const login = (email, password) => {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
          console.log(response);
        // if (response.data) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        // }
        // return response.data;
      });
  };
  const authService = {
    login,
  };
  
  export default authService;
  