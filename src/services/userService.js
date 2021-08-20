import axios from "axios";
import authHeaders from "./authHeaders";

const API_URL = "http://127.0.0.1:8000/api/";


// Profil 
const showProfil = () => {
  return axios.get( API_URL + "profil", authHeaders() );
};
const updateProfil = (email, password, role) => {
  return axios.put( API_URL + "profil", {email, password, role}, authHeaders() );
};


// Users
const addNewUser = (email, password, role) => {
    return axios.post( API_URL + "users", {email, password, role}, authHeaders() );
};
const getAllUsers = () => {
    return axios.get( API_URL + `users`, authHeaders() );
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


// Forms
const getAllForms = () => {
  return axios.get( API_URL + `formulaires`, authHeaders() )
};
const updateForm = (formId, type_formulaire, lien, api_id) => {
  return axios.put( API_URL + `formulaires/${formId}`, {type_formulaire, lien, api_id}, authHeaders() )
};



//Diplomes
const getAllDiplomes = () => {
  return axios.get( API_URL + `diplomes`, authHeaders() )
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
const getAllDiplomes = () => {
  return axios.get( API_URL + "diplomes", authHeaders() )
};
const showDiplome = (id) => {
  return axios.get( API_URL + `diplomes/${id}`, authHeaders() )
}

const statutsDiplomes = () => {
  return axios.get( API_URL + `statuts`, authHeaders() )
}

const dashboardByType = (type) => {
  return axios.get( API_URL + `dashboard/type/${type}`, authHeaders() )
}
};


const filtredDashboard = (dateDebut ,dateFin ,type) => {
  return axios.get( API_URL + `dashboard/${dateDebut}/${dateFin}/${type}`, authHeaders() )
}

const dashboardCurrents = () => {
  return axios.get( API_URL + `dashboard/currents`, authHeaders() )
}

const dashboardCurrentYear = () => {
  return axios.get( API_URL + `dashboard/currentYear`, authHeaders() )
}




const userService = {
    showProfil,
    updateProfil,
    addNewUser,
    getAllUsers,
    filterUser,
    showUser,
    updateUser,
    delateUser,
    getAllRoles,
    getAllForms,
    updateForm,
    getAllDemandes,
    nouvellesDemandes,
    filterDemandes,
    showDemande,
    CreerDossiers,
    getAllDiplomes,
    showDiplome,
    statutsDiplomes,
    filtredDashboard,
    dashboardCurrents,
    dashboardByType,
    dashboardCurrentYear,

    
};
export default userService;
  