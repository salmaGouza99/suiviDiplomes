import axios from "axios";
import authHeaders from "./authHeaders";

const API_URL = "http://localhost:8000/api/";

// profil
const getUserData = () => {
    return axios.get( API_URL + "profil", authHeaders() );
};

const updateUserData = () => {
    return axios.put( API_URL + "profil", authHeaders() );
};

// Demandes
const getAllDemandes = () => {
  return axios.get( API_URL + "demandes", authHeaders() )
};
const getNewDemandes = () => {
  console.log(authHeaders());
  return axios.post( API_URL + "demandes/nouvellesDemandes", authHeaders() )
};
const filterDemandes = (type, filiere) => {
  return axios.get( API_URL + `demandes/filter/${type},${filiere}`, authHeaders() )
};


const userService = {
    getUserData,
    updateUserData,
    getAllDemandes,
    getNewDemandes,
    filterDemandes,
};
export default userService;
  