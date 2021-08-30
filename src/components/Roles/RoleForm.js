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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
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
    marginBottom: theme.spacing(2),
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
    marginLeft: theme.spacing(12),
  },
  container: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
}));

export default function RoleForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    setOpen(props.handleOpen);
    props.role ? setName(props.role.name) : setName('');
    props.role ? setId(props.role.id) : setId('');
    props.handleOpen ? setOpen(props.handleOpen) : setOpen(false);
  }, []);


  ///////////////////////////////////////////
  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleClose = (e) => {
    if(props.formType  === "edit"){
      props.closeCallback(false,"edit");
    }else if(props.formType  === "add"){
        props.closeCallback(false,"add");
    }
  }
  /////////////////////////////////////////

  const handleSumbit = (e) => {
    e.preventDefault();
    setDisable(true);
    if (props.formType === "add") {
          userService.addNewRole(name).then((response) => {
            setDisable(false);
              swal({
                title: response.data.message,
                text: "",
                icon: "success",
              });
            props.closeCallback(false,"add");
              
            }).catch(err => {
              console.log(err.response);
              setDisable(false);
              setMessage("Une erreur est servenue, veuillez réessayer.");
            })
    }
    else if (props.formType === "edit") {
          userService.updateRole(id, name).then((response) => {
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
            })
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
                style={{height:80, backgroundImage: props.formType === "add" ? `url(${imgAjout})` : `url(${imgEdition})`}}
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
                    onChange={handleName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AssignmentIndIcon fontSize='small'/>
                        </InputAdornment>
                      ),
                    }}
                    value={name}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="name"
                    label="Nom du rôle"
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
            {/* ///////////////////////////////////////////// */}
                  {props.formType === "add" ?
                    <Button type='submit' variant="contained" color="primary" size="small"
                      className={classes.fab} startIcon={<AddBoxRoundedIcon />}
                      disabled={disable}
                    >Ajouter</Button>
                    :
                    <Button
                      variant="contained" color="primary" size="small"
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