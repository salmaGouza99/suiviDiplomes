import React, { useEffect, useState } from 'react';
import { DataGrid, GridOverlay, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withStyles } from '@material-ui/core/styles';
import userService from "../../Services/userService";
import UserForm from './UserForm';

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


///Data grid columns
const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
        field: 'email',
        headerName: 'Identifiant',
        width: 300,
        editable: false,
        filterable: false,
    },
    {
        field: 'role',
        headerName: 'Rôle',
        width: 200,
        editable: false,
    },
];

function UsersGrid(props) {

    /////States
    const { classes } = props;
    const [id, setId] = useState([]);
    const [users, setUsers] = useState([]);
    const [filtredUsers, setFiltredUsers] = useState([]);
    const [disableButton, setDisableButton] = useState(true);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    let [userEdit, setUserEdit] = useState([]);
    const [message, setMessage] = useState(null);
    let [searchItem, setSearchItem] = useState('');
    const [roles, setRoles] = useState([]);
    const [roleFilter, setRoleFilter] = useState(null);
    const [deleteUser, setDeleteUser] = useState(false);
    const [addUser, setAddUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(true);

    //////////////////////////////////////////////////////////////
    useEffect(() => {
        setLoad(reload ? true : false);
        //liste utilisateur avec posibilite de recherche
        userService.getAllUsers().then((response) => {
            setLoad(false);
            setReload(false);
            setUsers(response.data.users);
        }).catch(err => {
            console.log(err);
            setLoad(false);
            setReload(false);
            setMessage("Erreur de chargement, veuillez réessayer.");
        })
        //liste des roles pour les select
        userService.getAllRoles().then((response) => {
            setRoles(response.data.roles);
        }).catch(err => {
            console.log(err);
            setMessage("Erreur de chargement des rôles, veuillez réessayer.");
        })
    },[deleteUser, addUser, editUser, reload]);
    //}, [roleFilter, searchItem, deleteUser,disableButton]);
    /////////////////////////////////////////////////////////

    useEffect(() => {
        //liste filtre selon role et search
        setFiltredUsers(
        users?.filter((user) =>
                (user.email !== props?.user.email) &&
                (user.email.toLowerCase().includes(searchItem.toLowerCase()) ) && 
                (roleFilter !== null ? user.roleId === roleFilter : user.roleId !== null) ));
        setMessage(null);
    },[roleFilter, searchItem, users])

    useEffect(() => {
        setDisableButton(id.length === 0 ? true : false);
    },[id])

    ///Callback function to close forms
    const handleCloseCallback = (open, type) => {
        if (type === "edit") {
            setOpenEdit(open);
            setEditUser(true);
        } else if (type === "add") {
            setOpenAdd(open);
            setAddUser(true);
        }
    }
    /////////////////////////////////////////////////////////
    const handleRowSelection = (e) => {
        if(e[0]) {
            setId(e[0]);
            setDisableButton(false);
        }
    }

    /////Open Edit Form with user data
    const handleEdit = () => {
        setEditUser(false);
        setMessage(null);
        userService.showUser(id).then((response) => {
            setUserEdit(response.data.user);
            setOpenEdit(true);
        }).catch((err) => {
            console.log(err);
            setMessage("Une erreur est servenue, veuillez réessayer.");
        });
    }

    /////Open add form
    const handleAdd = () => {
        setMessage(null);
        setAddUser(false);
        setOpenAdd(true);
    }

    /////Delete user
    const handleDelete = (e) => {
        setDeleteUser(false);
        setMessage(null);
        swal({
            title: "Êtes-vous sûr ?",
            text: "Cette action est irreversible !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    userService.delateUser(id).then((response) => {
                        // console.log(response.data.message);
                        setDeleteUser(true);
                        setId([]);
                        swal({
                            title: response.data.message,
                            text: "",
                            icon: "success",
                        });
                    }).catch((err) => {
                        console.log(err);
                        setMessage("Une erreur est servenue lors de la suppression d'utilisateur, veuillez réessayer.")
                    })

                }
            });
    };
    const handleReload = () => {
        setRoleFilter(null);
        setSearchItem('');
        setId([]);
        setDisableButton(true);
        setLoad(true);
        setUsers([]);
        setMessage(null);
        setReload(true);
    };

    const handleSearch = (e) => {
        setSearchItem(e.target.value);
    }

    const filterByRole = (e) => {
        setId([]);
        setRoleFilter(e.target.value);
    }

    return (
        <Paper className={classes.paper}>
            {/* ///////Filter by role////// */}
            {/* <AppBar style={{ paddingTop: "0px", paddingRight: "20px" }}
                position="static" color="#fff" elevation={0}>
                <Grid container justifyContent="flex-end"
                    alignItems="flex-start"
                >
                    <TextField
                    style={{paddingLeft: "15px" , paddingBottom: "15px"}}
                        id="standard-select-currency"
                        select
                        fullWidth
                        onChange={filterByRole}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon />
                                </InputAdornment>
                            ),
                        }}
                        helperText="Filtrer selon les rôles"
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={roleFilter === null ? "" : roleFilter}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </AppBar> */}
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
                                placeholder="Chercher par Identifiant ..."
                                fontWeight="fontWeightBold"
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                style={{minWidth: 180}}
                                id="standard-select-currency"
                                select
                                label="Filtrer selon les rôles"
                                onChange={filterByRole}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonOutlineIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                margin="normal"
                                size="small"
                                value={roleFilter}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item>
                            {/* <Button variant="contained" color="primary" size="small"
                                className={classes.button} startIcon={<AddBoxRoundedIcon />}
                                onClick={handleAdd}>Ajouter
                            </Button>
                            <Button variant="contained" color="primary" size="small"
                                className={classes.button} startIcon={<EditIcon />}
                                disabled={disableButton}
                                onClick={handleEdit}>Editer
                            </Button>

                            <Button variant="contained" color="secondary" size="small"
                                className={classes.button} startIcon={<DeleteIcon />}
                                disabled={disableButton}
                                onClick={handleDelete}>Supprimer
                            </Button> */}
                        </Grid>
                        <Grid item>
                            <Tooltip title="Ajouter">
                                <div style={{marginLeft: 8}}>
                                    <IconButton className={classes.button1} onClick={handleAdd}>
                                        <PersonAddIcon/>
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Editer">
                                <div>
                                    <IconButton className={classes.button1} onClick={handleEdit}
                                        disabled={disableButton}>
                                        <EditIcon/>
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Supprimer">
                                <div style={{marginRight: -5}}>
                                    <IconButton className={classes.button2} onClick={handleDelete}
                                        disabled={disableButton}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </Tooltip>
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
                    {/* {chargement && <LinearProgress color="primary" />} */}
                    <DataGrid
                        localeText={frFR.props.MuiDataGrid.localeText}
                        rows={filtredUsers}
                        columns={columns}
                        pageSize={10}
                        checkboxSelection={false}
                        disableSelectionOnClick={false}
                        autoHeight={true}
                        NoRowsOverlay
                        onSelectionModelChange={handleRowSelection}
                        selectionModel={id}
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

                {openEdit ?
                    <UserForm handleOpen={openEdit} user={userEdit} title="Editer utilisateur"
                        closeCallback={handleCloseCallback} formType="edit" roles={roles} />
                    : <div></div>}

                {openAdd ?
                    <UserForm handleOpen={openAdd} title="Ajouter utilisateur"
                        closeCallback={handleCloseCallback} formType="add" roles={roles} />
                    : <div></div>}
            </div>
        </Paper>

    );
}
UsersGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersGrid);