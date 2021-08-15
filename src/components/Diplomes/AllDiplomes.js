import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import userService from "../../Services/userService";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withStyles } from '@material-ui/core/styles';
import { frFR } from '@material-ui/data-grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DetailsDiplome from './DetailsDiplome';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckIcon from '@material-ui/icons/Check';



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
    contentWrapper: {
        margin: '20px 16px',
    },
    textField: {
        marginLeft: '30px'
    }

});


///Data grid columns
const columns = [
    { field: 'id', headerName: 'ID Diplome', width: 20 },
    { field: 'cin', headerName: 'CIN', width: 100 },
    { field: 'cne', headerName: 'CNE', width: 100 },
    { field: 'apogee', headerName: 'Apogee', width: 110 },
    {
        field: 'nom',
        headerName: 'Nom',
        width: 150,
        editable: false,
        filterable: false,

    },
    {
        field: 'prenom',
        headerName: 'Prénom',
        width: 150,
        editable: false,
    },
    {
        field: 'filiere',
        headerName: 'Filière',
        width: 150,
        editable: false,
        filterable: false,
    },
    {
        field: 'type_demande',
        headerName: 'Type diplome',
        width: 150,
        editable: false,
        filterable: false,

    },

];


function AllDiplomes(props) {

    /////States
    const classes = useStyles();
    const [id, setId] = useState('');
    const [diplomes, setDiplomes] = useState([]);
    const [diplome, setDiplome] = useState('');
    const [disableButton, setDisableButton] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    let [searchItem, setSearchItem] = useState('');
    const history = useHistory();
    const [type, setType] = useState('');
    const [dateDebut, setDateDebut] = React.useState('');
    const [dateFin, setDateFin] = React.useState('');

    const handleDateDebut = (e) => {
        console.log('dateDebut');
        console.log(e.target.value);
        setDateDebut(e.target.value);
    };

    const handleDateFin = (e) => {
        console.log(e.target.value);
        setDateFin(e.target.value);
    };


    //////////////////////////////////////////////////////////////
    useEffect(() => {
        if(type === ''){
            userService.getAllDiplomes(searchItem).then((response) => {
                setDiplomes(response.data.diplomes)
            }).catch(err => {
                console.log(err);
                setMessage("Erreur de chargement , veuillez reessayer !");
            })
        }
        else{
            userService.diplomesByType(type).then((response) => {
                setDiplomes(response.data.diplomes)
            }).catch(err => {
                console.log(err);
                setMessage("Erreur de chargement , veuillez reessayer !");
            })
        }
    }, [searchItem, dateDebut, dateFin ,type]);

    /////////////////////////////////////////////////////////

    ///Callback function to close forms
    const handleCloseCallback = (open) => {
        setOpen(open);
    }
    /////////////////////////////////////////////////////////
    const handleRowSelection = (e) => {
        setId(e[0]);
        setDisableButton(false);
    }

    const handleLoad = () => {
        setSearchItem('');
        setId('');
        setDateDebut('');
        setDateFin('');
        setType('');
        setDisableButton(true);
    };

    const handleSearch = (e) => {
        setSearchItem(e.target.value);


    }

    const showDetails = () => {
        userService.showDiplome(id).then(response => {
            setDiplome(response.data.diplome);
            setOpen(true)

        }).catch(err => {
            console.log(err);
            setMessage("Erreur de chargement , veuillez reessayer !");

        })
    }

    const handleDatesSelection = () => {
        setDisableButton(true)
        userService.diplomesByDates(dateDebut, dateFin).then((response) => {
            setDiplomes(response.data.diplomes)
        }).catch(err => {
            console.log(err);
            setMessage("Erreur de chargement , veuillez reessayer !");
        })
    }

    const handleDeug = () => {
       setType("DEUG");
    }
    const handleLicence = () => {
        setType("licence")
        
    }
    ////////////////////////////////////////////////////////////


    return (
        <Paper className={classes.paper}>

            {/* ///////Search by dates////// */}
            <AppBar style={{ paddingBottom: "5px", paddingTop: "15px" }}
                position="static" color="default" elevation={0}>
                <Grid container justifyContent="flex-end"
                    alignItems="flex-start"
                >
                    <TextField
                        style={{ paddingRight: "8px" }}
                        id="date"
                        label="Date début"
                        type="date"
                        value={dateDebut}
                        onChange={handleDateDebut}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size="small"
                        variant="outlined"
                    />
                    <TextField
                        id="date"
                        label="Date fin"
                        type="date"
                        value={dateFin}
                        onChange={handleDateFin}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size="small"
                        variant="outlined"
                    />
                    <Tooltip title="Appliquer">
                        <IconButton onClick={handleDatesSelection}>
                            <CheckIcon className={classes.block} color="primary" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </AppBar>

            {/* ////////////////DEUG/LICENCE////////////////// */}
            <AppBar
                component="div"
                className={classes.secondaryBar}
                style={{ background: "#0268B5" }}
                position="static"
                elevation={0}
            >
                <ButtonGroup variant="text" size="large" 
                    color="inherit" aria-label="text primary button group">
                    <Button onClick={handleDeug}>DEUG</Button>
                    <Button onClick={handleLicence}>Licence</Button>
                </ButtonGroup>
            </AppBar>

            {/* ///////////////DATA Grid/////////////// */}
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
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
                                // helperText="La recherche est sensible a la casse"
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
                            />

                        </Grid>

                        <Grid item>
                            <Button variant="contained" color="primary" size="small"
                                className={classes.button} startIcon={<VisibilityIcon />}
                                disabled={disableButton}
                                onClick={showDetails}
                            >Voir parcours
                            </Button>

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
                        rows={diplomes}
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
            </div>
            {open &&
                <DetailsDiplome handleOpen={open} diplome={diplome} title="Détails"
                    closeCallback={handleCloseCallback} />
            }
        </Paper>

    );
}
AllDiplomes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllDiplomes);