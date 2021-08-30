import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Visibility from "@material-ui/icons/VisibilityRounded";
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, GridOverlay, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import FilterListIcon from '@material-ui/icons/FilterListRounded';
import ReceivedIcon from '@material-ui/icons/CallReceived';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ColorizeIcon from '@material-ui/icons/Colorize';
import BackspaceIcon from '@material-ui/icons/Archive';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { format } from 'date-fns';
import userService from "../../Services/userService";
import DetailsDiplome from '../Diplomes/DetailsDiplome';
import ExportToExcel from '../Export/ExportToExcel';
import ExportForm from '../Export/ExportForm';
import ExcelImg from "../../Images/excel.png";

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
    button: {
        background: '#4fc3f7',
        '&:hover': {
          background: "#3A7BAF",
        },
        color: theme.palette.common.white,
        //marginTop: theme.spacing(1.2),
    },
    input: {
        background: '#f5f5f5',
    },
    MuiDataGrid: {
        '& .nonTraite': {
          color: 'gray'
        },
        '& .traite': {
            color: theme.palette.info.main
        },
        '& .cree': {
            color: '#87CEFA'
        },
        '& .reedite': {
            color: '#FF0000'
        },
        '& .imprime': {
            color: '#00BFFF'
        },
        '& .signe': {
            color: '#1E90FF'
        },
        '& .presidence': {
            color: '#6495ED'
        },
        '& .recu': {
            color: '#4682B4'
        },
        '& .pret': {
            color: '#0000FF'
        },
        '& .retire': {
            color: '#00008B'
        },
    },
});


