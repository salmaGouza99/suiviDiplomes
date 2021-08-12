import axios from "axios";
import authHeaders from "./authHeaders";

const API_URL = "http://localhost:8000/api/";

// User
const addNewUser = (email, password, role) => {
    return axios.post( API_URL + "users", {email, password, role}, authHeaders() );
};
const searchUser = (searchItem) => {
    return axios.get( API_URL + `users/search/${searchItem}`, authHeaders() );
};
const filterUser = (roleFilter) => {
    return axios.get( API_URL + `users/role/${roleFilter}`, authHeaders() );
};
const showUser = (id) => {
    return axios.get( API_URL + `users/${id}`, authHeaders() );
};
const updateUser = (idUser, email, password, role) => {
    return axios.put( API_URL + `users/${idUser}`, {email, password, role}, authHeaders() );
};
const delateUser = (id) => {
    return axios.delete( API_URL + `users/${id}`, authHeaders() );
};
const getAllRoles = () => {
    return axios.get( API_URL + "roles", authHeaders() );
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

// Forms
const getAllForms = () => {
  return axios.get( API_URL + `formulaires`, authHeaders() )
};
const updateForm = (formId, type_formulaire, lien, api_id) => {
  return axios.put( API_URL + `formulaires/${formId}`, {type_formulaire, lien, api_id}, authHeaders() )
};

const userService = {
    getAllDemandes,
    getNewDemandes,
    filterDemandes,
    getAllForms,
    updateForm,
    addNewUser,
    searchUser,
    filterUser,
    showUser,
    updateUser,
    delateUser,
    getAllRoles,
};
export default userService;
  