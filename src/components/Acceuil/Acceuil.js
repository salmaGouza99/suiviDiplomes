import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PrintIcon from "@material-ui/icons/Print";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { DataGrid, GridOverlay, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import userService from "../../Services/userService";
import RenderFiche from './RenderFiche';
import Bienvenue from "../../Images/bienvenue.png";

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
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  alert: {
    marginTop: -theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  contentWrapper: {
    margin: '20px 16px',
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  MuiDataGrid: {
    '& .traitee': {
      color: theme.palette.info.main
    },
    '& .nonTraitee': {
      color: 'gray'
    },
  },
  image: {
    margin: theme.spacing(15,34,-10),
  }
});


function Acceuil(props) {
  // States
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [etudiantId, setEtudiantId] = useState(null);
  const [etudiants, setEtudiants] = useState();
  const [search, setSearch] = useState("");
  const [filtredEtudiants, setFiltredEtudiants] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [load, setLoad] = useState();
  const [loadPrint, setLoadPrint] = useState();
  const [reload, setReload] = useState(false);
  const [error, setError] = useState();
  // set filiere according to the user role
  const filiere = props?.role === 2 ? "القانون باللغة العربية" : 
                  props?.role === 3 ? "Droit en français" : 
                  props?.role === 4 ? "Sciences Economiques et Gestion" : null;

  // data grid columns
  const columns = [
    {
      field: 'id',
      hide: true,
    },
    {
      field: 'apogee',
      headerName: 'Apogée',
      width: 109,
    },
    {
      field: 'cin',
      headerName: 'CIN',
      width: 120,
    },
    {
      field: 'cne',
      headerName: 'CNE',
      width: 120,
    },
    {
      field: 'fullName',
      headerName: 'Nom complet',
      width: 170,
    },
    {
      field: 'filiere',
      headerName: 'Filière',
      width: 160,
    },
    {
      field: 'type',
      sortable: false,
      headerName: 'Type demande',
      width: 140,
    },
    {
      field: 'info',
      headerName: ' ',
      sortable: false,
      width: 70,
      renderCell: (params) => {
        const showInfo = () => {
          // show info of the chosen etudiant
          setOpen(true);
          setEtudiantId(params.id);
        };
          
        return (
          <Tooltip title="Imprimer fiche étudiant">
            <IconButton style={{ marginLeft: 8 }}>
              <PrintIcon onClick={showInfo}
                style={{ color: 'gray' }} />
            </IconButton>
          </Tooltip>
        );
      }
    },
  ];

  // data grid rows : it's the filtred etudiants
  const data = filtredEtudiants?.map((etudiant) => (
    {
      id: etudiant.cin, apogee: etudiant.apogee, cin: etudiant.cin,
      cne: etudiant.cin, fullName: etudiant.nom + ' ' + etudiant.prenom,
      filiere: etudiant.filiere, type: etudiant.demande.map((demande) => (demande.type_demande)), 
    }
  ));

  useEffect(() => {
    setLoad(true);
    setReload(false);
    // list of all students without filtres
    userService.getAllEtudiants()
      .then((response) => {
        setLoad(false);
        setError(null);
        setEtudiants(response?.data?.etudiants);
      }).catch((error) => {
        console.log(error);
        setLoad(false);
        setError("Erreur de chargement, veuillez réssayer.");
      });
  // this code will be called in every refresh
  }, [reload]);

  useEffect(() => {
    setFiltredEtudiants(
      // filter the above demandes list by :
      etudiants?.filter((etudiant) =>
        // filiere
        (filiere !== null ? etudiant.filiere === filiere : etudiant.filiere !== null) 
        // input search
        &&
        (etudiant.cin.toLowerCase().includes(search.toLowerCase()) ||
         etudiant.apogee.toLowerCase().includes(search.toLowerCase()) ||
         etudiant.cne.toLowerCase().includes(search.toLowerCase()) )
      )
    );
  // this code will be called if there is an input search 
  }, [search, etudiants]);

  // handle refresh all states
  const handleReload = () => {
    setError(null);
    setEtudiants([]);
    setReload(true);
    setSearch('');
  };

  // close the dialog of opened student info
  const handleClose = () => {
    setOpen(false);
  };
  
  // handle print ficheEtudiant
  const handleClickPrint = () => {
    setLoadPrint(true);
    handlePrintFiche();
  };

  const componentRef = useRef();
  const pageStyle = '@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 30px !important; } }';
  const handlePrintFiche = useReactToPrint({
        pageStyle: () => pageStyle,
        // give the reference to the current component (which will be the FicheEtudiant component) to print it
        content: () => componentRef.current,
        documentTitle: etudiantId,
        onAfterPrint: () => (setLoadPrint(false), setOpen(false)),
  });

  return (
    <div>
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
                placeholder="Chercher un étudiant par son Apogée, CIN ou CNE ..."
                fontWeight="fontWeightBold"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </Grid>
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
      </Paper>
      <br></br>
     <Paper className={classes.paper}>
      {search ? (
        // if there is an input search show the results of search
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
        <div style={{ width: '100%' }} className={classes.MuiDataGrid}>
          <DataGrid
            // list of filtred students
            localeText={frFR.props.MuiDataGrid.localeText}
            autoHeight
            rows={data ? data : []}
            columns={columns}
            disableSelectionOnClick
            disableColumnMenu
            pageSize={pageSize}
            components={{
              Pagination: CustomPagination,
              LoadingOverlay: CustomLoadingOverlay,
            }}
            pagination
            loading={load}
          />
        </div>
      </div>
      ) :
     <></>
      }
      
      {/* Opeb the dialog of student info if open true */}
        <Dialog open={open} aria-labelledby="form-dialog-title">
          <IconButton color="primary" aria-label="upload picture" className={classes.closeIcon}
              component="span" size="small" >
              <CloseIcon onClick={handleClose} />
          </IconButton>
          <DialogContent>
          <Button fullWidth variant="outlined" style={{color: '#bb0086'}} size="small" onClick={handleClickPrint}>
              Imprimer 
          </Button>
            <Card >
              <CardContent >
                <RenderFiche load={loadPrint} etudiantId={etudiantId} ref={componentRef} />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
    </Paper>

      {!search && (
        // if there is no input search show a WELCOME image
      <div className={classes.image}>
        <img alt="Bienvenue" src={Bienvenue} width={465} height={145}/>
      </div>)}
    </div>
  );
}

Acceuil.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Acceuil);