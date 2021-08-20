import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Visibility from "@material-ui/icons/VisibilityRounded";
import Box from '@material-ui/core/Box';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, GridOverlay, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import userService from "../../Services/userService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  load: {
    position: 'absolute',
    top: 0,
    width: '100%',
    color: '#0268B5'
  },
}));

function CustomLoadingOverlay() {
  const classes = useStyles();

  return (
    <GridOverlay>
      <div className={classes.load}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const styles = (theme) => ({
  paper: {
    maxWidth: 950,
    margin: 'auto',
    marginTop: -theme.spacing(1.5),
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  newDemands: {
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.5, 1.5),
    background: '#4fc3f7',
    '&:hover': {
      background: "#3A7BAF",
    },
    color: theme.palette.common.white,
  },
  alert: {
    marginTop: -theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  contentWrapper: {
    margin: '20px 16px',
  },
  footer: {
    marginLeft: theme.spacing(49.5),
    marginTop: -theme.spacing(10),
    background: '#4fc3f7',
    '&:hover': {
      background: "#3A7BAF",
    },
    color: theme.palette.common.white,
  },
  MuiDataGrid: {
    '& .traitee': {
      color: theme.palette.info.main
    },
    '& .nonTraitee': {
      color: 'gray'
    },
  },
});


function Acceuil(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [demandeId, setDemandeId] = useState(null);
  const [demandes, setDemandes] = useState();
  const [demandesTraitees, setDemandesTraitees] = useState([]);
  const [search, setSearch] = useState("");
  const [filtredDemandes, setfiltredDemandes] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [load, setLoad] = useState();
  const [disable, setDisable] = useState(false);
  const [disable1, setDisable1] = useState(true);
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [number, setNumber] = useState();
  const [selectionModel, setSelectionModel] = useState([]);
  const index = props?.currentIndex;

  const columns = [
    {
      field: 'id',
      headerName: 'N°',
      width: 73,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 90,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 110,
    },
    {
      field: 'fullName',
      headerName: 'Faite par',
      width: 160,
    },
    {
      field: 'apogee',
      headerName: 'Apogée',
      width: 130,
    },
    {
      field: 'cin',
      headerName: 'CIN',
      width: 120,
    },
    {
      field: 'statut',
      headerName: 'Statut',
      sortable: false,
      width: 100,
    },
    {
      field: 'info',
      headerName: ' ',
      sortable: false,
      width: 60,
      renderCell: (params) => {
        const showInfo = () => {
          setOpen(true);
          setDemandeId(params.id);
        };
          
        return (
          <Tooltip title='Voir détails'>
            <IconButton style={{ marginLeft: 3 }}>
              <Visibility onClick={showInfo}
                style={{ color: 'gray' }} />
            </IconButton>
          </Tooltip>
        );
      }
    },
  ];

  const data = filtredDemandes?.map((demande) => (
    {
      id: demande.id, type: demande.type_demande, date: demande.date_demande,
      fullName: demande.nom + ' ' + demande.prenom,
      apogee: demande.apogee, cin: demande.etudiant_cin,
      statut: getStatut(demande.id),
    }
  ));

  function getStatut(demandeId) {
    return (demandesTraitees.indexOf(demandeId) > -1 ? 'Traitée' : 'Non traitée')
  }

  function filterDemandes() {
    setLoad(true);
    userService.filterDemandes(index === 0 ? "DEUG" : "Licence", "القانون باللغة العربية")
      .then((response) => {
        setLoad(false);
        setError(null);
        setDemandes(response?.data.demandes);
      }).catch((error) => {
        console.log(error);
        setLoad(false);
        setMessage(null);
        setNumber(null);
        setError("Erreur de chargement, veuillez réssayer.");
      });
  };

  useEffect(() => {
    /* async function getAllDemandes() {
      await userService.getAllDemandes().then((response) => {
        setDemandes(Object.entries(response?.data));
      });
    }
    getAllDemandes(); */
    // console.log(index);
    filterDemandes();
    setMessage(number != null ? message : null);
  }, [index]);

  useEffect(() => {
    setfiltredDemandes(
      demandes?.filter((demande) =>
        demande.etudiant_cin.toLowerCase().includes(search.toLowerCase()) ||
        demande.apogee.toLowerCase().includes(search.toLowerCase()) ||
        demande.cne.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, demandes]);

  const handleReload = () => {
    setMessage(null);
    setNumber(null);
    setError(null);
    setDemandes([]);
    filterDemandes();
  };

  const handleNewDemands = () => {
    setLoad(true);
    setDisable(true);
    userService.nouvellesDemandes('القانون باللغة العربية').then((response) => {
      setDisable(false);
      setError(null);
      filterDemandes();
      let total = response?.data.Deug + response?.data.Licence;
      setMessage(total === 0 ? "Aucune nouvelle demande." :
        response?.data.Deug === 1 && response?.data.Licence === 0 ? "Une seule damande de DEUG est ajoutée." :
        response?.data.Deug === 0 && response?.data.Licence === 1 ? "Une seule damande de Licence est ajoutée." :
        total + " demandes ajoutées: " +
        response?.data.Deug + " DEUG et " + response?.data.Licence + " Licence.");
      setNumber(total);
    }).catch((error) => {
      console.log(error);
      setDisable(false);
      setLoad(false);
      setMessage(null);
      setNumber(null);
      setError("Une connexion internet est obligatoire pour charger les nouvelles demandes, veuillez réssayer.");
    });
  };

  const handleSelection = (e) => {
    if (e) {
      setSelectionModel(e);
      setDisable1(false);
    } else {
      setSelectionModel(null);
      setDisable1(true);
    }
  };

  const handleCreateFolders = (e) => {
    setLoad(true);
    setDisable1(true);
    if (selectionModel?.length === 0) {
      setLoad(false);
      setNumber(null);
      setMessage(null);
      setError("Veuillez séléctionner un dossier d'abord.");
    } else {
      let dt = [];
      selectionModel?.map((id) => (
        userService.CreerDossiers(id)
          .then((response) => {
            setLoad(false);
            setError(null);
            setNumber(null);
            setMessage(null);
            if (response?.data.diplomeCree !== null) {
              demandesTraitees.push(id);
              dt.push(id);
              setMessage(dt?.length === 1 ? "Dossier créé avec succès." :
                dt?.length + " dossiers créés avec succès.");
            } else {
              setError("Cette demande n'existe plus.");
            }
            handleSelection(null);
          }).catch((error) => {
            console.log(error);
            setLoad(false);
            setDisable1(false);
            setMessage(null);
            setNumber(null);
            setError("Erreur dans la création du dossier, veuillez réssayer.");
          })
      ));
    }
  };

  const handleCloseCallback = (open) => {
    setOpen(open);
  }

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Chercher étudiant par Apogée, CIN ou CNE ..."
                fontWeight="fontWeightBold"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button variant="contained"
                disabled={true}
                className={classes.newDemands}
                onClick={handleNewDemands}>
                <Box fontWeight="fontWeightBold">Exporter fiche étudiant</Box>
              </Button>
              <Tooltip title="Recharger">
                <IconButton onClick={handleReload}>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <div className={classes.contentWrapper}>
        {(message || error) && (
          <Alert className={classes.alert}
            icon={number === 0 ? false : null}
            severity={message ? "success" : "error"}
            color={message ? "info" : "error"}
            onClose={() => {
              setMessage(null);
              setNumber(null);
              setError(null);
            }}
          >
            {message || error}
          </Alert>
        )}

        
      </div> */}
     
    </Paper>
  );
}

Acceuil.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Acceuil);