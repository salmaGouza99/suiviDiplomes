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
import Box from '@material-ui/core/Box';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import userService from "../../Services/userService";

const styles = (theme) => ({
  paper: {
    maxWidth: 940,
    margin: 'auto',
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
  contentWrapper: {
    margin: '20px 16px',
  },
  /* MuiDataGrid: {
    root: {
      '& .MuiDataGrid-row.Mui-even:not(:hover)': {
        backgroundColor: theme.palette.type === 'light' ? 'red' : 'blue',
      },
    },
  } */
});

const columns = [
  { field: 'id', headerName: 'N°', headerClassName: 'super-app-theme--header', },
  {
    field: 'type',
    headerName: 'Type',
    width: 110,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Faite par',
    width: 160,
    editable: true,
  },
  {
    field: 'apogee',
    headerName: 'Apogée',
    width: 130,
    editable: true,
  },
  {
    field: 'cin',
    headerName: 'CIN',
    width: 110,
    editable: true,
  },
  {
    field: 'dossier',
    headerName: ' ',
    sortable: false,
    width: 110,
  },
];

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      //color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}


function Content(props) {
  const { classes } = props;
  const [demandes, setDemandes] = useState();
  const [pageSize, setPageSize] = useState(5);
  const row = <Button>Créer dossier</Button>;
  const index = props.currentIndex;
  /* const data = demandes?.map((demande) => (
    { id: demande[1].id, type: demande[1].type_demande, date: demande[1].date_demande,
       fullName: demande[1].etudiant.nom + ' ' + demande[1].etudiant.prenom,
       apogee: demande[1].etudiant.apogee, cin: demande[1].etudiant_cin,
       dossier: row}
    )); */
  const data = demandes?.map((demande) => (
    { id: demande.id, type: demande.type_demande, date: demande.date_demande,
       fullName: demande.nom + ' ' + demande.prenom,
       apogee: demande.apogee, cin: demande.etudiant_cin,
       dossier: row}
    ));

  useEffect(() => {
      /* async function getAllDemandes() {
        await userService.getAllDemandes().then((response) => {
          setDemandes(Object.entries(response?.data));
        });
      }
      getAllDemandes(); */
      // console.log(index);
      async function filterDemandes() {
        if(index === 0) {
          await userService.filterDemandes("Licence","القانون باللغة العربية").then((response) => {
            setDemandes(response?.data.demandes);
          });
        } else if (index === 1) {
          await userService.filterDemandes("DEUG","القانون باللغة العربية").then((response) => {
            setDemandes(response?.data.demandes);
          });
        } 
      }
      filterDemandes();
    }, [index]);

  const handleLoad = () => {
    window.location.reload(Content);
  };

  const handleNewDemands = () => {
    userService.getNewDemandes();
  };

    /* demandes?.map((demande) => console.log(
      { id: demande[1].id, type: demande[1].type_demande, date: demande[1].date_demande,
       fullName: demande[1].etudiant.nom + ' ' + demande[1].etudiant.prenom,
       apogee: demande[1].etudiant.apogee, cin: demande[1].etudiant_cin }
    ));  */

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
              />
            </Grid>
            <Grid item>
              <Button variant="contained" className={classes.newDemands} onClick={handleNewDemands}>
                <Box fontWeight="fontWeightBold">Nouvelles demandes</Box>
              </Button>
              <Tooltip title="Recharger">
                <IconButton onClick={handleLoad}>
                  <RefreshIcon className={classes.block} color="inherit"/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
      



    <div style={{ height: 375, width: '100%' }} className={classes.MuiDataGrid}>
      <DataGrid
        localeText={frFR.props.MuiDataGrid.localeText}
        rows={data?data:[]}
        columns={columns}
        /* sortModel={[
          { field: 'date', sort: 'desc' },
        ]} */
        checkboxSelection
        disableSelectionOnClick
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 7, 10]}
        components={{
          Pagination: CustomPagination,
        }}
        pagination
      />
    </div>
 

        {/* <Typography color="textSecondary" align="center">
          Pas encore de demandes
        </Typography> */}
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);