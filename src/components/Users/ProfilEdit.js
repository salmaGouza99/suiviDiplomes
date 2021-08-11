import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import img from "../../img.jpg";
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from "@material-ui/lab/Alert";
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';


const API_URL = "http://127.0.0.1:8000/api/";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,

  },
  media: {
    height: 80,
    backgroundImage: 'url(https://source.unsplash.com/random)',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(10),
  },
  container: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
}));





export default function ProfilEdit(props) {
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState('');
  const [role, setRole] = useState('');
  const [idUser, setIdUser] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    setOpen(props.handleOpen);
    props.user ? setRole(props.user.role) : setRole('');
    props.user ? setEmail(props.user.email) : setEmail('');
    props.user ? setIdUser(props.user.id) : setIdUser('');
    props.handleOpen ? setOpen(props.handleOpen) : setOpen(false);
    // props.roles ? setRoles(props.roles) : setRoles([]);


  }, []);


  ///////////////////////////////////////////
  const handleRole = (e) => {
    setRole(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (email.length < 8) {
      setErrors({ ...errors, email: "Minimum : 6 caractères" });
    }
    else {
      setErrors({ ...errors, email: null });
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
    if (password?.length < 7) {
      setErrors({ ...errors, password: "Le mot de passe doit dépasser 7 caractères" });
    } else {
      setErrors({ ...errors, password: null });
    }

  }



  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    console.log(passwordConfirm);

  }



  const handleClose = (e) => {
    window.location.reload();
    // setOpen(false)
  }
  /////////////////////////////////////////

  const handleSumbit = (e) => {
    e.preventDefault();
      console.log("edit");
      if (passwordConfirm === password) {
        setErrors({ ...errors, passwordConfirm: null });
      } else {
        setErrors({ ...errors, passwordConfirm: "Les password doivent etre identiques" });
      }
      if (!Object.values(errors).some((x) => x !== null && x !== "")) {
        console.log('heeere submit Edit');
        if (password === passwordConfirm) {
          axios.put(API_URL + "users/" + idUser,
            {
              email,
              password,
              role

            }).then((response) => {
              console.log(response);
              swal({
                title: response.data.message,
                text: "",
                icon: "success",
              });
              setTimeout(function(){
                window.location.reload();
             }, 300);
              
              
            }).catch(err => {
              console.log(err.response);
              if (err.response.status === 500) {
                setMessage("Cette adresse mail est deja utilisée");
              }
            })

        } else {
          setMessage("Les password doivent etre identiques");
        }
      }
    }

  return (
    <div>

      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogContent>
              <IconButton color="primary" aria-label="upload picture"
                component="span" size="small" className={classes.closeIcon}>
                <CloseIcon onClick={handleClose}/>
              </IconButton>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image=""
                title=""
              />
              <CardContent>

                <Typography gutterBottom variant="h5" component="h2" color="primary">
                  {props.title}
                </Typography>
                {message && (
                  <Alert
                    severity="error"
                    onClose={() => {
                      setMessage(null);
                    }}
                  >
                    {message}
                  </Alert>
                )}

              </CardContent>

            </CardActionArea>
            <CardActions>
              <Container component="main" maxWidth="xs">
                <form className={classes.form} onSubmit={handleSumbit} validate>
                  <TextField
                    onChange={handleEmail}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={email}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={Boolean(errors?.email)}
                    helperText={errors?.email}
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
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    name="password"
                    placeholder="********"
                    label="Nouveau Password "
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={Boolean(errors?.password)}
                    helperText={errors?.password}
                  />

                  <TextField
                    onChange={handlePasswordConfirm}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    name="password"
                    placeholder="********"
                    label="Confirmer Password "
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={Boolean(errors?.passwordConfirm)}
                    helperText={errors?.passwordConfirm}
                  />


                  <TextField
                    id="standard-select-currency"
                    label="Profil"
                    onChange={handleRole}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={role}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    size="small"
                    disabled
                  >
                  </TextField>

                    <Button
                      variant="contained" color="primary" size="small"
                      type='submit' className={classes.fab} startIcon={<EditIcon />}
                    >Editer</Button>
                </form>
              </Container>
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}