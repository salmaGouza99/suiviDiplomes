import React, { useState, useEffect, initialState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Acceuil from "./components/acceuils/Acceuil";
import DemandesGrid from "./components/demandes/DemandesGrid";
import UsersGrid from "./components/users/UsersGrid";
import FormsPage from "./components/formulaires/FormsPage";
import Profil from "./components/users/Profil";
import authService from "./services/authService";
import AdminAcceuil from './components/acceuils/AdminAcceuil';

function App() {
  const [user, setUser] = useState(initialState);
  const [role, setRole] = useState(initialState);

  useEffect(() => {
    const loggedInUser = authService.getCurrentUser();
    if (loggedInUser) {
      setUser(loggedInUser?.user);
      setRole(loggedInUser.user?.roles[0]?.id);
    }
    //console.log(loggedInUser);
  }, []); // an empty array to check if there's a logged in user the first time the app loads.
  
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route exact path="/" component={() => (<Login user={user} />)}/>
          { !user ? 
          (<> <Route component={() => (<Login user={user} />)}/> </>) 
          : 
          (<> {/* Routes for all users */}
              <Route exact path="/Acceuil" component={() => (<Acceuil/>)}/> 
              {/* <Route exact path="/Profil" component={() => (<Profil user={user} />)}/> */}
              {/* Routes for admin */}
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
              {/* Routes for guichets: arabe, francais et economie */}
              <Route exact path="/Demandes" component={() => 
                                (<DemandesGrid user={user} role={role} title={"demandes"}/>)}/>
          </>)}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
