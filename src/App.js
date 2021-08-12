import React, { useState, useEffect, initialState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Acceuil from "./Components/Interfaces/Acceuil";
import DemandesGrid from "./Components/Demandes/DemandesGrid";
import UsersGrid from "./Components/Users/UsersGrid";
import FormsPage from "./Components/formulaires/FormsPage";
import Profil from "./Components/Users/Profil";
import authService from "./Services/authService";

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
              <Route exact path="/Profil" component={() => (<Profil user={user} />)}/>
              {/* Routes for admin */}
              <Route exact path="/Users" component={() => (<UsersGrid role={role} />)}/>
              <Route exact path="/Forms" component={() => (<FormsPage role={role} />)}/>
              {/* Routes for guichets: arabe, francais et economie */}
              <Route exact path="/Demandes" component={() => (<DemandesGrid user={user} role={role} />)}/>
          </>)}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
