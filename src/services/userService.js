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


// Dashboard
const dashboardByType = (type) => {
  return axios.get( API_URL + `dashboard/type/${type}`, authHeaders() )
};
const filtredDashboard = (dateDebut ,dateFin ,type) => {
  return axios.get( API_URL + `dashboard/${dateDebut}/${dateFin}/${type}`, authHeaders() )
};
const dashboardCurrents = () => {
  return axios.get( API_URL + `dashboard/currents`, authHeaders() )
};
const dashboardCurrentYear = () => {
  return axios.get( API_URL + `dashboard/currentYear`, authHeaders() )
};


// Users
const getAllUsers = () => {
  return axios.get( API_URL + `users`, authHeaders() );
};
const addNewUser = (email, password, role) => {
    return axios.post( API_URL + "users", {email, password, role}, authHeaders() );
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


// Roles
const getAllRoles = () => {
  return axios.get( API_URL + "roles", authHeaders() );
};
const addNewRole = (name) => {
  return axios.post( API_URL + "roles", {name}, authHeaders() );
};
const showRole = (id) => {
  return axios.get( API_URL + `roles/${id}`, authHeaders() );
};
const updateRole = (id, name) => {
  return axios.put( API_URL + `roles/${id}`, {name}, authHeaders() );
};
const delateRole = (id) => {
  return axios.delete( API_URL + `roles/${id}`, authHeaders() );
};


// Forms
const getAllForms = () => {
  return axios.get( API_URL + `formulaires`, authHeaders() )
};
const updateForm = (formId, type_formulaire, lien, api_id) => {
  return axios.put( API_URL + `formulaires/${formId}`, {type_formulaire, lien, api_id}, authHeaders() )
};

// Etudiants 
const getAllEtudiants = () => {
  return axios.get( API_URL + "etudiants", authHeaders() )
};
const showEtudiant = (cin) => {
  return axios.get( API_URL + `etudiants/${cin}`, authHeaders() )
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
const getAllDiplomes = () => {
  return axios.get( API_URL + "diplomes", authHeaders() )
};
const showDiplome = (id) => {
  return axios.get( API_URL + `diplomes/${id}`, authHeaders() )
};
const statutsDiplomes = () => {
  return axios.get( API_URL + `statuts`, authHeaders() )
};
const updateDateSignature = (diplome) => {
  return axios.put( API_URL + `diplomes/signature/${diplome}`, {}, authHeaders() )
};
const updateDateReceptionParBureauOrdre = (diplome) => {
  return axios.put( API_URL + `diplomes/reception/${diplome}`, {}, authHeaders() )
};
const updateDateNotificationEtudiant = (diplome) => {
  return axios.put( API_URL + `diplomes/notif/${diplome}`, {}, authHeaders() )
};
const updateDateRetraitDiplomeArchiveDossier = (diplome) => {
  return axios.put( API_URL + `diplomes/retrait/${diplome}`, {}, authHeaders() )
};
const sendMail = (id) => {
  return axios.get( API_URL + `diplomes/mail/${id}`, authHeaders() )
};

const userService = {
    showProfil,
    updateProfil,
    filtredDashboard,
    dashboardCurrents,
    dashboardByType,
    dashboardCurrentYear,
    getAllUsers,
    addNewUser,
    showUser,
    updateUser,
    delateUser,
    getAllRoles,
    addNewRole,
    showRole,
    updateRole,
    delateRole,
    getAllForms,
    updateForm,
    getAllEtudiants,
    showEtudiant,
    getAllDemandes,
    nouvellesDemandes,
    filterDemandes,
    showDemande,
    CreerDossiers,
    getAllDiplomes,
    showDiplome,
    statutsDiplomes,
    updateDateSignature,
    updateDateReceptionParBureauOrdre,
    updateDateNotificationEtudiant,
    updateDateRetraitDiplomeArchiveDossier,
    sendMail,
};
export default userService;
  