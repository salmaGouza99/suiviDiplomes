import React, { useState, useEffect, initialState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import authService from "./Services/authService";
import AdminAcceuil from './components/Interfaces/AdminAcceuil';
import GuichetScolarite from './components/Interfaces/GuichetScolarite';
import ServiceDiplomes from './components/Interfaces/ServiceDiplomes';
import Decanat from './components/Interfaces/Decanat';
import BureauOrdre from './components/Interfaces/BureauOrdre';
import GuichetRetrait from './components/Interfaces/GuichetRetrait';

function App() {
  const [user, setUser] = useState(initialState);
  const [role, setRole] = useState(initialState);

  useEffect(() => {
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
          <Route exact path="/" component={() => (<Login user={user} role={role}/>)}/>
          { !user ? 
          (<> <Route component={() => (<Login user={user} role={role}/>)}/> </>) 
          : 
          (<> {/* Routes for admin */}
              <Route exact path="/Admin" component={() => 
                              (<AdminAcceuil title="Acceuil" role={role} />)}/>
              <Route exact path="/Users" component={() => 
                              (<AdminAcceuil openUser={true} title="Utilisateurs" role={role}/>)}/>
              <Route exact path="/Forms" component={() => 
                              (<AdminAcceuil openForms={true} title="Formulaires" role={role}/>)}/>
              <Route exact path="/Diplomes" component={() => 
                              (<AdminAcceuil openDiplomes={true} title="Diplomes" role={role}/>)}/>
              <Route exact path="/Profil" component={() => 
                              (<AdminAcceuil openProfil={true} title="Profil Personnel" role={role}/>)}/>


              {/* The route of admin */}
              {/* <Route exact path="/Admin" component={() => (<Admin role={role}/>)}/> */}
              {/* The route of guichets: arabe, francais et economie */}
              <Route exact path="/GuichetScolarite" component={() => (<GuichetScolarite role={role}/>)}/>
              {/* The route of service de diplomes */}
              <Route exact path="/ServiceDiplomes" component={() => (<ServiceDiplomes role={role}/>)}/>
              {/* The route of decanat  */}
              <Route exact path="/Decanat" component={() => (<Decanat role={role}/>)}/>
              {/* The route of bureau d'ordre */}
              <Route exact path="/BureauOrdre" component={() => (<BureauOrdre role={role}/>)}/>
              {/* The route of guichet de retrait*/}
              <Route exact path="/GuichetRetrait" component={() => (<GuichetRetrait role={role}/>)}/>
          </>)}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
