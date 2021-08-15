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
import InfoGrid from "./InfoGrid";

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
    marginLeft: theme.spacing(50),
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
    renderCell: () => (
      <Tooltip title='Afficher détails'>
      <IconButton style={{ marginLeft: 3 }}>
        <Visibility onClick={showInfo}
          style={{ color: 'gray' }} />
      </IconButton></Tooltip>
    ),
  },
];

let showInfo;

function Content(props) {
  const { classes } = props;
  const [openInfo, setOpenInfo] = useState(false);
  const [demandeInfo, setDemandeInfo] = useState([]);
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
  const index = props.currentIndex;
  const data = filtredDemandes?.map((demande) => (
    {
      id: demande.id, type: demande.type_demande, date: demande.date_demande,
      fullName: demande.nom + ' ' + demande.prenom,
      apogee: demande.apogee, cin: demande.etudiant_cin,
      statut: DT(demande.id),
    }
  ));

  function DT(demandeId) {
    return (demandesTraitees.indexOf(demandeId) > -1 ? 'Traitée' : 'Non traitée')
  }

  function filterDemandes() {
    setLoad(true);
    userService.filterDemandes(index === 0 ? "Licence" : "DEUG", "القانون باللغة العربية")
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

  showInfo = () => {
    console.log(openInfo);
    setOpenInfo(true);
    setDemandeInfo("demande");
  };

  const handleNewDemands = () => {
    setLoad(true);
    setDisable(true);
    userService.nouvellesDemandes('القانون باللغة العربية').then((response) => {
      setDisable(false);
      setError(null);
      filterDemandes();
      setMessage(response?.data.Deug + response?.data.Licence === 0 ? "Aucune nouvelle demande." :
        response?.data.Deug + response?.data.Licence + " demandes ajoutées: " +
        response?.data.Deug + " DEUG et " + response?.data.Licence + " Licence.");
      setNumber(response?.data.Deug + response?.data.Licence);
    }).catch((error) => {
      console.log(error);
      setDisable(false);
      setLoad(false);
      setMessage(null);
      setNumber(null);
      setError("Une erreur est servenue, veuillez réssayer.");
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
      selectionModel?.map((id) => (
        userService.CreerDossiers(id)
          .then((response) => {
            setLoad(false);
            setError(null);
            setNumber(null);
            setMessage(null);
            if (response?.data.diplomeCree !== null) {
              setMessage(selectionModel?.length === 1 ? "Dossier créé avec succès." :
                selectionModel?.length + " dossiers créés avec succès.");
              demandesTraitees.push(id);
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
                placeholder="Chercher par Apogée, CIN ou CNE ..."
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
                disabled={disable}
                className={classes.newDemands}
                onClick={handleNewDemands}>
                <Box fontWeight="fontWeightBold">Nouvelles demandes</Box>
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
      <div className={classes.contentWrapper}>
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

        <div style={{ height: 375, width: '100%' }} className={classes.MuiDataGrid}>
          <DataGrid
            localeText={frFR.props.MuiDataGrid.localeText}
            rows={data ? data : []}
            columns={columns}
            getCellClassName={(params) => {
              return (params.value === 'Traitée' ? 'traitee' : params.value === 'Non traitée' ? 'nonTraitee' : '')
            }}
            /* sortModel={[
              { field: 'date', sort: 'desc' },
            ]} */
            checkboxSelection
            disableSelectionOnClick
            disableColumnMenu
            pageSize={pageSize}
            onSelectionModelChange={handleSelection}
            selectionModel={selectionModel}
            //onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            //rowsPerPageOptions={[5, 7, 10]}
            components={{
              Pagination: CustomPagination,
              LoadingOverlay: CustomLoadingOverlay,
            }}
            pagination
            loading={load}
          />
          <Button variant="contained" disabled={selectionModel?.length === 0 || disable1 ? true : false}
            className={classes.footer} onClick={handleCreateFolders}>
            <Box fontWeight="fontWeightBold">Créer dossier</Box>
          </Button>
        </div>
      </div>
      {openInfo ?
        <InfoGrid handleOpen={openInfo} demande={demandeInfo} title="Informations Personnelles" />
        : <div></div>}
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);