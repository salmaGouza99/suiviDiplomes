import React, { useEffect, useState } from 'react';
import { DataGrid, GridOverlay, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
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
import RoleForm from './RoleForm';

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
    { field: 'id', headerName: 'ID', width: 200 },
    {
        field: 'name',
        headerName: 'Nom du rôle',
        width: 300,
        editable: false,
    },
];

function RolesGrid(props) {
    /////States
    const { classes } = props;
    const [id, setId] = useState([]);
    const [roles, setRoles] = useState([]);
    const [filtredRoles, setFiltredRoles] = useState([]);
    const [disableButton, setDisableButton] = useState(true);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    let [roleEdit, setRoleEdit] = useState([]);
    const [message, setMessage] = useState(null);
    let [searchItem, setSearchItem] = useState('');
    const [deleteRole, setDeleteRole] = useState(false);
    const [addRole, setAddRole] = useState(false);
    const [editRole, setEditRole] = useState(false);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(true);

    //////////////////////////////////////////////////////////////
    useEffect(() => {
        setLoad(reload ? true : false);
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
    },[deleteRole, addRole, editRole, reload]);

    useEffect(() => {
        setFiltredRoles(
        roles?.filter((role) =>
                (role.name.toLowerCase().includes(searchItem.toLowerCase()) )  ));
        setMessage(null);
    },[searchItem, roles])

    useEffect(() => {
        setDisableButton(id.length === 0 ? true : false);
    },[id])

    ///Callback function to close forms
    const handleCloseCallback = (open, type) => {
        if (type === "edit") {
            setOpenEdit(open);
            setEditRole(true);
        } else if (type === "add") {
            setOpenAdd(open);
            setAddRole(true);
        }
    }
    /////////////////////////////////////////////////////////
    const handleRowSelection = (e) => {
        if(e[0]) {
            setId(e[0]);
            setDisableButton(false);
        }
    }

    /////Open Edit Form with role data
    const handleEdit = () => {
        setEditRole(false);
        setMessage(null);
        userService.showRole(id).then((response) => {
            setRoleEdit(response.data.role);
            setOpenEdit(true);
        }).catch((err) => {
            console.log(err);
            setMessage("Une erreur est servenue, veuillez réessayer.");
        });
    }

    /////Open add form
    const handleAdd = () => {
        setMessage(null);
        setAddRole(false);
        setOpenAdd(true);
    }

    /////Delete role
    const handleDelete = (e) => {
        setDeleteRole(false);
        setMessage(null);
        swal({
            title: "Êtes-vous sûr ?",
            text: "Tous les utilisateurs associés à ce rôle seront supprimés !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    userService.delateRole(id).then((response) => {
                        setDeleteRole(true);
                        setId([]);
                        swal({
                            title: response.data.message,
                            text: "",
                            icon: "success",
                        });
                    }).catch((err) => {
                        console.log(err);
                        setMessage("Une erreur est servenue lors de la suppression de rôle, veuillez réessayer.")
                    })
                }
            });
    };
    const handleReload = () => {
        setSearchItem('');
        setId([]);
        setDisableButton(true);
        setLoad(true);
        setRoles([]);
        setMessage(null);
        setReload(true);
    };

    const handleSearch = (e) => {
        setSearchItem(e.target.value);
    }

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
                    <DataGrid
                        localeText={frFR.props.MuiDataGrid.localeText}
                        rows={filtredRoles}
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
                    <RoleForm handleOpen={openEdit} role={roleEdit} title="Editer rôle"
                        closeCallback={handleCloseCallback} formType="edit"/>
                    : <div></div>}

                {openAdd ?
                    <RoleForm handleOpen={openAdd} title="Ajouter rôle"
                        closeCallback={handleCloseCallback} formType="add" />
                    : <div></div>}
            </div>
        </Paper>

    );
}
RolesGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RolesGrid);