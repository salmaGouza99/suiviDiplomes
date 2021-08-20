import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
import ListAltIcon from '@material-ui/icons/ListAlt';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';



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
    const [filtredDiplomes, setFiltredDiplomes] = useState([]);
    const [diplome, setDiplome] = useState('');
    const [disableButton, setDisableButton] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    let [searchItem, setSearchItem] = useState('');
    const history = useHistory();
    const [type, setType] = useState(0);
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [statuts, setStatuts] = useState([]);
    const [currentStatut, setCurrenStatut] = useState(0);
    const [filiere, setFiliere] = useState('');

    const handleDateDebut = (e) => {
        console.log('dateDebut');
        console.log(e.target.value);
        setDateDebut(e.target.value);
    };

    const handleDateFin = (e) => {
        console.log(e.target.value);
        setDateFin(e.target.value);
    };

    useEffect(() => {
        userService.getAllDiplomes().then((response) => {
            setDiplomes(response.data.diplomes)
        }).catch(err => {
            console.log(err);
            setMessage("Erreur de chargement , veuillez reessayer !");
        })

        userService.statutsDiplomes().then((response) => {
            setStatuts(response.data.statuts)
        }).catch(err => {
            console.log(err);
            setMessage("Erreur de chargement , veuillez reessayer !");
        })

    }, [])
    //////////////////////////////////////////////////////////////
    useEffect(() => {
        
        //default
        setFiltredDiplomes(
            diplomes?.filter((diplome) =>
                diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                diplome.cne.toLowerCase().includes(searchItem.toLowerCase())
            )
        );
        //Type seulement
        if (type !== 0 && currentStatut === 0 && dateDebut === '' && dateFin === '' && filiere === '') {
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                    diplome.type_demande === type
                )
            );
        } 
        ////Statut seulement
        else if (type === 0 && currentStatut !== 0 && dateDebut === '' && dateFin === '' && filiere === '') {
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                    diplome.statut_id === currentStatut
                )
            );
        }
        ////date debut seulement
        else if (type === 0 && currentStatut === 0 && dateDebut !== '' && dateFin === '' && filiere === '') {
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                    diplome.date_demande >= dateDebut
                )
            );
        }
        // date debut et fin seulement
        else if (type === 0 && currentStatut === 0 && dateDebut !== '' && dateFin !== '' && filiere === '') {
            console.log('type')
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                    diplome.date_demande >= dateDebut &&
                    diplome.dateFin <= dateFin
                )
            );
        } 
        ///Filiere seulemet
        else if (type === 0 && currentStatut === 0 && dateDebut === '' && dateFin === '' && filiere !== '') {
            console.log('type')
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                        diplome.filiere.toLowerCase().includes(filiere.toLocaleLowerCase())
                )
            );
        }
