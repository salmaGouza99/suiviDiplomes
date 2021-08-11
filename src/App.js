import React, { useState, useEffect, initialState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Acceuil from "./Components/Interfaces/Acceuil";
import Paperbase from "./Components/Demandes/Paperbase";
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
          (<> <Route exact path="/Acceuil" component={() => (<Acceuil/>)}/> 
              <Route exact path="/Demandes" component={() => (<Paperbase user={user} role={role} />)}/>
          </>)}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
