import React, { useState, useEffect, initialState } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import AuthService from "../../Services/AuthService";

function Acceuil() {
  const history = useHistory();
  const [role, setRole] = useState(initialState);
  const [email, setEmail] = useState(initialState);

  //console.log(props);
  const handleLogout = () => {
    authService.logout();
    history.push("/");
  };

  useEffect(() => {
    const loggedInUser = authService.getCurrentUser();
    if (loggedInUser) {
      setRole(loggedInUser.user?.roles[0]?.id);
      setEmail(loggedInUser?.user?.email);
    }
  }, []);

  return (
    <div className="container" style={{ minWidth: "100%", maxHeight: "100%" }}>
      <div className="row">
        <div className="col-12">
          {role === 1 && <h1>hello admin: {email}</h1>}
          {role === 2 && <h1>hello guichet droit arabe: {email}</h1>}
        
        </div>
        <Button variant="contained"
          color="primary" 
          onClick={handleLogout}
        >
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}

export default Acceuil;