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
import Visibility from "@material-ui/icons/VisibilityRounded";
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, GridOverlay, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import userService from "../../Services/userService";
import DetailsDiplome from '../Diplomes/DetailsDiplome';

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
});


function DossiersGrid(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [diplome, setDiplome] = useState(null);
  const [diplomes, setDiplomes] = useState([]);
  const [search, setSearch] = useState('');
  const [id, setId] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [load, setLoad] = useState();
  const [error, setError] = useState();
  const type = props?.currentIndex === 0 ? "DEUG" : "Licence";
  const filiere = props?.role === 2 ? "القانون باللغة العربية" : 
                  props?.role === 3 ? "Droit en français" : "Sciences Economiques et Gestion";

  const columns = [
    {
      field: 'id',
      headerName: 'N°',
      width: 75,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 90,
    },
    {
      field: 'date',
      headerName: 'Date création',
      width: 150,
    },
    {
      field: 'fullName',
      headerName: 'Etudiant',
      width: 170,
    },
    {
      field: 'apogee',
      headerName: 'Apogée',
      width: 130,
    },
    {
      field: 'cin',
      headerName: 'CIN',
      width: 110,
    },
    {
      field: 'cne',
      headerName: 'CNE',
      width: 110,
    },
    {
      field: 'info',
      headerName: ' ',
      sortable: false,
      width: 60,
      renderCell: (params) => {
        const showInfo = () => {
              setOpen(true)
              setId(params.id);
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

  const data = diplomes?.map((diplome) => (
    {
      id: diplome.id, type: diplome.type_demande, date: diplome.date_creation,
      fullName: diplome.nom + ' ' + diplome.prenom,
      apogee: diplome.apogee, cin: diplome.cin, cne: diplome.cne,
    }
  ));

  function filterDiplomes() {
    setLoad(true);
    userService.getAllDiplomes()
      .then((response) => {
        setLoad(false);
        setError(null);
        setDiplomes(response?.data.diplomes.filter((diplome) =>
            diplome.type_demande === type && diplome.statut_id === 1 &&
            diplome.filiere === filiere &&
            (diplome.cin.toLowerCase().includes(search.toLowerCase()) ||
            diplome.apogee.toLowerCase().includes(search.toLowerCase()) ||
            diplome.cne.toLowerCase().includes(search.toLowerCase()) ) )
        );
      }).catch((error) => {
        console.log(error);
        setLoad(false);
        setError("Erreur de chargement, veuillez réssayer.");
      });
  };

  useEffect(() => {
    filterDiplomes();
  }, [type, search]);

  const handleReload = () => {
    setError(null);
    setDiplomes([]);
    filterDiplomes();
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
        {error && (
          <Alert className={classes.alert}
            severity="error"
            onClose={() => {
              setError(null);
            }}
          >
            {error}
          </Alert>
        )}

        <div style={{ height: 375, width: '100%' }} className={classes.MuiDataGrid}>
          <DataGrid
            localeText={frFR.props.MuiDataGrid.localeText}
            rows={data ? data : []}
            columns={columns}
            disableMultipleSelection
            disableSelectionOnClick
            disableColumnMenu
            pageSize={pageSize}
            //onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            //rowsPerPageOptions={[5, 7, 10]}
            components={{
              Pagination: CustomPagination,
              LoadingOverlay: CustomLoadingOverlay,
            }}
            pagination
            loading={load}
          />
        </div>
      </div>
      {open?
        <DetailsDiplome handleOpen={open} diplomeId={id} title="Détails" button={null}
                        closeCallback={handleCloseCallback} />
        : <div></div>}
    </Paper>
  );
}

DossiersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DossiersGrid);