////////////////////////////////////////Combinaisons///////////////////////////////////////////////////////
        ///type && statut
        else if (type !== 0 && currentStatut !== 0 && dateDebut === '' && dateFin === ''   && filiere === '') {
            console.log('type')
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                    diplome.type_demande === type &&
                    diplome.statut_id === currentStatut
                )
            );
        } 
        ///type && date debut
        else if (type !== 0 && currentStatut === 0 && dateDebut !== '' && dateFin === ''  && filiere === '') {
            console.log('type')
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                        diplome.type_demande === type &&
                        diplome.date_demande >= dateDebut
                )
            );
        } 
        //type && date debut && date fin
        else if (type !== 0 && currentStatut === 0 && dateDebut !== '' && dateFin !== ''  && filiere === '') {
            console.log('type')
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                    diplome.type_demande === type &&
                    diplome.date_demande >= dateDebut &&
                    diplome.dateFin <= dateFin
                )
            );
        } 
        //type & filiere
        else if (type !== 0 && currentStatut === 0 && dateDebut === '' && dateFin === ''  && filiere !== '') {
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                        diplome.type_demande === type &&
                        diplome.filiere.toLowerCase().includes(filiere.toLocaleLowerCase())
                )
            );
        }
        ///statut && date debut
        else if (type === 0 && currentStatut !== 0 && dateDebut !== '' && dateFin === ''  && filiere === '') {
            console.log('type')
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                        diplome.statut_id === currentStatut &&
                        diplome.date_demande >= dateDebut
                )
            );
        }
         ///statut && date debut && date fin
        else if (type === 0 && currentStatut !== 0 && dateDebut !== '' && dateFin !== ''  && filiere === '') {
            console.log('type')
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                        diplome.statut_id === currentStatut &&
                        diplome.date_demande >= dateDebut &&
                        diplome.date_demande <= dateFin
                )
            );
        }
        //statut && filiere
        else if (type === 0 && currentStatut !== 0 && dateDebut === '' && dateFin === ''  && filiere !== '') {
            console.log('type')
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                        diplome.statut_id === currentStatut &&
                        diplome.filiere.toLowerCase().includes(filiere.toLocaleLowerCase())
                   
                )
            );
        }
         //filiere && date debut
         else if (type === 0 && currentStatut === 0 && dateDebut !== '' && dateFin === ''  && filiere !== '') {
            console.log('type')
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                        diplome.date_demande >= dateDebut &&
                        diplome.filiere.toLowerCase().includes(filiere.toLocaleLowerCase())
                   
                )
            );
        }
         //filiere && date debut && date fin
         else if (type === 0 && currentStatut === 0 && dateDebut !== '' && dateFin !== ''  && filiere !== '') {
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                        diplome.date_demande >= dateDebut &&
                        diplome.date_demande <= dateFin &&
                        diplome.filiere.toLowerCase().includes(filiere.toLocaleLowerCase())
                   
                )
            );
        }
        
    }, [diplomes, searchItem, type, dateDebut, dateFin, currentStatut, filiere]);

    /////////////////////////////////////////////////////////


    ///Callback function to close forms
    const handleCloseCallback = (open) => {
        setOpen(open);
    };
    /////////////////////////////////////////////////////////
    const handleRowSelection = (e) => {
        setId(e[0]);
        setDisableButton(false);
    };

    const handleLoad = () => {
        setSearchItem('');
        setId('');
        setDateDebut('');
        setDateFin('');
        setFiliere('');
        setType(0);
        setCurrenStatut(0);
        setDisableButton(true);
    };

    const handleSearch = (e) => {
        setSearchItem(e.target.value);
    };

    const showDetails = () => {
        setOpen(true);
    };

    const handleDeug = () => {
        setType("DEUG");
    }
    const handleLicence = () => {
        setType("licence")

    }

    const filterByStatut = (e) => {
        setCurrenStatut(e.target.value)
    }

    const filterByFiliere = (e) => {
        setFiliere(e.target.value);
    }
    ////////////////////////////////////////////////////////////


    return (
        <Paper className={classes.paper}>
            {/* ///////Search by dates////// */}
            <AppBar
                position="static" color="default" elevation={0}>
                <Grid container justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <TextField
                        style={{ paddingRight: "5px" }}
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
                </Grid>
            </AppBar>
            {/* ///////Filter by statut////// */}
            <AppBar style={{ paddingTop: "0px", paddingRight: "20px" }}
                position="static" color="#fff" elevation={0}>
                <Grid container justifyContent="flex-end"
                    alignItems="flex-start"
                >
                    <TextField
                        style={{ paddingLeft: "15px", paddingBottom: "2px" }}
                        id="standard-select-currency"
                        select

                        onChange={filterByStatut}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AssessmentOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        helperText="Filter selon statut du diplome"
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={currentStatut === 0 ? "" : currentStatut}
                    >
                        {statuts.map((statut) => (
                            <MenuItem key={statut.id} value={statut.id}>
                                {statut.statut}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* ///////Filter by filiere////// */}
                    <TextField
                        style={{ paddingLeft: "15px", paddingBottom: "2px" }}
                        id="standard-select-currency"
                        select

                        onChange={filterByFiliere}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ListAltIcon />
                                </InputAdornment>
                            ),
                        }}
                        helperText="Filter selon les filières"
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={filiere}
                    >
                        <MenuItem key={1} value="Droit Arabe">
                            Droit Arabe
                        </MenuItem>
                        <MenuItem key={2} value="Droit Français">
                            Droit Français
                        </MenuItem>
                        <MenuItem key={3} value="Economie et gestion">
                            Economie et gestion
                        </MenuItem>
                    </TextField>
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
                        rows={filtredDiplomes}
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
                <DetailsDiplome handleOpen={open} diplomeId={id} title="Détails"
                    closeCallback={handleCloseCallback} button="Imprimer"/>
            }
        </Paper>

    );
}
AllDiplomes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllDiplomes);