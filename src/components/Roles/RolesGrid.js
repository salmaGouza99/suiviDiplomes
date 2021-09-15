import React, { useEffect, useState } from 'react';
import { DataGrid, GridOverlay, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withStyles } from '@material-ui/core/styles';
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
        maxWidth: 940,
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
    root: {
        maxWidth: "90%",
    },
    groupButtons: {
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(60),
    },
    button: {
        margin: theme.spacing(1),
    },
    container: {
        marginTop: theme.spacing(20),
    },
    margin: {
        marginTop: theme.spacing(5),
    },
    search: {
        marginBottom: theme.spacing(8)
    },
    closeButton: {
        marginTop: theme.spacing(4)
    },
    button1: {
        background: '#0a9ce6',
        '&:hover': {
          background: "#5ea2d7",
        },
        color: theme.palette.common.white,
    },
    button2: {
        background: '#f10259',
        '&:hover': {
          background: "#f05c94",
        },
        color: theme.palette.common.white,
    },
});


// Data grid columns
const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    {
        field: 'name',
        headerName: 'Nom du rôle',
        width: 300,
        editable: false,
    },
];

function RolesGrid(props) {
    // States
    const { classes } = props;
    const [roles, setRoles] = useState([]);
    const [filtredRoles, setFiltredRoles] = useState([]);
    const [message, setMessage] = useState(null);
    let [searchItem, setSearchItem] = useState('');
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        setLoad(reload ? true : false);
        // list of roles
        userService.getAllRoles().then((response) => {
            setLoad(false);
            setReload(false);
            setRoles(response.data.roles);
        }).catch(err => {
            console.log(err);
            setLoad(false);
            setReload(false);
            setMessage("Erreur de chargement, veuillez réessayer.");
        })
    // this code will be called in the refresh case
    },[reload]);

    useEffect(() => {
        // filtred th roles according to the search input
        setFiltredRoles(
        roles?.filter((role) =>
                (role.name.toLowerCase().includes(searchItem.toLowerCase()) )  ));
        setMessage(null);
    },[searchItem, roles])

    // refresh the list of roles
    const handleReload = () => {
        setSearchItem('');
        setLoad(true);
        setRoles([]);
        setMessage(null);
        setReload(true);
    };

    const handleSearch = (e) => {
        setSearchItem(e.target.value);
    };

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <SearchIcon className={classes.block} color="inherit" />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                onChange={handleSearch}
                                value={searchItem}
                                fullWidth
                                placeholder="Chercher par nom du rôle ..."
                                fontWeight="fontWeightBold"
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
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
            <div className={classes.contentWrapper}>
            {message  && (
                <Alert className={classes.alert}
                    severity="error"
                    onClose={() => {
                        setMessage(null);
                    }}
                >
                    {message}
                </Alert>
                )}

                <div style={{ width: '100%' }} className={classes.MuiDataGrid}>
                    {/* List of filtred roles */}
                    <DataGrid
                        localeText={frFR.props.MuiDataGrid.localeText}
                        rows={filtredRoles}
                        columns={columns}
                        pageSize={8}
                        checkboxSelection={false}
                        disableSelectionOnClick={true}
                        autoHeight={true}
                        NoRowsOverlay
                        disableMultipleSelection={true}
                        disableColumnMenu={true}
                        components={{
                            Pagination: CustomPagination,
                            LoadingOverlay: CustomLoadingOverlay,
                        }}
                        pagination
                        loading={load}
                    />
                </div>
            </div>
        </Paper>

    );
}
RolesGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RolesGrid);