import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Grid from '@material-ui/core/Grid';
import UserForm from './UserForm';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import IconButton from '@material-ui/core/IconButton';
import UserService from "../../Services/UserService";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withStyles } from '@material-ui/core/styles';
import { frFR } from '@material-ui/data-grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';



const useStyles = makeStyles((theme) => ({
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

    }
}));
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


});


///Data grid columns
const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
        field: 'email',
        headerName: 'Email',
        width: 300,
        editable: false,
        filterable: false,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 200,
        editable: false,
    },

];


function UsersGrid(props) {

    /////States
    const classes = useStyles();
    const [id, setId] = useState('');
    const [users, setUsers] = useState([]);
    const [disableButton, setDisableButton] = useState(true);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    let [userEdit, setUserEdit] = useState([]);
    const [message, setMessage] = useState('');
    let [searchItem, setSearchItem] = useState('');
    const [roles, setRoles] = useState([]);
    const [roleFilter, setRoleFilter] = useState(0);
    const [deleteUser, setDeleteUser] = useState(false);
    const [chargement, setChargement] = useState("");
    const history = useHistory();

    //////////////////////////////////////////////////////////////
    useEffect(() => {
        //liste utilisateur avec posibilite de recherche
        userService.searchUser(searchItem).then((response) => {
            console.log(response.data.users);
            setUsers(response.data.users);
        }).catch(err => {
            console.log(err);
            setMessage("Erreur de chargement , veuillez reessayer !");

        })

        //liste des roles pour les select
        userService.getAllRoles().then((response) => {
            setRoles(response.data.roles);
        }).catch(err => {
            console.log(err)
        })

        //liste filtre selon role
        if (roleFilter !== 0) {
            userService.filterUser(roleFilter).then((response) => {
                setUsers(response.data.users);
                setChargement(false);
            }).catch(err => {
                setMessage("Erreur de chargement , veuillez reessayer !");

            })
        }
    }, [roleFilter, searchItem, deleteUser]);
    /////////////////////////////////////////////////////////
    ///Callback function to close forms

    const handleCloseCallback = (open, type) => {
        if (type === "edit") {
            setOpenEdit(open);
        } else if (type === "add") {
            setOpenAdd(open);
        }
    }
    /////////////////////////////////////////////////////////
    const handleRowSelection = (e) => {
        setId(e[0]);
        setDisableButton(false);
    }

    /////Open Edit Form with user data
    const handleEdit = () => {
        userService.showUser(id).then((response) => {
            setUserEdit(response.data.user);
            console.log(userEdit);
            setOpenEdit(true);
        }).catch(err => {
            console.log(err)
        });
    }

    /////Open add form
    const handleAdd = () => {
        setOpenAdd(true);

    }

    /////Delete user
    const handleDelete = (e) => {
        swal({
            title: "Etes-vous sure ?",
            text: "Cette action est irreversible !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    userService.delateUser(id).then((response) => {
                        console.log(response.data.message);
                        setDeleteUser(true);
                        swal(response.data.message, {
                            icon: "success",
                        });
                    }).catch((err) => {
                        console.log(err)
                    })

                }
            });


    };
    const handleLoad = () => {
        setRoleFilter(0);
        setSearchItem('');
        setId('');
        setDisableButton(true);
    };

    const handleSearch = (e) => {
        setSearchItem(e.target.value);

    }

    const filterByRole = (e) => {
        setRoleFilter(e.target.value);

    }

    return (
        <Paper className={classes.paper}>
            {/* ///////Search by dates////// */}
            <AppBar style={{ paddingTop: "0px", paddingRight: "20px" }}
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
                        helperText="Filter selon les roles"
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={roleFilter === 0 ? "" : roleFilter}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </AppBar>


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
                                placeholder="Chercher par Apogée, CIN ou CNE ..."
                                fontWeight="fontWeightBold"
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
                            />

                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" size="small"
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
                            </Button>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Recharger">
                                <IconButton onClick={handleLoad}>
                                    <RefreshIcon className={classes.block} color="inherit" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>


                <div style={{ width: '100%' }} className={classes.MuiDataGrid}>
                    {/* {chargement && <LinearProgress color="primary" />} */}
                    <DataGrid
                        localeText={frFR.props.MuiDataGrid.localeText}
                        rows={users}
                        columns={columns}
                        pageSize={10}
                        checkboxSelection={false}
                        disableSelectionOnClick={false}
                        autoHeight={true}
                        NoRowsOverlay
                        onSelectionModelChange={handleRowSelection}
                        disableMultipleSelection={true}
                        disableColumnMenu={true}

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