import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import UserForm from './UserForm';
import swal from 'sweetalert';
import Alert from "@material-ui/lab/Alert";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import userService from "../../Services/userService";


const useStyles = makeStyles((theme) => ({
    root:{
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
    closeButton : {
        marginTop: theme.spacing(4)

    }
}));


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


export default function UsersGrid(props) {

    /////States
    const classes = useStyles();
    const [id, setId] = useState('');
    const [users, setUsers] = useState([]);
    const [disableButton, setDisableButton] = useState(true);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    let   [userEdit, setUserEdit] = useState([]);
    const [message, setMessage] = useState('');
    let   [searchItem, setSearchItem] = useState('');
    const [roles, setRoles] = useState([]);
    const [roleFilter, setRoleFilter] = useState(0);
    const [deleteUser, setDeleteUser] = useState(false);
    const [chargement, setChargement] = useState("");
    const history = useHistory();

    //////////////////////////////////////////////////////////////
    useEffect(() => {
        if (props?.role !== 1) {
            history.push("/Acceuil");
            window.location.reload();  
        }
       setChargement(true);
        //liste utilisateur avec posibilite de recherche
        userService.searchUser(searchItem).then((response) => {
            console.log(response.data.users);
                setUsers(response.data.users);
                setChargement(false);
            }).catch(err => {
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

    const handleSearch = (e) => {
        setSearchItem(e.target.value);

    }

    const filterByRole = (e) => {
        setRoleFilter(e.target.value);

    }
    const cancelFilter = (e) => {
        setRoleFilter(0);
    }

    const cancelSearch = (e) => {
        setSearchItem('');
    }
    return (
        <Container className={classes.root}  >
           
            {message && (
                <Alert
                    severity="error"
                    onClose={() => { setMessage(null); }}
                >{message}</Alert>
            )}

            <div>
            <Grid container spacing={0}>
                <Grid item xs={7} >
                   {/* search bar */}
                    <Grid container spacing={1} alignItems="flex-end" className={classes.margin}>
                        <Grid item>
                            <TextField id="input-with-icon-grid" value={searchItem} 
                            placeholder="Recherche ..." 
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleSearch} />
                        </Grid>
                        <Grid item>
                            <IconButton color="primary" aria-label="upload picture" component="span" size="small">
                                <CloseIcon onClick={cancelSearch} />
                            </IconButton>
                        </Grid>
                    {/* ///////////////////////////////////////// */}
                     </Grid>
                </Grid>
                {/* <Grid item xs={8}></Grid> */}
                
                <Grid item xs={4} className={classes.search}>
                
                    <TextField
                            id="standard-select-currency"
                            select
                            onChange={filterByRole}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                            helperText="Filter selon les roles"
                            className={classes.margin}
                            variant="standard"
                            margin="normal"
                            size="small"
                            value={roleFilter ===0 ? "" : roleFilter}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </TextField>
                </Grid>
                <Grid item xs={1} className={classes.closeButton}>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <CloseIcon onClick={cancelFilter} />
                    </IconButton>
                </Grid>
                
                <Grid item xs={1}>
                    <Button variant="contained" color="primary" size="small"
                        className={classes.button} startIcon={<EditIcon />}
                        disabled={disableButton} 
                       onClick={handleEdit}>Editer
                    </Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" color="secondary" size="small"
                        className={classes.button} startIcon={<DeleteIcon />}
                        disabled={disableButton} 
                        onClick={handleDelete}>Supprimer
                    </Button>
                </Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="secondary" size="small"
                        className={classes.button} startIcon={<AddBoxRoundedIcon />}
                        onClick={handleAdd}>Ajouter
                    </Button>
                </Grid>

                <Grid item xs={12}>
                {chargement && <LinearProgress color="secondary"/>}
                <DataGrid
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
                </Grid>
            </Grid>
        </div>
            {openEdit ? 
                <UserForm handleOpen={openEdit} user={userEdit} title="Editer utilisateur" formType="edit" roles={roles} />
                : <div></div>}

            {openAdd ? 
                <UserForm handleOpen={openAdd} title="Ajouter utilisateur" formType="add" roles={roles} /> 
                : <div></div>}
        </Container>
    );
}