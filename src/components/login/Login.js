import React, { useState, useEffect, initialState } from 'react';
import { useHistory } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from "@material-ui/core/CircularProgress";
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKeyRounded';
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import authService from "../../Services/authService";
import useStyles from "./LoginStyle"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Suivi de Diplômes '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login(props) {

  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("logedOut")) === false && props?.user) {
      history.push("/Acceuil");
      window.location.reload();
    }
  });

  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);

  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password?.length < 6) {
      setError("Mot de passe doit contenir au minimum 6 caractères");
    } else {
      setError("");
    }
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();
    const emailx = email?.toLowerCase();
    setMessage(error ? "Mot de passe invalid." : "");
    //console.log('Login: ', emailx, password);
    if (error) {
      setMessage("Mot de passe invalid.");
    } else {
      setLoading(true);
      setDisable(true);
      setMessage("");
      authService.login(emailx, password).then(
        (response) => {
          if (!response.msgError) {
            history.push("/Acceuil");
            window.location.reload();
          } else {
            setLoading(false);
            setDisable(false);
            setMessage(response.msgError);
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setDisable(false);
          setMessage(resMessage);
        }
      );
    }
  };

  return (
    <div className={classes.image}>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Card className={classes.root}>
          <CardContent >
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              {loading && (
                <div align='center' >
                  <CircularProgress className={classes.loading} />
                </div>
              )}
              {message && (
                <Alert className={classes.alert}
                  severity="error"
                  onClose={() => {
                    setMessage(null);
                  }}
                >
                  {message}
                </Alert>
              )}
              <div className={classes.paper}>
                <img alt="logo" src="../../logo.png" className={classes.img} />
                <Typography component="h1" variant="h5" >
                  Se connecter
                </Typography>
                <form className={classes.form} onSubmit={handleLogin} >
                  <TextField
                    onChange={handleEmail}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    placeholder="Identifiant *"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    onChange={handlePassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    placeholder="Mot de passe *"
                    id="password"
                    visible="true"
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    error={Boolean(error)}
                    helperText={error}
                  />
                  <div align='center' >
                    <FormControlLabel
                      control={<Checkbox value="remember" style={{ color: "#0268B5" }} />}
                      label="Se souvenir de moi"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={disable}
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                  >
                    Se connecter
                  </Button>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}