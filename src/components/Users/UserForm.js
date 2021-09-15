import React, { useEffect, useState } from 'react';
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
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
import userService from "../../Services/userService";
import imgAjout from "../../Images/ajout.jpg";
import imgEdition from "../../Images/edition.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,

  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(12),
    background: '#a104fc', 
    '&:hover': {
      background: "#ab5fe7",
    },
    color: 'white'
  },
  container: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: -theme.spacing(1),
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
}));

export default function UserForm(props) {
  // States
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState('');
  const [role, setRole] = useState('');
  const [roleName, setRoleName] = useState('');
  const [idUser, setIdUser] = useState('');
  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);


  useEffect(() => {
    // set the props values of the parent component in the appropriate variables
    setOpen(props.handleOpen);
    props.user ? setRole(props.user.roleId) : setRole('');
    props.user ? setRoleName(props.user.role) : setRole('');
    props.user ? setEmail(props.user.email) : setEmail('');
    props.user ? setIdUser(props.user.id) : setIdUser('');
    props.handleOpen ? setOpen(props.handleOpen) : setOpen(false);
    props.roles ? setRoles(props.roles) : setRoles([]);
  }, []);


  const handleRole = (e) => {
    setRole(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (email.length < 6) {
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
  }

  const handleClose = (e) => {
    if(props.formType  === "edit"){
      props.closeCallback(false,"edit");
    }else if(props.formType  === "add"){
      props.closeCallback(false,"add");
    }
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    // adding user
    if (props.formType === "add") {
      console.log("add");
      if (passwordConfirm === password) {
        setErrors({ ...errors, passwordConfirm: null });
      } else {
        setErrors({ ...errors, passwordConfirm: "Les mots de passe doivent être identiques." });
      }
      if (!Object.values(errors).some((x) => x !== null && x !== "")) {
        setDisable(true);
        if (password === passwordConfirm) {
          userService.addNewUser(email, password, role).then((response) => {
              swal({
                title: response.data.message,
                text: "",
                icon: "success",
              });
              setDisable(false);
            props.closeCallback(false,"add");
            }).catch(err => {
              console.log(err.response);
              setDisable(false);
              setMessage("Une erreur est servenue, veuillez réessayer.");
              if (err.response.status === 500) {
                setMessage("Cette adresse mail est déjà utilisée.");
              }
            })
        } else {
          setDisable(false);
          setMessage("Les mots de passe doivent être identiques.");
        }
      }
    }
    // editing user
    else if (props.formType === "edit") {
      console.log("edit");
      if (passwordConfirm === password) {
        setErrors({ ...errors, passwordConfirm: null });
      } else {
        setErrors({ ...errors, passwordConfirm: "Les mots de passe doivent être identiques."});
      }
      if (!Object.values(errors).some((x) => x !== null && x !== "")) {
        setDisable(true);
        if (password === passwordConfirm) {
          userService.updateUser(idUser, email, password, role).then((response) => {
            setDisable(false);
              swal({
                title: response.data.message,
                text: "",
                icon: "success",
              });
            props.closeCallback(false,"edit");
            }).catch(err => {
              console.log(err.response);
              setDisable(false);
              setMessage("Une erreur est servenue, veuillez réessayer.");
              if (err.response.status === 500) {
                setMessage("Cette adresse mail est déjà utilisée.");
              }
            })
        } else {
          setDisable(false);
          setMessage("Les mots de passe doivent être identiques.");
        }
      }
    }
  }

  // show and hide the password
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // show and hide the confirmed password
  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);

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
                style={{height:80, backgroundImage: props.formType === "add" ? `url(${imgAjout})` : `url(${imgEdition})`}}
                image=""
                title=""
              />
              <CardContent>

                <Typography gutterBottom variant="h5" component="h2" style={{color: '#a104fc'}}>
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
                          <PersonIcon fontSize='small'/>
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
                    label="Identifiant"
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
                          <VpnKeyIcon fontSize='small'/>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityIcon fontSize='small'/> : <VisibilityOffIcon fontSize='small'/>}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    name="password"
                    placeholder="********"
                    label="Nouveau mot de passe "
                    type={showPassword ? "text" : "password"}
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
                          <VpnKeyIcon fontSize='small'/>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                          >
                            {showPassword1 ? <VisibilityIcon fontSize='small'/> : <VisibilityOffIcon fontSize='small'/>}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    name="password"
                    placeholder="********"
                    label="Confirmer mot de passe "
                    type={showPassword1 ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    error={Boolean(errors?.passwordConfirm)}
                    helperText={errors?.passwordConfirm}
                  />
                  {props.title === "Editer utilisateur" || props.title === "Ajouter utilisateur" ? 
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Profil"
                    onChange={handleRole}
                    value={role}
                    helperText="Choisissz un profil"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    size="small"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  :
                  <TextField
                    id="standard-select-currency"
                    label="Profil"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={roleName}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    size="small"
                    disabled
                  >
                  </TextField>
                  }

                  {props.formType === "add" ?
                    <Button type='submit' variant="contained" size="small"
                      className={classes.fab} startIcon={<AddBoxRoundedIcon />}
                      disabled={disable}
                    >
                      Ajouter</Button>
                    :
                    <Button
                      variant="contained"  size="small"
                      type='submit' className={classes.fab} startIcon={<EditIcon />}
                      disabled={disable}
                    >Editer</Button>
                  }
                </form>
              </Container>
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}