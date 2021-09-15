import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Visibility from "@material-ui/icons/VisibilityRounded";
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { DataGrid, GridOverlay, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import FilterListIcon from '@material-ui/icons/FilterListRounded';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
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

// custom loading of data grid
function CustomLoadingOverlay() {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#a104fc'
        }
    }
  });

  return (
    <GridOverlay>
       <div className={classes.load}>
        <MuiThemeProvider theme={theme}>
            <LinearProgress color='secondary'/>
        </MuiThemeProvider>
        </div>
    </GridOverlay>
  );
}

// custom pagination of data grid
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
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: 15,
  },
  block: {
    display: 'block',
  },
  newDemands: {
    background: '#a104fc',
    '&:hover': {
      background: "#ab5fe7",
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
  folder: {
    background: '#bb0086',
    '&:hover': {
      background: "#bf3fa0",
    },
    color: theme.palette.common.white,
  },
  MuiDataGrid: {
    '& .traitee': {
      color: '#BA55D3'
    },
    '& .nonTraitee': {
      color: 'gray'
    },
  },
});


function DemandesGrid(props) {
  // States
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [demandeId, setDemandeId] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [demandesTraitees, setDemandesTraitees] = useState([]);
  const [search, setSearch] = useState("");
  const [filtredDemandes, setFiltredDemandes] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [load, setLoad] = useState();
  const [reload, setReload] = useState(false);
  const [disable, setDisable] = useState(false);
  const [disable1, setDisable1] = useState(true);
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [number, setNumber] = useState();
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedFiliere, setselectedFiliere] = useState('');
  // set type of diplome according the indextab of the header
  const type = props?.currentIndex === 0 ? "DEUG" : "Licence";
  // set filiere according to the user role
  const filiere = props?.role === 2 ? "القانون باللغة العربية" : 
                  props?.role === 3 ? "Droit en français" : 
                  props?.role === 4 ? "Sciences Economiques et Gestion" : null;

  // data grid columns
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
      field: 'filiere',
      hide: filiere !== null ? true : false,
      headerName: 'Filière',
      width: 140,
    },
    {
      field: 'statut',
      hide: filiere !== null ? false : true,
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
          // show info of the chosen demande
          setOpen(true);
          setDemandeId(params.id);
        };
          
        return (
          <Tooltip title='Voir détails'>
            <IconButton onClick={showInfo} style={{ marginLeft: 3 }}>
              <Visibility style={{ color: 'gray' }} />
            </IconButton>
          </Tooltip>
        );
      }
    },
  ];

  // data grid rows : it's the filtred demandes
  const data = filtredDemandes?.map((demande) => (
    {
      id: demande.id, type: demande.type_demande, date: demande.date_demande,
      fullName: demande.etudiant.nom + ' ' + demande.etudiant.prenom,
      apogee: demande.etudiant.apogee, cin: demande.etudiant_cin,
      filiere: demande.etudiant.filiere, statut: getStatut(demande.id),
    }
  ));

  // get title of statut demande
  function getStatut(demandeId) {
    return (demandesTraitees.indexOf(demandeId) > -1 ? 'Traitée' : 'Non traitée')
  };

  useEffect(() => {
    setLoad(true);
    setReload(false);
    // list of all demandes without filtres
    userService.getAllDemandes()
      .then((response) => {
        setLoad(false);
        setError(null);
        setDemandes(response?.data?.demandes);
      }).catch((error) => {
        console.log(error);
        setLoad(false);
        setMessage(null);
        setNumber(null);
        setError("Erreur de chargement, veuillez réessayer.");
      });
    setMessage(number != null ? message : null);
  // this code will be called in every refresh
  }, [reload]);

  useEffect(() => {
    setFiltredDemandes(
      // filter the above demandes list by :
      demandes?.filter((demande) =>
        // type
        demande.type_demande === type 
        // filiere
        && 
        (filiere !== null ? demande.etudiant.filiere === filiere : 
         selectedFiliere !== '' ? demande.etudiant.filiere === selectedFiliere :
         demande.etudiant.filiere !== null) 
        // input search
        &&
        (demande.etudiant_cin.toLowerCase().includes(search.toLowerCase()) ||
        demande.etudiant.apogee.toLowerCase().includes(search.toLowerCase()) ||
        demande.etudiant.cne.toLowerCase().includes(search.toLowerCase()) )
      )
    );
    setError(null);
    setMessage(number != null ? message : null);
  // this code will be called if there is a selected filiere or an input search 
  }, [type, selectedFiliere, search, demandes]);

  // handle refresh all states
  const handleReload = () => {
    setMessage(null);
    setNumber(null);
    setError(null);
    setDemandes([]);
    setSearch('');
    setselectedFiliere('');
    setReload(true);
  };

  // load the new demandes from the forms (DEUG and Licence) according to the filiere 
  const handleNewDemands = () => {
    setLoad(true);
    setDisable(true);
    userService.nouvellesDemandes(filiere!==null?filiere:0).then((response) => {
      setDisable(false);
      setError(null);
      if (filiere!==null) {
        // load new demandes for GuichetScolarite according to each filiere
        let total = response?.data.Deug + response?.data.Licence;
        setMessage(total === 0 ? "Aucune nouvelle demande." :
        response?.data.Deug === 1 && response?.data.Licence === 0 ? "Une seule damande de DEUG est ajoutée." :
        response?.data.Deug === 0 && response?.data.Licence === 1 ? "Une seule damande de Licence est ajoutée." :
        total + " demandes ajoutées: " +
        response?.data.Deug + " DEUG et " + response?.data.Licence + " Licence.");
        setNumber(total);
      } else {
        // load new demandes for Admin (All filieres)
        let total = response?.data.DeugForAllFilieres + response?.data.LicenceForAllFilieres;
        setMessage(total === 0 ? "Aucune nouvelle demande." :
        response?.data.DeugForAllFilieres === 1 && response?.data.LicenceForAllFilieres === 0 ? "Une seule damande de DEUG est ajoutée." :
        response?.data.DeugForAllFilieres === 0 && response?.data.LicenceForAllFilieres === 1 ? "Une seule damande de Licence est ajoutée." :
        total + " demandes ajoutées: " +
        response?.data.DeugForAllFilieres + " DEUG et " + response?.data.LicenceForAllFilieres + " Licence.");
        setNumber(total);
      }
      setReload(true);
    }).catch((error) => {
      console.log(error);
      setDisable(false);
      setLoad(false);
      setMessage(null);
      setNumber(null);
      setError("Une connexion internet est obligatoire pour charger les nouvelles demandes, veuillez réessayer.");
    });
  };

  const handleSelection = (e) => {
    if (e) {  // if there is some selections
      setSelectionModel(e);
      setDisable1(false);
    } else {  // if there is no selection
      setSelectionModel(null);
      setDisable1(true);
    }
  };

  // create folders for diplomes for the first time
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
              setError("Cette demande est déjà traitée, ou une autre erreur est servenue.");
            }
            handleSelection(null);
          }).catch((error) => {
            console.log(error);
            setLoad(false);
            setDisable1(false);
            setMessage(null);
            setNumber(null);
            setError("Une erreur s'est produite lors de la création du dossier, veuillez réessayer.");
          })
      ));
    }
  };

  // close the dialog of opened demande info
  const handleCloseCallback = (open) => {
    setOpen(open);
  };

  const handleSelectedFiliere = (event) => {
    setselectedFiliere(event.target.value);
  };

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            {/* /////////////////////// for Admin and GuichetScolarite ///////////////////////*/}
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
                value={search}
              />
            </Grid>
            {/* /////////////////////// for Admin ///////////////////////*/}
            {filiere === null &&
            <Grid item>
              <TextField
              style={{minWidth: 150, marginRight: 15}}
              id="standard-select-currency"
              select
              label="Filtrer par filière"
              onChange={handleSelectedFiliere}
              InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <FilterListIcon/>
                      </InputAdornment>
                  ),
              }}
              variant="outlined"
              margin="normal"
              size="small"
              value={selectedFiliere}
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
            </Grid>}
            {/* /////////////////////// for Admin and GuichetScolarite ///////////////////////*/}
            <Grid item>
              <Tooltip title="Charger les nouvelles demandes">
                <div>
                  <IconButton className={classes.newDemands} onClick={handleNewDemands}
                      disabled={disable}>
                      <PostAddIcon style={{fontSize: 22}}/>
                  </IconButton>
                </div>
              </Tooltip>
            </Grid>
            {/* /////////////////////// for GuichetScolarite ///////////////////////*/}
            {filiere !== null && 
            <Grid item>
              <Tooltip title="Créer dossier">
                <div style={{marginLeft: 10, marginTop:10,marginBottom:10}}>
                  <IconButton className={classes.folder} onClick={handleCreateFolders}
                      disabled={selectionModel?.length === 0 || disable1 ? true : false}>
                      <CreateNewFolderIcon style={{fontSize: selectionModel?.length === 0 || disable1 ? 25 : 22}}/>
                  </IconButton>
                </div>
              </Tooltip>
            </Grid>}
            {/* /////////////////////// for Admin and GuichetScolarite ///////////////////////*/}
            <Grid item>
              <Tooltip title="Rafraîchir">
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
    
        <div style={{ width: '100%' }} className={classes.MuiDataGrid}>
          {/* List of filtred demandes */}
          <DataGrid
            localeText={frFR.props.MuiDataGrid.localeText}
            autoHeight
            rows={data ? data : []}
            columns={columns}
            getCellClassName={(params) => { // set the appropriate name of class style to the demande statut
              return (params.value === 'Traitée' ? 'traitee' : params.value === 'Non traitée' ? 'nonTraitee' : '')
            }}
            checkboxSelection={filiere !== null ? true : false}
            disableSelectionOnClick={filiere !== null ? false : true}
            disableColumnMenu
            pageSize={pageSize}
            onSelectionModelChange={handleSelection}
            selectionModel={selectionModel}
            components={{
              Pagination: CustomPagination,
              LoadingOverlay: CustomLoadingOverlay,
            }}
            pagination
            loading={load}
          />
        </div>
      </div>
      {/* open dialog of info demande for Admin and GuichetScolarite*/}
      {open?
        <InfoGrid handleOpen={open} demandeId={demandeId} closeCallback={handleCloseCallback} />
        : <div></div>}
    </Paper>
  );
}

DemandesGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DemandesGrid);