function DiplomesTraitement(props) {
    const { classes } = props;
    const [openInfo, setOpenInfo] = useState(false);
    const [openCheckbox, setOpenCheckbox] = useState(false);
    const [diplomes, setDiplomes] = useState([]);
    const [diplomesTraites, setDiplomesTraites] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [filtredDiplomes, setFiltredDiplomes] = useState([]);
    const [statuts, setStatuts] = useState([]);
    const [search, setSearch] = useState('');
    const [id, setId] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [load, setLoad] = useState();
    const [reload, setReload] = useState(false);
    const [filtre, setFiltre] = useState(false);
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [selectionModel, setSelectionModel] = useState([]);
    const [disable, setDisable] = useState(true);
    const [disable1, setDisable1] = useState(true);
    const [disable2, setDisable2] = useState(true);
    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [selectedStatut, setSelectedStatut] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const type = props?.currentIndex === 0 ? "DEUG" : "Licence";
    const traitement = props?.traitement;
    const role = props?.role;
    const archive = props?.archive;
    const filiere = props?.role === 2 ? "القانون باللغة العربية" :
                    props?.role === 3 ? "Droit en français" : 
                    props?.role === 4 ? "Sciences Economiques et Gestion" : null;
    const date = props?.traitement === false ?
                 (props?.role === 2 || props?.role === 3 || props?.role === 4 ? "Date création" :
                 props?.role === 6 ? "Date signature" : props?.role === 7 ? "Date réception" : "Date retrait")
                 : null;
    const statut = props?.traitement === true ?
                   (props?.role === 1 ? 1 : props?.role === 6 ? 3 : props?.role === 7 ? 5 : 6)
                   : null;
    const columns = [
        {
            field: 'id',
            headerName: 'N°',
            width: 72,
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 88,
        },
        {
            field: 'date',
            hide: traitement === true ? true : false,
            headerName: date,
            width: 150,
        },
        {
            field: 'fullName',
            headerName: 'Etudiant',
            width: 160,
        },
        {
            field: 'apogee',
            headerName: 'Apogée',
            width: 110,
        },
        {
            field: 'cin',
            headerName: 'CIN',
            width: 110,
        },
        {
            field: 'filiere',
            headerName: 'Filière',
            width: role === 1 ? 165 : 150,
        },
        {
            field: 'statut',
            hide: traitement === true ? false : true,
            headerName: 'Statut',
            sortable: false,
            width: role === 1 ? 120 : 100,
        },
        {
            field: 'info',
            headerName: ' ',
            sortable: false,
            width: 60,
            renderCell: (params) => {
                const showInfo = () => {
                    setOpenInfo(true);
                    setId(params.id);
                };

                return (
                    <Tooltip title="Voir détails">
                        <IconButton onClick={showInfo} style={{ marginLeft: 3 }}>
                            <Visibility style={{ color: 'gray' }} />
                        </IconButton>
                    </Tooltip>
                );
            }
        },
    ];

    const data = filtredDiplomes?.map((diplome) => (
        {
            id: diplome.id, type: diplome.type_demande,
            date: [date === "Date création" ? diplome.date_creation : 
                   date === "Date signature" ? diplome.date_signature :
                   date === "Date réception" ? diplome.date_reception : 
                   date === "Date retrait" ? diplome.date_retrait : ""],
            fullName: diplome.nom + ' ' + diplome.prenom,
            apogee: diplome.apogee, cin: diplome.cin, filiere: diplome.filiere,
            statut: getStatut(diplome.id, diplome.statut_id),
        }
    ));

    const fillExportedData = (checkedData) => {
        let exportedData = [];
        filtredDiplomes?.map((diplome) => 
        {   let apogee = checkedData[0] ? {"Apogée      ": diplome.apogee} : {};
            let cin = checkedData[1] ? {"CIN         ": diplome.cin} : {};
            let cne = checkedData[2] ? {"CNE         ": diplome.cne} : {};
            let nom_prenom = checkedData[3] ? {"Nom et Prénom        ": diplome.nom + ' ' + diplome.prenom} : {};
            let nom_prenom_arabe = checkedData[4] ? {"الاسم و النسب     ": diplome.nom_arabe + ' ' + diplome.prenom_arabe} : {};
            let filiere = checkedData[5] ? {"Filière              ": diplome.filiere} : {};
            let option = checkedData[6] ? {"Option         ": diplome.option} : {};
            let type_diplome = checkedData[7] ? {"Type du diplôme": diplome.type_demande} : {};
            let statut_diplome = checkedData[8] ? {"Statut du diplôme": getStatut(diplome.id, diplome.statut_id)} : {};
            let type_erreur = checkedData[9] ? {"Type d'erreur      ": diplome.type_erreur} : {};
            let date_demande = checkedData[10] ? {"Date de demande": diplome.date_demande} : {};
            let date_creation = checkedData[10] ? {"Date de création": diplome.date_creation} : {};
            let date_reedition = checkedData[10] ? {"Date de réédition": diplome.date_reedition} : {};
            let date_impression = checkedData[10] ? {"Date d'impression": diplome.date_impression} : {};
            let date_signature = checkedData[10] ? {"Date de signature": diplome.date_signature} : {};
            let date_presidence = checkedData[10] ? {"Date d'envoi à la présidence": diplome.date_envoi_Apresidence} : {};
            let date_reception = checkedData[10] ? {"Date de réception": diplome.date_reception} : {};
            let date_notification = checkedData[10] ? {"Date de notification d'étudiant": diplome.date_notificationEtudiant} : {};
            let date_retrait = checkedData[10] ? {"Date du retrait": diplome.date_retrait} : {};

            exportedData.push(Object.assign(apogee, cin, cne, nom_prenom, nom_prenom_arabe, filiere, option, type_diplome,
                              statut_diplome, type_erreur, date_demande, date_creation, date_reedition, date_impression,
                              date_signature, date_presidence, date_reception, date_notification, date_retrait));
            
        });
        ExportToExcel(exportedData);
    };

    function getStatut(diplomeId, statutId) {
        if(role === 1) {
            return (
                statutId === 1 ? 'Créé' : statutId === 2 ? 'Réédité' : statutId === 3 ? 'Imprimé' :
                statutId === 4 ? 'Signé' : statutId === 5 ? 'A la présidence' : statutId === 6 ? 'Reçu' :
                statutId === 7 ? 'Prêt à retirer' : 'Retiré'
            )
        } else {
            return (
                diplomesTraites.indexOf(diplomeId) > -1 ? 
                (role === 6 ? 'Signé' : role === 7 ? 'Reçu' : 'Retiré') :
                (role === 6 ? 'Non signé' : role === 7 ? 'En attente' : 
                 notifications.indexOf(diplomeId) > -1 || statutId === 7 ? 'Prêt à retirer' : 'En attente')
            )
        }
    };

    useEffect(() => {
        setLoad(filtre === true ? false : true);
        setReload(false);
        userService.getAllDiplomes()
            .then((response) => {
                setLoad(false);
                setError(null);
                setDiplomes(response?.data?.diplomes);
            }).catch((error) => {
                console.log(error);
                setLoad(false);
                setMessage(null);
                setError("Erreur de chargement, veuillez réessayer.");
            });

        if(role === 1) {
            userService.statutsDiplomes().then((response) => {
                setError(null);
                setStatuts(response?.data?.statuts)
            }).catch((err) => {
                console.log(err);
                setMessage(null);
                setError("Erreur de chargement des status de diplômes, veuillez réessayer.");
            })
        }
        setMessage(null);
    }, [reload]);

    useEffect(() => {
        setFiltredDiplomes(diplomes?.filter((diplome) =>
            diplome.type_demande === type 
            &&
            (filiere !== null ? diplome.filiere === filiere : 
             selectedFiliere !== '' ? diplome.filiere === selectedFiliere :
             diplome.filiere !== null) 
            &&
            (date !== null ?
                (date === "Date création" ? diplome.date_creation !== null :
                 date === "Date signature" ? diplome.date_signature !== null :
                 date === "Date réception" ? diplome.date_reception !== null : 
                 diplome.date_retrait !== null) :
                (selectedStatut !== '' ? diplome.statut_id === selectedStatut : 
                  (role === 8 ?
                  diplome.statut_id === statut || diplome.statut_id === 7 :
                  role === 1 ?
                  (archive ? diplome.statut_id === 8 :
                  diplome.statut_id === statut || diplome.statut_id === 2 || diplome.statut_id === 3 ||
                  diplome.statut_id === 4 || diplome.statut_id === 5 || diplome.statut_id === 6 ||
                  diplome.statut_id === 7) :
                  diplome.statut_id === statut) ) 
            )
            &&
            (archive ? 
                (dateDebut !== '' && dateFin !== '' ?
                 (diplome.date_retrait >= dateDebut && diplome.date_retrait <= dateFin) :
                 (dateDebut !== '' ? diplome.date_retrait >= dateDebut :
                 dateFin !== '' ? diplome.date_retrait <= dateFin :
                 diplome.date_retrait !== null) ) :
                (dateDebut !== '' && dateFin !== '' ?
                 (diplome.date_creation >= dateDebut && diplome.date_creation <= dateFin) :
                 (dateDebut !== '' ? diplome.date_creation >= dateDebut :
                 dateFin !== '' ? diplome.date_creation <= dateFin :
                 diplome.date_creation !== null) ) )
            &&
            (diplome.cin.toLowerCase().includes(search.toLowerCase()) ||
             diplome.apogee.toLowerCase().includes(search.toLowerCase()) ||
             diplome.cne.toLowerCase().includes(search.toLowerCase()) ) )
        );
        setMessage(null);
        setError(null);
    }, [type, selectedFiliere, selectedStatut, dateDebut, dateFin, search, diplomes]);

    const handleReload = () => {
        setError(null);
        setMessage(null);
        setSearch('');
        setDateDebut('');
        setDateFin('');
        setSelectedFiliere('');
        setSelectedStatut('');
        setFiltredDiplomes([]);
        setDiplomesTraites([]);
        setNotifications([]);
        setFiltre(false);
        setReload(true);
    };

    const handleCloseCallback = (open) => {
        setOpenInfo(open);
    };

    const handleCheckedData = (checkedData) => {
        // setCheckedData(checkedData);
        fillExportedData(checkedData);
    };

    const handleCloseCallback1 = (open) => {
        setOpenCheckbox(open);
    };

    const handleSelectedFiliere = (event) => {
        setSelectedFiliere(event.target.value);
    };

    const handleSelectedStatut = (event) => {
        setReload(true);
        setFiltre(true);
        setSelectedStatut(event.target.value);
    };

    const handleSelectedStatut1 = (event) => {
        setSelectedStatut(event.target.value);
    };

    const verify = (row) => {
        if(row.statut_id === 6) {
            if (notifications.indexOf(row.id) > -1) {
                setDisable1(false);
                setDisable2(true);
            } else {
                setDisable2(false);
                setDisable1(true);
            }
        } else {
            setDisable1(false);
            setDisable2(true);
        } 
    };

    const handleSelection = (e) => {
        if (e) {
          setSelectionModel(e);
          setDisable(false);
          if (role === 8) {
            const selectedIDs = new Set(e);
            const selectedRowData = filtredDiplomes?.filter((diplome) =>
                selectedIDs.has(diplome.id)
            );
            //console.log(selectedRowData);
            selectedRowData?.map((row) => (
                verify(row)
            ));  
          }
        } else {
          setSelectionModel(null);
          setDisable(true);
          setDisable1(true);
          setDisable2(true);
        }
    };

    const handleNotification = (e) => {
        setLoad(true);
        setDisable2(true);
        if (selectionModel?.length === 0) {
          setLoad(false);
          setMessage(null);
          setError("Veuillez séléctionner un diplome d'abord.");
        } else {
          let notif = [];
          selectionModel?.map((id) => ( 
            userService.sendMail(id)
                .then((response) => {
                    if (response?.data?.success) {
                        userService.updateDateNotificationEtudiant(id)
                            .then((response) => {
                                setLoad(false);
                                if (response?.data?.success) {
                                    notifications.push(id);
                                    notif.push(id);
                                    setError(null);
                                    setMessage(notif?.length === 1 ? "Etudiant notifié avec succès." :
                                            notif?.length + " étudiants notifiés avec succès.");
                                    handleSelection(null);
                                } else {
                                    setMessage(null);
                                    setError("L'étudiant de ce diplome est déjà notifié, ou une erreur de dates est servenue.");
                                    handleSelection(null);
                                }
                            }).catch((error) => {
                                console.log(error);
                                setLoad(false);
                                setDisable2(false);
                                setMessage(null);
                                setError("Une erreur s'est produite lors de l'envoi da la notification, veuillez réessayer.");
                            })
                    } else {
                        setLoad(false);
                        setMessage(null);
                        setError("L'étudiant de ce diplome est déjà notifié, ou une erreur de dates est servenue.");
                        handleSelection(null);
                    }
                }).catch((error) => {
                    console.log(error);
                    setLoad(false);
                    setDisable2(false);
                    setMessage(null);
                    setError("Une connexion internet est obligatoire pour notifier l'étudiant, veuillez réessayer.");
                })
          ));
        }
    }

    const handleTraitement = (e) => {
        setLoad(true);
        setDisable(true);
        setDisable1(true);
        if (selectionModel?.length === 0) {
          setLoad(false);
          setMessage(null);
          setError("Veuillez séléctionner un diplome d'abord.");
        } else {
          let dt = [];
          selectionModel?.map((id) => ( 
            role === 6 ?
                (userService.updateDateSignature(id)
                    .then((response) => {
                        setLoad(false);
                        if (response?.data?.success) {
                            diplomesTraites.push(id);
                            dt.push(id);
                            setError(null);
                            setMessage(dt?.length === 1 ? "Diplome signé avec succès." :
                                       dt?.length + " diplomes signés avec succès.");
                        } else {
                            setMessage(null);
                            setError("Ce diplome est déjà signé, ou une erreur de dates est servenue.");
                        }
                        handleSelection(null);
                    }).catch((error) => {
                        console.log(error);
                        setLoad(false);
                        setDisable(false);
                        setMessage(null);
                        setError("Une erreur s'est produite lors de la signature du diplôme, veuillez réessayer.");
                    })
                ) :
            role === 7 ?
                (userService.updateDateReceptionParBureauOrdre(id)
                    .then((response) => {
                        setLoad(false);
                        if (response?.data?.success) {
                            diplomesTraites.push(id);
                            dt.push(id);
                            setError(null);
                            setMessage(dt?.length === 1 ? "Diplome reçu avec succès." :
                                       dt?.length + " diplomes reçus avec succès.");
                        } else {
                            setMessage(null);
                            setError("Ce diplome est déjà reçu, ou une erreur de dates est servenue.");
                        }
                        handleSelection(null);
                    }).catch((error) => {
                        console.log(error);
                        setLoad(false);
                        setDisable(false);
                        setMessage(null);
                        setError("Une erreur s'est produite lors de la réception du diplôme, veuillez réessayer.");
                    })
                ) :
            (userService.updateDateRetraitDiplomeArchiveDossier(id)
                .then((response) => {
                    setLoad(false);
                    if (response?.data?.success) {
                        diplomesTraites.push(id);
                        dt.push(id);
                        setError(null);
                        setMessage(dt?.length === 1 ? "Diplome retiré avec succès." :
                                   dt?.length + " diplomes retirés avec succès.");
                    } else {
                        setMessage(null);
                        setError("Ce diplome est déjà retiré, ou une erreur de dates est servenue.");
                    }
                    handleSelection(null);
                }).catch((error) => {
                    console.log(error);
                    setLoad(false);
                    setDisable1(false);
                    setMessage(null);
                    setError("Une erreur s'est produite lors du retait du diplôme, veuillez réessayer.");
                })
            )
          ));
        }
    };

    const handleDateDebut = (e) => {
        console.log(e.target.value);
        setDateDebut(e.target.value);
    };

    const handleDateFin = (e) => {
        console.log(e.target.value);
        setDateFin(e.target.value);
    };

    const handleExport = () => {
        setOpenCheckbox(true);
    };

    return (
        <>
        {traitement === true && role === 1 ?
                <Grid Grid container spacing={1} alignItems="center">
                        <TextField
                            style={{ marginRight: 10, marginLeft: 270, width: 240 }}
                            id="date"
                            label={archive ? "Date début (Retrait)" : "Date début (Création du dossier)"}
                            type="date"
                            value={dateDebut}
                            onChange={handleDateDebut}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.input,
                                inputProps: {max: format(new Date(),'yyyy-MM-dd')}
                            }}
                            size="small"
                            variant="outlined"/>
                        <TextField
                            style={{ width: 240 }}
                            id="date"
                            label={archive ? "Date fin (Retrait)" : "Date fin (Création du dossier)"}
                            type="date"
                            value={dateFin}
                            onChange={handleDateFin}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.input,
                                inputProps: {max: format(new Date(),'yyyy-MM-dd')}
                            }}
                            size="small"
                            variant="outlined"/>
                </Grid> : <> </>}  
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
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </Grid>
                        {traitement === true && role === 1 && !archive &&
                        <Grid item>
                            <TextField
                                style={{minWidth: 150}}
                                id="standard-select-currency"
                                select
                                label="Filtrer par statut"
                                onChange={handleSelectedStatut1}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FilterListIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                margin="normal"
                                size="small"
                                value={selectedStatut}
                            >
                                {statuts.map((statut) => (
                                    statut.id !== 8 ?
                                    <MenuItem key={statut.id} value={statut.id}>
                                        {statut.statut}
                                    </MenuItem> : <></>
                                ))}
                            </TextField>
                        </Grid>}
                        {filiere === null && traitement === true && role === 8 && 
                        <Grid item>
                            <TextField
                                style={{minWidth: 150}}
                                id="standard-select-currency"
                                select
                                label="Filtrer par statut"
                                onChange={handleSelectedStatut}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FilterListIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                margin="normal"
                                size="small"
                                value={selectedStatut}
                            >
                                <MenuItem key={1} value={6}>
                                    En attente du retrait
                                </MenuItem>
                                <MenuItem key={2} value={7}>
                                    Prêt à retirer
                                </MenuItem>
                            </TextField>
                        </Grid>}
                        {filiere === null && 
                        <Grid item>
                            <TextField
                                style={{minWidth: 150}}
                                id="standard-select-currency"
                                select
                                label="Filtrer par filière"
                                placeholder="Filtrer par filière"
                                onChange={handleSelectedFiliere}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FilterListIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                margin="normal"
                                size="small"
                                value={selectedFiliere}
                            >
                                <MenuItem key={1} value="القانون باللغة العربية">
                                    القانون باللغة العربية
                                </MenuItem>
                                <MenuItem key={2} value="Droit en français">
                                    Droit en français
                                </MenuItem>
                                <MenuItem key={3} value="Sciences Economiques et Gestion">
                                    Sciences Economiques et Gestion
                                </MenuItem>
                            </TextField>
                        </Grid>}
                        {traitement === true && role === 8 &&
                        <Grid item>
                            <Tooltip title="Notifier étudiant">
                                <div style={{marginRight: -8, marginLeft: 2}}>
                                    <IconButton disabled={selectionModel?.length === 0 || disable2 ? true : false}
                                        className={classes.button} onClick={handleNotification}>
                                        <NotificationsIcon/>
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Grid>}
                        {traitement === true && role !== 1 &&
                        <Grid item>
                            <Tooltip title={role === 6 ? "Signer" : role === 7 ? "Recevoir" : "Retirer et archiver"}>
                                <div style={{marginRight: -13}}>
                                    <IconButton className={classes.button} onClick={handleTraitement}
                                        disabled={selectionModel?.length === 0 || (role === 8 ? disable1 : disable) ? true : false}>
                                        {role === 6 ? <ColorizeIcon/> : role === 7 ? <ReceivedIcon/> : <BackspaceIcon/>}
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Grid>}
                        {role === 1 && traitement === true &&
                        <Grid item style={{marginRight:-13}}>
                            <Tooltip title="Exporter liste d'étudiants">
                                <IconButton onClick={handleExport}>
                                    <img alt="excel" src={ExcelImg} width={26} height={26}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>}
                        <Grid item>
                            <Tooltip title="Rafraîchir">
                                <IconButton onClick={handleReload} >
                                    <RefreshIcon color="inherit" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                {(message || error) && (
                <Alert className={classes.alert}
                    severity={message ? "success" : "error"}
                    color={message ? "info" : "error"}
                    onClose={() => {
                        setMessage(null);
                        setError(null);
                    }}
                >
                    {message || error}
                </Alert>
                )}
                <div style={{ width: '100%' }} className={classes.MuiDataGrid}>
                    <DataGrid
                        localeText={frFR.props.MuiDataGrid.localeText}
                        rows={data ? data : []}
                        columns={columns}
                        checkboxSelection={traitement === true && role !== 1 ? true : false}
                        onSelectionModelChange={handleSelection}
                        selectionModel={selectionModel}
                        disableSelectionOnClick
                        disableColumnMenu
                        autoHeight
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 7, 10]}
                        components={{
                            Pagination: CustomPagination,
                            LoadingOverlay: CustomLoadingOverlay,
                        }}
                        pagination
                        loading={load}
                        getCellClassName={(params) => {
                            return (params.value === 'Créé' ? 'cree' :
                                    params.value === 'Réédité' ? 'reedite' :
                                    params.value === 'Imprimé' ? 'imprime' :
                                    params.value === 'Signé' ? 'signe' :
                                    params.value === 'A la présidence' ? 'presidence' :
                                    params.value === 'Reçu' ? 'recu' : 
                                    params.value === 'Prêt à retirer' ? 'pret' : 
                                    params.value === 'Retiré' ? 'retire' :
                                    params.value === 'Non signé' || params.value === 'En attente' ?
                                    'nonTraite' : '')
                        }}
                    />
                </div>
            </div>
            {openInfo ?
                <DetailsDiplome handleOpen={openInfo} diplomeId={id} title="Détails" button={null}
                    closeCallback={handleCloseCallback} />
                : <div></div>}
            {openCheckbox ?
                <ExportForm handleOpen={openCheckbox} archive={archive}
                closeCallback={handleCloseCallback1} checkedData={handleCheckedData}/>
                : <div></div>}
        </Paper>
        </>
    );
}

DiplomesTraitement.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DiplomesTraitement);