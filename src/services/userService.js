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
const updateEtudiant = (old_cin, cin, apogee, cne, nom, prenom, nom_arabe, prenom_arabe, filiere, option,
                        nationalite, date_naiss, lieu_naiss) => {
  return axios.put( API_URL + `etudiants/${old_cin}`, {cin, apogee, cne, nom, prenom, nom_arabe,
                        prenom_arabe, filiere, option, nationalite, date_naiss, lieu_naiss}, authHeaders() )
}; 


// Demandes
const getAllDemandes = () => {
  return axios.get( API_URL + "demandes", authHeaders() )
};
const nouvellesDemandes = (filiere) => {
  return axios.post( API_URL + `demandes/nouvellesDemandes/${filiere}`, {}, authHeaders() )
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
const statutsDiplomes = () => {
  return axios.get( API_URL + `statuts`, authHeaders() )
};
const showDiplome = (id) => {
  return axios.get( API_URL + `diplomes/${id}`, authHeaders() )
};
const updateDateReedition = (diplome, type_erreur) => {
  return axios.put( API_URL + `diplomes/reedition/${diplome}`, {type_erreur}, authHeaders() )
};
const updateDateImpression = (id) => {
  return axios.put( API_URL + `diplomes/impression/${id}` ,{}, authHeaders() );
};
const updateDateSignature = (diplome) => {
  return axios.put( API_URL + `diplomes/signature/${diplome}`, {}, authHeaders() )
};
const updateDateEnvoiApresidence = (id) => {
  return axios.put( API_URL + `diplomes/envoiPresidence/${id}` ,{}, authHeaders() );
};
const updateDateReceptionParBureauOrdre = (diplome) => {
  return axios.put( API_URL + `diplomes/reception/${diplome}`, {}, authHeaders() )
};
const sendMail = (id) => {
  return axios.get( API_URL + `diplomes/mail/${id}`, authHeaders() )
};
const updateDateNotificationEtudiant = (diplome) => {
  return axios.put( API_URL + `diplomes/notif/${diplome}`, {}, authHeaders() )
};
const updateDateRetraitDiplomeArchiveDossier = (diplome) => {
  return axios.put( API_URL + `diplomes/retrait/${diplome}`, {}, authHeaders() )
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
    getAllForms,
    updateForm,
    getAllEtudiants,
    showEtudiant,
    updateEtudiant,
    getAllDemandes,
    nouvellesDemandes,
    showDemande,
    CreerDossiers,
    getAllDiplomes,
    statutsDiplomes,
    showDiplome,
    updateDateReedition,
    updateDateImpression,
    updateDateSignature,
    updateDateEnvoiApresidence,
    updateDateReceptionParBureauOrdre,
    sendMail,
    updateDateNotificationEtudiant,
    updateDateRetraitDiplomeArchiveDossier,
};
export default userService;
  