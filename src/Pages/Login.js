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
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import authService from "../Services/authService";
import { makeStyles } from '@material-ui/core/styles';
import imgBackground from "../Images/FSJES_Agdal.png";
import imageLogo from "../Images/logo.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Suivi de Diplômes '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${imgBackground})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    //filter: "brightness(50%)",
  },
  root: {
    maxWidth: 400,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  loading: {
    marginBottom: -theme.spacing(3),
    marginTop: theme.spacing(2),
    color: '#0268B5',
  },
  alert: {
    marginBottom: -theme.spacing(7),
    marginTop: theme.spacing(3),
    textAlign: 'center'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  img: {
    width: 70,
    height: 70,
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0),
    background: '#0268B5',
    '&:hover': {
      background: "#3A7BAF",
    },
    color: '#FFFFFF'
  },
}));

export default function Login(props) {
  // States
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    const loggedOut = authService.getLoggedOutValue();
    // test if the user is loggedout, we show him the content of the login page
    if(loggedOut === true) {
      console.log("logout");
    // else we redirect him to her appropriate page
    } else if (props?.user) {
      history.push(props?.role === 1 ? "/Admin" :
                   props?.role === 2 || props?.role === 3 || props?.role === 4 ? "/GuichetScolarite" :
                   props?.role === 5 ? "/ServiceDiplomes" :
                   props?.role === 6 ? "/Decanat" : 
                   props?.role === 7 ? "BureauOrdre" : "/GuichetRetrait");
    }
  });

  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password?.length < 5) {
      setError("Mot de passe doit contenir au minimum 5 caractères");
    } else {
      setError("");
    }
  };
  // show and hide the password
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage(error ? "Mot de passe invalid." : "");
    if (error) {
      setMessage("Mot de passe invalid.");
    } else {
      setLoading(true);
      setDisable(true);
      setMessage("");
      authService.login(email, password, checked).then(
        (response) => {
          // test if the credentials are true, we redirect the user to her appropriate page as axplained above
          if (!response.msgError) {
            window.location.reload();
          // else we show him the error message
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

  // handle the possibility of stay signed in
  const handleRemember = (event) => {
    setChecked(event.target.checked);
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
                <img alt="logo" src={imageLogo} className={classes.img} />
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
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                      control={<Checkbox checked={checked}
                                onChange={handleRemember} 
                                style={{ color: "#0268B5" }} />}
                      label="Rester connecté"
                      onclick={handleRemember}
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