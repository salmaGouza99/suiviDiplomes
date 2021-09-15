import React, { useState, useEffect, initialState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Admin from './Pages/Admin';
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
                  location.pathname !== "/BureauOrdre" && location.pathname !== "/GuichetRetrait"
                  ? (<NotFound />) :
                  (<> {/* Routes for admin */}
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
                }/>
          </>)}
        </Switch>
      </div>
    </Router>

  );
}

export default App;
