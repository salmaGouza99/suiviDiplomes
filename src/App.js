import React, { useState, useEffect, initialState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Admin from './Pages/Admin';
import AdminAcceuil from './Pages/AdminAcceuil';
import GuichetScolarite from './Pages/GuichetScolarite';
import ServiceDiplomes from './Pages/ServiceDiplomes';
import Decanat from './Pages/Decanat';
import BureauOrdre from './Pages/BureauOrdre';
import GuichetRetrait from './Pages/GuichetRetrait';
import NotFound from './Pages/NotFound';
import authService from "./Services/authService";

function App() {
  const [user, setUser] = useState(initialState);
  const [role, setRole] = useState(initialState);

  useEffect(() => {
    // localStorage.removeItem("user");
    const loggedInUser = authService.getCurrentUser();
    if (loggedInUser) {
      setUser(loggedInUser?.user);
      setRole(loggedInUser.user?.roles[0]?.id);
    }
  }, []); // an empty array to check if there's a logged in user the first time the app loads.

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* The route of login */}
          <Route exact path="/" component={() => (<Login user={user} role={role} />)} />
          
          { !user ?
            (<> <Route component={() => (<Login user={user} role={role} />)} /> </>)
            :
            (<> <Route
                render={({ location }) =>
                  location.pathname !== "/Admin" && location.pathname !== "/GuichetScolarite" &&
                  location.pathname !== "/ServiceDiplomes" && location.pathname !== "/Decanat" &&
                  location.pathname !== "/BureauOrdre" && location.pathname !== "/GuichetRetrait" &&
                  location.pathname !== "/Users" && location.pathname !== "/Forms" &&
                  location.pathname !== "/DiplomesEnCoursDeTraitement" && 
                  location.pathname !== "/DiplomesRetires" && 
                  location.pathname !== "/DemandesEnAttente"
                  && location.pathname !== "/Statistiques" && location.pathname !== "/Profil"
                  ? (<NotFound />) :
                  (<> {/* Routes for admin */}
                    {/* <Route exact path="/Admin" component={() =>
                                    (<AdminAcceuil title="Acceuil" role={role} />)} />
                    <Route exact path="/Users" component={() =>
                                    (<AdminAcceuil openUser={true} title="Utilisateurs" user ={user} role={role} />)} />
                    <Route exact path="/Forms" component={() =>
                                    (<AdminAcceuil openForms={true} title="Formulaires" role={role} />)} />
                    <Route exact path="/DemandesEnAttente" component={() =>
                                    (<AdminAcceuil openDemandes={true} title="Demandes en attente" role={role} />)} />
                    <Route exact path="/DiplomesEnCoursDeTraitement" component={() =>
                                    (<AdminAcceuil openDiplomesTraitement={true} title="Diplômes en cours de traitement" role={role} />)} />
                    <Route exact path="/DiplomesRetires" component={() =>
                                    (<AdminAcceuil openDiplomesArchives={true} title="Diplômes retirés" role={role} />)} />
                    <Route exact path="/Statistiques" component={() =>
                                    (<AdminAcceuil openDashboard={true} title="Statistiques" role={role} />)} />
                    <Route exact path="/Profil" component={() =>
                                    (<AdminAcceuil openProfil={true} title="Profil Personnel" role={role} />)} />
                    */}
                    <Route exact path="/DiplomesEnCoursDeTraitement" component={() =>
                (<AdminAcceuil openDiplomesTraitement={true} title="DiplomesEnCoursDeTraitement" role={role} />)} />
                    {/* The route of admin */}
                    <Route exact path="/Admin" component={() => (<Admin user={user} role={role}/>)}/>
                    {/* The route of guichets: arabe, francais et economie */}
                    <Route exact path="/GuichetScolarite" component={() => (<GuichetScolarite role={role} />)} />
                    {/* The route of service de diplomes */}
                    <Route exact path="/ServiceDiplomes" component={() => (<ServiceDiplomes role={role} />)} />
                    {/* The route of decanat */}
                    <Route exact path="/Decanat" component={() => (<Decanat role={role} />)} />
                    {/* The route of bureau d'ordre */}
                    <Route exact path="/BureauOrdre" component={() => (<BureauOrdre role={role} />)} />
                    {/* The route of guichet de retrait */}
                    <Route exact path="/GuichetRetrait" component={() => (<GuichetRetrait role={role} />)} />
                  </>)
                } />
            </>)}
        </Switch>
      </div>
    </Router>

  );
}

export default App;
