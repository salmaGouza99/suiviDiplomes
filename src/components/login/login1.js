import React, { useState} from 'react';
import axios from 'axios';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import img from "../../img.jpg";
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    backgroundColor: 'rgba(255,255,255,0.8)',
    
  },
  image:{
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: "no-repeat",
   
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0),
  },
}));

export default function Login() {

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmail =(e) =>{
      setEmail(e.target.value);
      
  };
  const handlePassword =(e) =>{
      setPassword(e.target.value);
      
  };
  const handleLogin = (e) =>{
      e.preventDefault();
      console.log('Login');
      axios.post("http://127.0.0.1:8000/api/login", {email,password})
      .then((response) => {
          console.log(response)
      }).catch(err =>{
          console.log(err)
      })
};

  return (
 <div className={classes.image}>
  <Grid   container
          direction="row"
          justifyContent="center"
          alignItems="center"
          >

    <Card className={classes.root}>
    <CardContent >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ExitToAppIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
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
                placeholder="Email *"
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
                }}
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Password *"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Se souvenir de moi"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
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