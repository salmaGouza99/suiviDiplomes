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
import { format } from 'date-fns';
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
  // States
  const classes = useStyles();
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  // set the properties dashboard for all the existing data
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

  // handle select textfields
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
    // get all the data without filtres
    if (type === '' && dateDebut === '' && dateFin === '') {
      userService.filtredDashboard(dateDebut, dateFin, type).then((response) => {
        setResults(response.data.results)
      }).catch(err => {
        console.log(err);
        setError("Erreur de chargement des statiqtiques générales, veuillez réessayer.");
        setOpen(true);
      })

    // filter data by type
    } else if (type !== '' && dateDebut === '' && dateFin === '') {
      userService.dashboardByType(type).then((response) => {
        setResults(response.data.results)
      }).catch(err => {
        console.log(err);
        setError("Erreur de chargement des statiqtiques générales, veuillez réessayer.");
        setOpen(true);
      })
    }
  // this code will be called everytime the type, date_debut or date_fin change
  }, [type, dateDebut, dateFin]);

  const handleFilter = () => {
    // filter data by type and dates at the same time
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

  // cancel all the filters
  const handleCancel = () => {
    setType('')
    setDateDebut('')
    setDateFin('')
    setMessage(null)
  }

  // open and close the error message
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
            style={{ marginRight: "5px", marginBottom: "5px", width: 273 }}
            id="date"
            label="Date début (réception de la demande)"
            type="date"
            value={dateDebut}
            onChange={handleDateDebut}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
                inputProps: {max: format(new Date(),'yyyy-MM-dd')} // disable the future dates
            }}
            size="small"
            variant="outlined"/>
        </Grid>
        <Grid item>
          <TextField
          style={{width: 251}}
            id="date"
            label="Date fin (réception de la demande)"
            type="date"
            value={dateFin}
            onChange={handleDateFin}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
                inputProps: {max: format(new Date(),'yyyy-MM-dd')} // disable the future dates
            }}
            size="small"
            variant="outlined"
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

      {/* showing the properties of dashboard */}
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
          {/* calling the BarChart component which has the results of the currents statistics */}
          <BarChart />
        </Grid>
        <Grid item>
          <DonutChart />
        </Grid>
      </Grid>


    </div>
  );
}
