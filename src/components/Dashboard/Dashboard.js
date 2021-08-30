import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, red, purple, lime, grey, cyan } from '@material-ui/core/colors';
import {
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DescriptionIcon from '@material-ui/icons/Description';
import NumbersCard from './NumbersCard';
import userService from "../../Services/userService";
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import Message from '../Formulaires/Message';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    height: "80px",
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: '#fff',
    backgroundColor: green[500],
  },
}));



export default function Dashboard(props) {
  const classes = useStyles();
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  // const [properties, setProperties] = useState([]);

  const properties1 = [
    { id: 1, title: 'Demandes Reçues', number: results.demandes_recus, icon: <CallReceivedIcon />, color: cyan[500], },
    { id: 2, title: 'Demandes Traitées', number: results.demandes_traitees, icon: <AssignmentTurnedInIcon />, color: purple[500], },
    { id: 3, title: 'Diplômes En cours', number: results.diplomes_non_prets, icon: <HourglassEmptyIcon />, color: lime[500], },
  ];

  const properties2 = [
    { id: 4, title: 'Diplômes Réédités', number: results.diplomes_reedites, icon: <BorderColorIcon />, color: red[600], },
    { id: 5, title: 'Diplômes Prêts', number: results.diplomes_prets, icon: <AlarmOnIcon />, color: green[500], },
    { id: 6, title: 'Diplômes Retirés', number: results.diplomes_retirees, icon: <DescriptionIcon />, color: grey[700], },
  ];

  const handleDateDebut = (e) => {
    setDateDebut(e.target.value)
  }

  const handleDateFin = (e) => {
    setDateFin(e.target.value)
  }

  const filterByType = (e) => {
    setType(e.target.value)
  }

  useEffect(() => {
    if (type === '' && dateDebut === '' && dateFin === '') {
      userService.filtredDashboard(dateDebut, dateFin, type).then((response) => {
        setResults(response.data.results)
      }).catch(err => {
        console.log(err);
        setError("Erreur de chargement des statiqtiques générales, veuillez réessayer.");
        setOpen(true);
      })
    } else if (type !== '' && dateDebut === '' && dateFin === '') {
      userService.dashboardByType(type).then((response) => {
        setResults(response.data.results)
      }).catch(err => {
        console.log(err);
        setError("Erreur de chargement des statiqtiques générales, veuillez réessayer.");
        setOpen(true);
      })
    }
  }, [type]);

  const handleFilter = () => {
    if (type !== '' && dateDebut !== '' && dateFin !== '') {
      setMessage(null);
      userService.filtredDashboard(dateDebut, dateFin, type).then((response) => {
        setResults(response.data.results)
      }).catch(err => {
        console.log(err);
        setError("Erreur de chargement des statiqtiques générales, veuillez réessayer.");
        setOpen(true);
      })
    } else {
      setMessage("Veuillez sélectionner d'abord les dates et le type du diplôme (demande).");
    }
  }

  const handleCancel = () => {
    setType('')
    setDateDebut('')
    setDateFin('')
    setMessage(null)
  }

  const handleCallBackOpen = (open) => {
    setOpen(open);
  }

  return (
    <div className={classes.root}>
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
      {open && <Message message={error} success="error" callBackOpen={handleCallBackOpen}/>}
      <TextField
        style={{ height: "8px" }}
        id="standard-select-currency"
        select
        onChange={filterByType}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
        helperText="DEUG / LICENCE"
        variant="outlined"
        margin="normal"
        size="small"
        value={type}
      >
        <MenuItem key={1} value="DEUG">
          DEUG
        </MenuItem>
        <MenuItem key={2} value="licence">
          Licence
        </MenuItem>
      </TextField>

      <Grid container justifyContent="flex-end"
        alignItems="flex-start"
      >
        <Grid item>
          <TextField
            style={{ marginRight: "5px", marginBottom: "5px" }}
            id="date"
            label="Date début"
            type="date"
            value={dateDebut}
            onChange={handleDateDebut}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            id="date"
            label="Date fin"
            type="date"
            value={dateFin}
            onChange={handleDateFin}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            variant="outlined"
            //disableFuture
          />

          <Tooltip title="Appliquer">
            <IconButton onClick={handleFilter}>
              <CheckIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Annuler filtre">
            <IconButton onClick={handleCancel}>
              <CloseIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>


      <Grid container spacing={1}>
        {properties1.map((propertie) => (
          <Grid item xs key={propertie.id}>
            <NumbersCard title={propertie.title}
              number={propertie.number}
              icon={propertie.icon}
              color={propertie.color} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={1}>
        {properties2.map((propertie) => (
          <Grid item xs key={propertie.id}>
            <NumbersCard title={propertie.title}
              number={propertie.number}
              icon={propertie.icon}
              color={propertie.color} />
          </Grid>
        ))}
      </Grid>
      <br />

      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={7}>
          <BarChart />
        </Grid>
        <Grid item>
          <DonutChart />
        </Grid>
      </Grid>


    </div>
  );
}
