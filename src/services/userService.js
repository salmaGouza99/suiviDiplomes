import axios from "axios";
import AuthHeaders from "./AuthHeaders";

const API_URL = "http://127.0.0.1:8000/api/";

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
const nouvellesDemandes = (filiere) => {
  return axios.post( API_URL + `demandes/nouvellesDemandes/${filiere}`, {}, authHeaders() )
};
const filterDemandes = (type, filiere) => {
  return axios.get( API_URL + `demandes/filter/${type},${filiere}`, authHeaders() )
};
const showDemande = (id) => {
  return axios.get( API_URL + `demandes/${id}`, authHeaders() )
};

// Diplomes
const CreerDossiers = (demandeId) => {
  return axios.post( API_URL + `diplomes/${demandeId}`, {}, authHeaders() )
};

// Forms
const getAllForms = () => {
  return axios.get( API_URL + `formulaires`, authHeaders() )
};
const updateForm = (formId, type_formulaire, lien, api_id) => {
  return axios.put( API_URL + `formulaires/${formId}`, {type_formulaire, lien, api_id}, authHeaders() )
};



//Diplomes
const getAllDiplomes = (searchItem) => {
  return axios.get( API_URL + `diplomes/search/${searchItem}`, authHeaders() )
};

const showDiplome = (id) => {
  return axios.get( API_URL + `diplomes/${id}`, authHeaders() )
}

const diplomesByDates= (dateDebut,dateFin) => {
  return axios.get( API_URL + `diplomes/dates/${dateDebut}/${dateFin}`, authHeaders() )
}

const diplomesByType = (type) => {
  return axios.get( API_URL + `diplomes/type/${type}`, authHeaders() )
}

const UserService = {
    getAllDemandes,
    nouvellesDemandes,
    filterDemandes,
    showDemande,
    getAllForms,
    updateForm,
    addNewUser,
    searchUser,
    filterUser,
    showUser,
    updateUser,
    delateUser,
    getAllRoles,
    CreerDossiers,
    getAllDiplomes,
    showDiplome,
    diplomesByDates,
    diplomesByType,
};
export default UserService;
  