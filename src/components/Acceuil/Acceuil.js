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
import { makeStyles } from '@material-ui/styles';
import { DataGrid, GridOverlay, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import userService from "../../Services/userService";
import RenderFiche from './RenderFiche';
import Bienvenue from "../../Images/Bienvenue.png"

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
    margin: theme.spacing(6,32.5,-10),
  }
});


function Acceuil(props) {
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
  const filiere = props?.role === 2 ? "القانون باللغة العربية" : 
                  props?.role === 3 ? "Droit en français" : 
                  props?.role === 4 ? "Sciences Economiques et Gestion" : null;


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
  }, [reload]);

  useEffect(() => {
    setFiltredEtudiants(
      etudiants?.filter((etudiant) =>
        (filiere !== null ? etudiant.filiere === filiere : etudiant.filiere !== null) &&
        (etudiant.cin.toLowerCase().includes(search.toLowerCase()) ||
         etudiant.apogee.toLowerCase().includes(search.toLowerCase()) ||
         etudiant.cne.toLowerCase().includes(search.toLowerCase()) )
      )
    );
  }, [search, etudiants]);

  const handleReload = () => {
    setError(null);
    setEtudiants([]);
    setReload(true);
    setSearch('');
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  
  const handleClickPrint = () => {
    setLoadPrint(true);
    handlePrintFiche();
  };

  const componentRef = useRef();
  const pageStyle = '@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 30px !important; } }';
  const handlePrintFiche = useReactToPrint({
        pageStyle: () => pageStyle,
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
                placeholder="Chercher étudiant par Apogée, CIN ou CNE ..."
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
            localeText={frFR.props.MuiDataGrid.localeText}
            autoHeight
            rows={data ? data : []}
            columns={columns}
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
      ) :
     <></>
      }
      
        <Dialog open={open} aria-labelledby="form-dialog-title">
          <IconButton color="primary" aria-label="upload picture" className={classes.closeIcon}
              component="span" size="small" >
              <CloseIcon onClick={handleClose} />
          </IconButton>
          <DialogContent>
          <Button fullWidth variant="outlined" color="primary" size="small" onClick={handleClickPrint}>
              Imprimer 
          </Button>
            <Card className={classes.card}>
              <CardContent>
                <RenderFiche load={loadPrint} etudiantId={etudiantId} ref={componentRef} />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
    </Paper>
      {!search && (
      <div className={classes.image}>
        <img alt="Bienvenue" src={Bienvenue} width={500} height={300}/>
      </div>)}
    </div>
  );
}

Acceuil.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Acceuil);