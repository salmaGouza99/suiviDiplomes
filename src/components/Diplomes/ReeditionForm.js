import React, { useState } from 'react';
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
import ReportProblemIcon from '@material-ui/icons/ReportProblemOutlined';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import Alert from "@material-ui/lab/Alert";
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { format } from 'date-fns';
import swal from 'sweetalert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import userService from "../../Services/userService";
import imgEdition from "../../Images/edition.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    marginBottom: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(15),
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
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    background: '#f10259',
    '&:hover': {
      background: "#f05c94",
    },
    color: theme.palette.common.white,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(15),
  },
  button1: {
    background: '#0a9ce6',
    '&:hover': {
      background: "#5ea2d7",
    },
    color: theme.palette.common.white,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(35),
  },
}));

export default function ReeditionForm(props) {
  // States
  const classes = useStyles();
  const [apogee, setApogee] = useState(props?.diplome.apogee);
  const [cin, setCin] = useState(props?.diplome.cin);
  const [cne, setCne] = useState(props?.diplome.cne);
  const [nom, setNom] = useState(props?.diplome.nom);
  const [prenom, setPrenom] = useState(props?.diplome.prenom);
  const [nom_arabe, setNom_arabe] = useState(props?.diplome.nom_arabe);
  const [prenom_arabe, setPrenom_arabe] = useState(props?.diplome.prenom_arabe);
  const [filiere, setFiliere] = useState(props?.diplome.filiere);
  const [option, setOption] = useState(props?.diplome.option ? props?.diplome.option : null);
  const [nationalite, setNationalite] = useState(props?.diplome.nationalite);
  const [date, setDate] = useState(props?.diplome.date_naiss);
  const [lieu, setLieu] = useState(props?.diplome.lieu_naiss);
  const [type, setType] = useState('');
  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const id = props?.diplome.id;
  const old_cin = props?.diplome.cin;
  const open = props?.handleOpen;

  //////////////////// handle textfileds ///////////////////////
  const handleApogee = (e) => {
    setApogee(e.target.value);
  };
  const handleCIN = (e) => {
    setCin(e.target.value);
  };
  const handleCNE = (e) => {
    setCne(e.target.value);
  };
  const handleNom = (e) => {
    setNom(e.target.value);
  };
  const handlePrenom = (e) => {
    setPrenom(e.target.value);
  };
  const handleNomArabe = (e) => {
    setNom_arabe(e.target.value);
  };
  const handlePrenomArabe = (e) => {
    setPrenom_arabe(e.target.value);
  };
  const handleFiliere = (e) => {
    setFiliere(e.target.value);
  };
  const handleOption = (e) => {
    setOption(e.target.value);
  };
  const handleNationalite = (e) => {
    setNationalite(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleLieu = (e) => {
    setLieu(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
    // check validation arabic letters
    let regex = /[\u0600-\u06FF\u0750-\u077F]/;
    if(!e.target.value.match(regex)) {
      setError("Veuillez entrer le type d'erreur en Arabe s'il vous plaît");
    } else {
      setError("");
    }
  };

  // close the edit form
  const handleClose = (e) => {
    props.closeCallback(false, false);
  };


  const handleSumbit = (e) => {
    e.preventDefault();
    // it the errorType is not with arabic letters we show the error message
    if(error) {
      setMessage("Type d'erreur invalid.")
    // else we pass to the update of student info and his diploma
    } else {
      setDisable(true);
      // update student info
      userService.updateEtudiant(old_cin, cin, apogee, cne, nom, prenom, nom_arabe, prenom_arabe, filiere, option,
          nationalite, date, lieu).then((response) => {
          // update diplome info
          userService.updateDateReedition(id, type).then((response1) => {
              swal({
                title: response1?.data?.message,
                text: "Voulez-vous générer la note de présentation de ce cas de réédition ?",
                icon: "success",
                buttons: {
                  cancel: 'Annuler',
                  confirm: true,
                },
              }).then((ok) => {
                if (ok) {
                  userService.showDiplome(id).then((response2) => {
                    props.openCallback(true, response2?.data?.diplome);
                  }).catch((err) => {
                    console.log(err);
                    props.openCallback(false, "Une erreur s'est produite lors de la génération de la note, veuillez réessayer.");
                  })
                }
              });
              props.closeCallback(false, true);
            }).catch((err) => {
              console.log(err);
              setDisable(false);
              setMessage("Une erreur s'est produite lors de la réédition des informations, veuillez réessayer.");
            })
      }).catch((err) => {
        console.log(err);
        setDisable(false);
        setMessage("Une erreur s'est produite lors de la réédition des informations, veuillez réessayer.");
      })
    }
  }

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogContent>
          <IconButton color="primary" aria-label="upload picture"
            component="span" size="small" className={classes.closeIcon}>
            <CloseIcon onClick={handleClose} />
          </IconButton>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                style={{ height: 80, backgroundImage: `url(${imgEdition})` }}
                image=""
                title=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{color: '#a104fc'}}>
                  Rééditer Infos d'étudiant
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
                  {/* /////////////////////// Apogee /////////////////////// */}
                  <TextField
                    onChange={handleApogee}
                    inputProps={{ style: { textAlign: 'left' } }}
                    value={apogee}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="apogee"
                    label="Apogée"
                    name="apogee"
                    autoFocus
                  />
                  {/* /////////////////////// CIN /////////////////////// */}
                  <TextField
                    onChange={handleCIN}
                    inputProps={{ style: { textAlign: 'left', width: 135 } }}
                    value={cin}
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    id="cin"
                    label="CIN"
                    name="cin"
                  />
                  {/* /////////////////////// CNE /////////////////////// */}
                  <TextField
                    onChange={handleCNE}
                    inputProps={{ style: { textAlign: 'left', width: 135 } }}
                    style={{ marginLeft: 10 }}
                    value={cne}
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    id="cne"
                    label="CNE"
                    name="cne"
                  />
                  {/* /////////////////////// Nom /////////////////////// */}
                  <TextField
                    onChange={handleNom}
                    inputProps={{ style: { textAlign: 'left', width: 135 } }}
                    value={nom}
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    id="nom"
                    label="Nom"
                    name="nom"
                  />
                  {/* /////////////////////// Prénom /////////////////////// */}
                  <TextField
                    onChange={handlePrenom}
                    inputProps={{ style: { textAlign: 'left', width: 135 } }}
                    style={{ marginLeft: 10 }}
                    value={prenom}
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    id="prenom"
                    label="Prénom"
                    name="prenom"
                  />
                  {/* /////////////////////// Nom arabe /////////////////////// */}
                  <TextField
                    onChange={handleNomArabe}
                    inputProps={{ style: { textAlign: 'right', width: 135 } }}
                    value={nom_arabe}
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    id="nom_arabe"
                    label="الاسم العائلي"
                    name="nom_arabe"
                  />
                  {/* /////////////////////// Prénom arabe /////////////////////// */}
                  <TextField
                    onChange={handlePrenomArabe}
                    inputProps={{ style: { textAlign: 'right', width: 135 } }}
                    style={{ marginLeft: 10 }}
                    value={prenom_arabe}
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    id="prenom_arabe"
                    label="الاسم الشخصي"
                    name="prenom_arabe"
                  />
                  {/* /////////////////////// Filière /////////////////////// */}
                  <TextField
                    onChange={handleFiliere}
                    inputProps={{ style: { textAlign: 'left' } }}
                    value={filiere}
                    variant="outlined"
                    select
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="filiere"
                    label="Filière"
                    name="filiere"
                  >
                    <MenuItem key={1} value="القانون باللغة العربية">
                      القانون باللغة العربية
                                </MenuItem>
                    <MenuItem key={2} value="Droit en français">
                      Droit en français
                                </MenuItem>
                    <MenuItem key={3} value="Sciences Economiques et Gestion">
                      Sciences Economiques et Gestion
                                </MenuItem>
                  </TextField>
                  {/* /////////////////////// Option /////////////////////// */}
                  {option !== null ?
                    <TextField
                      onChange={handleOption}
                      inputProps={{ style: { textAlign: 'left' } }}
                      value={option}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="option"
                      label="Option"
                      name="option"
                    /> : <></>}
                  {/* /////////////////////// Nationalité /////////////////////// */}
                  <TextField
                    onChange={handleNationalite}
                    inputProps={{ style: { textAlign: 'left', width: 135 } }}
                    value={nationalite}
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    id="nationalite"
                    label="Nationalité"
                    name="nationalite"
                  />
                  {/* /////////////////////// Lieu de naissance /////////////////////// */}
                  <TextField
                    onChange={handleLieu}
                    inputProps={{ style: { textAlign: 'left', width: 135 } }}
                    style={{ marginLeft: 10 }}
                    value={lieu}
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    id="lieu"
                    label="Lieu de naissance"
                    name="lieu"
                  />
                  {/* /////////////////////// Date de naissance /////////////////////// */}
                  <TextField
                    onChange={handleDate}
                    value={date}
                    InputProps={{
                      inputProps: { max: format(new Date(), 'yyyy-MM-dd') }
                    }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="date"
                    label="Date de naissance"
                    name="date"
                    type='date'
                  />
                  {/* /////////////////////// Type d'erreur /////////////////////// */}
                  <TextField
                    onChange={handleType}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ReportProblemIcon fontSize='small' />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{ style: { textAlign: 'right' } }}
                    value={type}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="type"
                    label="نوع الخطأ (بالعربية)"
                    name="type"
                    error={Boolean(error)}
                    helperText={error}
                  />
                  <Button
                    variant="contained" size="small"
                    type='submit' className={classes.fab} startIcon={<EditIcon />}
                    disabled={disable}>
                    Rééditer
                  </Button>
                </form>
              </Container>
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}