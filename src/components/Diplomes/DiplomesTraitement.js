import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { DataGrid, GridOverlay, useGridSlotComponentProps, frFR } from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import Visibility from "@material-ui/icons/VisibilityRounded";
import RefreshIcon from '@material-ui/icons/Refresh';
import { withStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import FilterListIcon from '@material-ui/icons/FilterListRounded';
import ReceivedIcon from '@material-ui/icons/CallReceived';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ColorizeIcon from '@material-ui/icons/Colorize';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import BackspaceIcon from '@material-ui/icons/Archive';
import DescriptionIcon from '@material-ui/icons/Description';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { format } from 'date-fns';
import userService from "../../Services/userService";
import DetailsDiplome from './DetailsDiplome';
import ReeditionForm from './ReeditionForm';
import ExportToExcel from '../Export/ExportToExcel';
import Bordoreau from '../Fiches/Bordoreau';
import NotePresentation from '../Fiches/NotePresentation';
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
        maxWidth: 965,
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
    button1: {
        background: '#f10259',
        '&:hover': {
          background: "#f05c94",
        },
        color: theme.palette.common.white,
    },
    button: {
        background: '#a104fc',
        '&:hover': {
        background: "#ab5fe7",
        },
        color: theme.palette.common.white,
    },
    buttonNotif: {
        background: '#bb0086',
        '&:hover': {
        background: "#bf3fa0",
        },
        color: theme.palette.common.white,
    },
    marginbutton: {
        background: '#a104fc',
        '&:hover': {
        background: "#ab5fe7",
        },
        color: theme.palette.common.white,
        marginRight: theme.spacing(3),
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
            color: '#DA70D6'
        },
        '& .reedite': {
            color: '#FF00FF'
        },
        '& .imprime': {
            color: '#BA55D3'
        },
        '& .signe': {
            color: '#9370DB'
        },
        '& .presidence': {
            color: '#8A2BE2'
        },
        '& .recu': {
            color: '#9400D3'
        },
        '& .pret': {
            color: '#800080'
        },
        '& .retire': {
            color: '#9932CC'
        },
    },
});


function DiplomesTraitement(props) {
    // States
    const { classes } = props;
    const [openInfo, setOpenInfo] = useState(false);
    const [openBordoreau, setOpenBordoreau] = useState(false);
    const [openNote, setOpenNote] = useState(false);
    const [openCheckbox, setOpenCheckbox] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [diplomes, setDiplomes] = useState([]);
    const [diplomesTraites, setDiplomesTraites] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [filtredDiplomes, setFiltredDiplomes] = useState([]);
    const [listDiplomes, setListDiplomes] = useState([]);
    const [statuts, setStatuts] = useState([]);
    const [search, setSearch] = useState('');
    const [id, setId] = useState('');
    const [diplomeReedition, setDiplomeReedition] = useState('');
    const [diplomeReedite, setDiplomeReedite] = useState('');
    const [pageSize, setPageSize] = useState(8);
    const [load, setLoad] = useState();
    const [reload, setReload] = useState(false);
    const [filtre, setFiltre] = useState(false);
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [selectionModel, setSelectionModel] = useState([]);
    const [disable, setDisable] = useState(true);
    const [disable1, setDisable1] = useState(true);
    const [disable2, setDisable2] = useState(true);
    const [disableSend, setDisableSend] = useState(true);
    const [disableEdit, setDisableEdit] = useState(true);
    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [selectedStatut, setSelectedStatut] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const type = props?.currentIndex === 0 ? "DEUG" : props?.currentIndex === 1 ? "Licence" : null;
    const traitement = props?.traitement;
    const role = props?.role;
    const archive = props?.archive;

    const componentRef = useRef();
    const pageStyle = '@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 30px !important; } }';
    const handlePrint = useReactToPrint({
            pageStyle: () => pageStyle,
            // give the reference to the current component (which will be either the Bordoreau or NoteDePresentation component) to print it
            content: () => componentRef.current,
            documentTitle: props?.signature ? "Bordoreau" : "NoteDePresentation",
            onAfterPrint: () => (props?.signature ? setDisableSend(false) : 
                                (setOpenNote(false), props?.ChangeTitle("Diplômes à imprimer")) ),
    });
    
    useEffect(() => {
        setLoad(filtre === true ? false : true);
        setReload(false);
        // list of all diplomes without filtres
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
            // list of diplomes status just for Admin
            userService.statutsDiplomes().then((response) => {
                setError(null);
                setStatuts(response?.data?.statuts)
            }).catch((err) => {
                console.log(err);
                setMessage(null);
                setError("Erreur de chargement des statuts de diplômes, veuillez réessayer.");
            })
        }
        setMessage(null);
    // this code will be called in every refresh
    }, [reload]);

    useEffect(() => {
        // filter the above diplomes list by :
        setFiltredDiplomes(diplomes?.filter((diplome) =>
            // type
            (selectedType !== '' ? diplome.type_demande === selectedType : 
                (type != null ? diplome.type_demande === type : diplome.type_demande !== null) )
            &&
            // filiere
            (filiere !== null ? diplome.filiere === filiere : 
             selectedFiliere !== '' ? diplome.filiere === selectedFiliere :
             diplome.filiere !== null) 
            &&
            // statut diplome
            (date !== null ?
                (date === "Date création" ? diplome.statut_id === 1 :
                 date === "Date impression" ? diplome.statut_id === 3 :
                 date === "Date signature" ? diplome.statut_id === 4 :
                 date === "Date envoi" ? diplome.statut_id === 5 :
                 date === "Date réception" ? diplome.statut_id === 6 : 
                 diplome.statut_id === 8) :
                (selectedStatut !== '' ? diplome.statut_id === selectedStatut : 
                  (role === 8 ?
                  diplome.statut_id === statut || diplome.statut_id === 7 :
                  role === 1 ?
                  (archive ? diplome.statut_id === 8 :
                  diplome.statut_id === statut || diplome.statut_id === 2 || diplome.statut_id === 3 ||
                  diplome.statut_id === 4 || diplome.statut_id === 5 || diplome.statut_id === 6 ||
                  diplome.statut_id === 7) :
                  (statut === 1 ? diplome.statut_id === 1 || diplome.statut_id === 2 : 
                   diplome.statut_id === statut) ) ) 
            )
            &&
            // dates
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
            // input search
            (diplome.cin.toLowerCase().includes(search.toLowerCase()) ||
             diplome.apogee.toLowerCase().includes(search.toLowerCase()) ||
             diplome.cne.toLowerCase().includes(search.toLowerCase()) ) )
        );
        setMessage(null);
        setError(null);
    // this code will be called if there is a selected filiere, statut, type or dates and also if there is an input search
    }, [type, selectedFiliere, selectedStatut, selectedType, dateDebut, dateFin, search, diplomes]);

    // set filiere for the three types of GuichetScolarite
    const filiere = props?.role === 2 ? "القانون باللغة العربية" :
                    props?.role === 3 ? "Droit en français" : 
                    props?.role === 4 ? "Sciences Economiques et Gestion" : null;

    // set title of date diplome according to user role
    const date = props?.traitement === false ?
                 (props?.role === 2 || props?.role === 3 || props?.role === 4 ? "Date création" :
                 props?.role === 5 ? (props?.impression ? "Date impression" : "Date envoi") :
                 props?.role === 6 ? "Date signature" : props?.role === 7 ? "Date réception" : "Date retrait")
                 : null;

    // set statut diplome number according to user role
    const statut = props?.traitement === true ?
                   (props?.role === 1 ? 1 : props?.role === 5 ? (props?.signature ? 4 : 1) : 
                   props?.role === 6 ? 3 : props?.role === 7 ? 5 : 6) : null;
    
    // data grid columns
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
            width: props?.impression ? 161 : 150,
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
            width: role === 1 ? 180 : 150,
        },
        {
            field: 'statut',
            hide: traitement === true ? false : true,
            headerName: 'Statut',
            sortable: false,
            width: role === 1 || role === 5 || role === 7 ? 120 : 100,
        },
        {
            field: 'info',
            headerName: ' ',
            sortable: false,
            width: 60,
            renderCell: (params) => {
                // show info of the chosen diplome
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

    // fill the exported data to call the component ExportToExcel
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

    // data grid rows : it's the filtred diplomes
    const data = filtredDiplomes?.map((diplome) => (
        {
            id: diplome.id, type: diplome.type_demande,
            date: [date === "Date création" ? diplome.date_creation : 
                   date === "Date impression" ? diplome.date_impression :
                   date === "Date signature" ? diplome.date_signature :
                   date === "Date envoi" ? diplome.date_envoi_Apresidence :
                   date === "Date réception" ? diplome.date_reception : 
                   date === "Date retrait" ? diplome.date_retrait : ""],
            fullName: diplome.nom + ' ' + diplome.prenom,
            apogee: diplome.apogee, cin: diplome.cin, filiere: diplome.filiere,
            statut: getStatut(diplome.id, diplome.statut_id),
        }
    ));

    // get title statut diplome according to his status
    function getStatut(diplomeId, statutId) {
        if(role === 1) {
            return (
                statutId === 1 ? 'Créé' : statutId === 2 ? 'Réédité' : statutId === 3 ? 'Imprimé' :
                statutId === 4 ? 'Signé' : statutId === 5 ? 'À la présidence' : statutId === 6 ? 'Reçu' :
                statutId === 7 ? 'Prêt à retirer' : 'Retiré'
            )
        } else {
            return (
                diplomesTraites.indexOf(diplomeId) > -1 ? 
                (role === 5 ? (props?.signature ? 'À la présidence' : 'Imprimé') : role === 6 ? 'Signé' :
                 role === 7 ? 'Reçu' : 'Retiré') :
                (role === 5 ? (props?.signature ? 'Signé' : statutId === 2 ? 'Réédité' : 'Non imprimé') 
                : role === 6 ? 'Non signé' : role === 7 ? 'À la présidence' : 
                 notifications.indexOf(diplomeId) > -1 || statutId === 7 ? 'Prêt à retirer' : 'En attente')
            )
        }
    };

    // handle refresh all states
    const handleReload = () => {
        setError(null);
        setMessage(null);
        setSearch('');
        setDateDebut('');
        setDateFin('');
        setSelectedFiliere('');
        setSelectedStatut('');
        setSelectedType('');
        setDiplomeReedition('');
        setFiltredDiplomes([]);
        setDiplomesTraites([]);
        setNotifications([]);
        setFiltre(false);
        setReload(true);
    };

    // close dialog of info diplome
    const handleCloseCallback = (open) => {
        setOpenInfo(open);
    };

    // fill exportedData according to the checked items in the children component: ExportForm
    const handleCheckedData = (checkedData) => {
        fillExportedData(checkedData);
    };

    const handleCloseCallback1 = (open, edit) => {
        if(role === 1 ) {   // close form of checking items to export data for Admin
            setOpenCheckbox(open);
        } else {    // close edit diplome form for ServiceDiplomes
            setOpenEdit(open);
            if(edit === true) {
                setReload(true);
                setFiltre(true); 
                handleSelection(null);
            } 
        }
    };

    // open NotePresentation in case of editing diplome by ServiceDiplomes
    const handleOpenNote = (open, diplome) => {
        if(open === true) {
            setOpenNote(open);
            // change title of the header
            props?.ChangeTitle("Note de présentation");
            setDiplomeReedite(diplome);
        } else {
            setMessage(null);
            setError(diplome);
        }
    };

    // handle select textfields for filiere, statut and type
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
    const handleSelectedType = (event) => {
        setSelectedType(event.target.value);
    };

    // disable buttons according to diplome statut
    const verify = (row) => {
        if(row.statut_id === 6) {
            if (notifications.indexOf(row.id) > -1) {
                diplomesTraites.indexOf(row.id) > -1 ? setDisable1(true) : setDisable1(false);
                setDisable2(true);
            } else {
                setDisable2(false);
                setDisable1(true);
            }
        } else {
            diplomesTraites.indexOf(row.id) > -1 ? setDisable1(true) : setDisable1(false);
            setDisable2(true);
        } 
    };

    const handleSelection = (e) => {
        if (e) {    // if there is some selections
            setSelectionModel(e);
            const selectedIDs = new Set(e);
            const selectedRowData = filtredDiplomes?.filter((diplome) =>
                selectedIDs.has(diplome.id)
            );
            // do some tests according to the user role
            role === 5 ? setListDiplomes(selectedRowData) : 
            role === 8 ? selectedRowData?.map((row) => (verify(row))) : <></>;
                
            role !== 8 ?
            e.map((id) => diplomesTraites.indexOf(id) > -1 ? setDisable(true) : setDisable(false)) : <></>;

            if(role === 5 && e.length === 1) {
                setDiplomeReedition(selectedRowData[0]);
                filtredDiplomes?.map((diplome) =>
                    diplome.id === e[0] ? (diplomesTraites.indexOf(diplome.id) > -1 ?
                                           setDisableEdit(true) : setDisableEdit(false)) : <></> 
                );
            }
        } else {    // if there is no selection
            setSelectionModel(null);
            setDisable(true);
            setDisable1(true);
            setDisable2(true);
            setDisableEdit(true);
            setDiplomeReedition('');
        }
    };

    // handle updating diplome info (statut and dates) for each role
    const handleTraitement = (e) => {
        setLoad(true);
        setDisable(true);
        setDisable1(true);
        if (selectionModel?.length === 0) {
          setLoad(false);
          setMessage(null);
          setError("Veuillez séléctionner un diplôme d'abord.");
        } else {
          let dt = [];
          selectionModel?.map((id) => ( 
            ////////////////////////////////// Service de diplômes //////////////////////////////////
            role === 5 ?
                (userService.updateDateImpression(id)
                        .then((response) => {
                            setLoad(false);
                            if (response?.data?.success) {
                                diplomesTraites.push(id);
                                dt.push(id);
                                setError(null);
                                setMessage(dt?.length === 1 ? "Diplôme imprimé et envoyé avec succès." :
                                            dt?.length + " diplômes imprimés et envoyés avec succès.");
                            } else {
                                setMessage(null);
                                setError("Ce diplôme est déjà imprimé, ou une erreur de dates est servenue.");
                            }
                            handleSelection(null);
                        }).catch((error) => {
                            console.log(error);
                            setLoad(false);
                            setDisable(false);
                            setMessage(null);
                            setError("Une erreur s'est produite lors de l'impression du diplôme, veuillez réessayer.");
                        })
                ) :
            ////////////////////////////////// Decanat //////////////////////////////////
            role === 6 ?
                (userService.updateDateSignature(id)
                    .then((response) => {
                        setLoad(false);
                        if (response?.data?.success) {
                            diplomesTraites.push(id);
                            dt.push(id);
                            setError(null);
                            setMessage(dt?.length === 1 ? "Diplôme signé avec succès." :
                                       dt?.length + " diplômes signés avec succès.");
                        } else {
                            setMessage(null);
                            setError("Ce diplôme est déjà signé, ou une erreur de dates est servenue.");
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
            ////////////////////////////////// Bureau d'ordre //////////////////////////////////
            role === 7 ?
                (userService.updateDateReceptionParBureauOrdre(id)
                    .then((response) => {
                        setLoad(false);
                        if (response?.data?.success) {
                            diplomesTraites.push(id);
                            dt.push(id);
                            setError(null);
                            setMessage(dt?.length === 1 ? "Diplôme reçu avec succès." :
                                       dt?.length + " diplômes reçus avec succès.");
                        } else {
                            setMessage(null);
                            setError("Ce diplôme est déjà reçu, ou une erreur de dates est servenue.");
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
            ////////////////////////////////// Guichet de retrait //////////////////////////////////
            (userService.updateDateRetraitDiplomeArchiveDossier(id)
                .then((response) => {
                    setLoad(false);
                    if (response?.data?.success) {
                        diplomesTraites.push(id);
                        dt.push(id);
                        setError(null);
                        setMessage(dt?.length === 1 ? "Diplôme retiré et son dossier archivé avec succès." :
                                   dt?.length + " diplômes retirés et leurs dossiers archivés avec succès.");
                    } else {
                        setMessage(null);
                        setError("Ce diplôme est déjà retiré, ou une erreur de dates est servenue.");
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

    ////////////////////////////////// Service de diplômes //////////////////////////////////
    const handleEnvoiApresidence = () => {
        setLoad(true);
        if (selectionModel?.length === 0) {
          setLoad(false);
          setMessage(null);
          setError("Veuillez séléctionner un diplôme d'abord.");
        } else {
          let dt = [];
            swal({
                title: "Envoyer les diplômes ?",
                buttons: {
                    cancel: 'Annuler',
                    confirm: true,
                },
                dangerMode: true,
             })
            .then((willDelete) => {
                if (willDelete) {
                    selectionModel?.map((id) => (
                        userService.updateDateEnvoiApresidence(id)
                            .then((response) => {
                                setLoad(false);
                                if (response?.data?.success) {
                                    diplomesTraites.push(id);
                                    dt.push(id);
                                    setError(null);
                                    setMessage(dt?.length === 1 ? "Diplôme envoyé avec succès." :
                                            dt?.length + " diplômes envoyés avec succès.");
                                } else {
                                    setMessage(null);
                                    setError("Ce diplôme est déjà envoyé, ou une erreur de dates est servenue.");
                                }
                                handleSelection(null);
                            }).catch((error) => {
                                console.log(error);
                                setLoad(false);
                                setDisable(false);
                                setMessage(null);
                                setError("Une erreur s'est produite lors de l'envoi du diplôme, veuillez réessayer.");
                            })
                    ));
                    setOpenBordoreau(false); 
                    props?.ChangeTitle("Diplômes renvoyés (signés)");
                    setDisableSend(true);
                }
            })
        }
    };

    ////////////////////////////////// Guichet de retrait //////////////////////////////////
    const  handleNotification = async (e) => { // notify student in his email institutionnel
        setLoad(true);
        setDisable2(true);
        if (selectionModel?.length === 0) {
          setLoad(false);
          setMessage(null);
          setError("Veuillez séléctionner un diplôme d'abord.");
        } else {
          let notif = [];
          selectionModel?.map((id) => ( 
            userService.sendMail(id)
                .then((response) => {
                    if (response?.data?.successEmail) {
                        setTimeout(() => { 
                        userService.updateDateNotificationEtudiant(id)
                            .then((response1) => {
                                setLoad(false);
                                if (response1?.data?.success) {
                                    notifications.push(id);
                                    notif.push(id);
                                    setError(null);
                                    setMessage(response?.data?.successEmail);
                                    handleSelection(null);
                                } else {
                                    setMessage(null);
                                    setError("L'étudiant de ce diplôme est déjà notifié, ou une erreur de dates est servenue.");
                                    handleSelection(null);
                                }
                            }).catch((error) => {
                                console.log(error);
                                setLoad(false);
                                setDisable2(false);
                                setMessage(null);
                                setError("Une erreur s'est produite lors de l'envoi da la notification, veuillez réessayer.");
                            })
                        }, 2000);
                    } else {
                        setLoad(false);
                        setMessage(null);
                        setError("L'étudiant de ce diplôme est déjà notifié, ou une erreur de dates est servenue.");
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
    };

    const handleDateDebut = (e) => {
        setDateDebut(e.target.value);
    };

    const handleDateFin = (e) => {
        setDateFin(e.target.value);
    };

    // open form of checkbox items to export data for Admin
    const handleExport = () => {
        setOpenCheckbox(true);
    };

    // open bordoreau component to print it by ServiceDiplomes
    const handleOpenBordoreau = () => {
        setOpenBordoreau(true);
        props?.ChangeTitle("Bordoreau");
    };

    // open edit diplome form by ServiceDiplomes
    const handleEdit = () => {
        setOpenEdit(true);
    };

    return (
    <>
        {traitement === true && role === 1 ?    // showing dates to select only for Admin
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
                                inputProps: {max: format(new Date(),'yyyy-MM-dd')} // disable the future dates
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
                                inputProps: {max: format(new Date(),'yyyy-MM-dd')} // disable the future dates
                            }}
                            size="small"
                            variant="outlined"/>
                </Grid> : <></>
        }
        {openBordoreau ?    // open bordoreau component by ServiceDiplomes
                <Paper className={classes.paper}>
                    <br></br>
                    <div>
                        <Grid container justifyContent="flex-end"
                            alignItems="center" direction="row"
                        >
                            <Tooltip title="Écrivez vos remarques et le numéro du bordoreau ... avant de l'imprimer">
                                <span>
                                    <Fab size="small" className={classes.marginbutton}
                                        onClick={handlePrint}>
                                        <PrintIcon />
                                    </Fab>
                                </span>
                            </Tooltip>

                            <Tooltip title={disableSend ?
                                "Imprimez le bordoreau d'abord pour envoyer les diplômes à la présidence"
                                : "Envoyer les diplômes déjà sélectionnés à la présidence"}>
                                <span>
                                    <Fab color="primary" size="small" className={classes.marginbutton} 
                                        disabled={disableSend} onClick={handleEnvoiApresidence}
                                    >
                                        <SendIcon />
                                    </Fab>
                                </span>
                            </Tooltip>
                        </Grid>
                        <Bordoreau ref={componentRef} diplomesList={listDiplomes} />
                    </div>
                </Paper>

        : openNote ?    // open NotePresentation by ServiceDiplomes in case of editing student info and his diploma
            <Paper className={classes.paper}>
                <br></br>
                <div>
                    <Grid container justifyContent="flex-end"
                        alignItems="center" direction="row"
                    >
                        <Tooltip title="Entrez la date de délibération avant d'imprimer la note">
                            <span>
                                <Fab color="primary" size="small" className={classes.marginbutton}
                                    onClick={handlePrint}>
                                    <PrintIcon />
                                </Fab>
                            </span>
                        </Tooltip>
                    </Grid>
                    <NotePresentation ref={componentRef} diplome={diplomeReedite}/>
                </div>
            </Paper>
        : <Paper className={classes.paper}> 
            {/* show select textfields and buttons according to the user role  */}
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon className={classes.block} color="inherit" />
                        </Grid>
                        <Grid item xs>
                            {/* ///////////////// For all users ///////////////// */}
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
                         {/* ///////////////// For Admin ///////////////// */}
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
                         {/* ///////////////// For Guichet de retrait ///////////////// */}
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
                                    Dans l'attente que l'étudiant soit notifié
                                </MenuItem>
                                <MenuItem key={2} value={7}>
                                    Prêt à retirer
                                </MenuItem>
                            </TextField>
                        </Grid>}
                         {/* ///////////////// For Service de diplomes ///////////////// */}
                        {role === 5 && !props?.signature && !props?.impression && !props?.envoi &&
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
                                <MenuItem key={1} value={2}>
                                    Réédité (et non imprimé)
                                </MenuItem>
                                <MenuItem key={2} value={1}>
                                    Non réédité (et non imprimé)
                                </MenuItem>
                            </TextField>
                        </Grid>}
                        {filiere === null && role === 5 && props?.signature &&
                        <Grid item>
                            <TextField
                                style={{minWidth: 200}}
                                id="standard-select-currency"
                                select
                                label="Filtrer par type du diplôme"
                                onChange={handleSelectedType}
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
                                value={selectedType}
                            >
                                <MenuItem key={1} value="DEUG">
                                    DEUG
                                </MenuItem>
                                <MenuItem key={2} value="Licence">
                                    Licence
                                </MenuItem>
                            </TextField>
                        </Grid>}
                         {/* ///////////////// For all users except Guichet de scolarite ///////////////// */}
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
                         {/* ///////////////// For Guichet de retrait ///////////////// */}
                        {traitement === true && role === 8 &&
                        <Grid item>
                            <Tooltip title="Notifier l'étudiant">
                                <div style={{marginRight: -8, marginLeft: 2}}>
                                    <IconButton disabled={selectionModel?.length === 0 || disable2 ? true : false}
                                        className={classes.buttonNotif} onClick={handleNotification}>
                                        <NotificationsIcon/>
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Grid>}
                         {/* ///////////////// For all users except Admin ///////////////// */}
                        {traitement === true && role !== 1 && !props?.signature &&
                        <Grid item>
                            <Tooltip title={role === 5 ? "Imprimer et envoyer au décanat" : role === 6 ? "Signer" : 
                                            role === 7 ? "Recevoir" : "Retirer le diplôme et archiver son dossier"}>
                                <div style={{marginRight: -13}}>
                                    <IconButton className={classes.button} onClick={handleTraitement}
                                        disabled={selectionModel?.length === 0 || (role === 8 ? disable1 : disable) ? true : false}>
                                        {role === 5 ? <PrintIcon/> : role === 6 ? <ColorizeIcon/> : role === 7 ?
                                        <ReceivedIcon/> : <BackspaceIcon/>}
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Grid>}
                         {/* ///////////////// For Admin ///////////////// */}
                        {role === 1 && traitement === true &&
                        <Grid item style={{marginRight:-13}}>
                            <Tooltip title="Exporter liste d'étudiants">
                                <div>
                                    <IconButton onClick={handleExport} disabled={data.length === 0 ? true : false}>
                                        <img alt="excel" src={ExcelImg} width={26} height={26}/>
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Grid>}
                         {/* ///////////////// For Service de diplomes ///////////////// */}
                        {role === 5 && traitement === true && !props?.signature && 
                        <Grid item>
                            <Tooltip title="Rééditer avant l'impression">
                                <div style={{marginRight: -13, marginLeft: 5}}>
                                    <IconButton className={classes.button1} onClick={handleEdit}
                                        disabled={selectionModel?.length !== 1 || disableEdit ? true : false}>
                                        <EditIcon/>
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Grid>}
                        {role === 5 && props?.signature &&
                        <Grid item>
                            <Tooltip title="Générer bordoreau">
                                <div style={{marginRight: -13}}>
                                    <IconButton className={classes.button} onClick={handleOpenBordoreau}
                                            disabled={selectionModel?.length === 0 ? true : false}>
                                        <DescriptionIcon/>
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Grid>}
                        <Grid item>
                         {/* ///////////////// For all users ///////////////// */}
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
                 {/* Showing success or error message */}
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
                    {/* List of filtred diplomes */}
                    <DataGrid
                        localeText={frFR.props.MuiDataGrid.localeText}
                        rows={data ? data : []}
                        columns={columns}
                        checkboxSelection={(traitement === true && role !== 1) || 
                                           (traitement === false && props?.signature) ? true : false}
                        onSelectionModelChange={handleSelection}
                        disableSelectionOnClick={(traitement === true && role !== 1) || 
                                                 (traitement === false && props?.signature) ? false : true}
                        selectionModel={selectionModel}
                        disableColumnMenu
                        autoHeight
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 7, 10]}
                        components={{
                            Pagination: CustomPagination,
                            LoadingOverlay: CustomLoadingOverlay,
                        }}
                        style={{iconStyle: 'white'}}
                        pagination
                        loading={load}
                        getCellClassName={(params) => { // set the appropriate name of class style to the diplome statut
                            return (params.value === 'Créé' ? 'cree' :
                                    params.value === 'Réédité' ? 'reedite' :
                                    params.value === 'Imprimé' ? 'imprime' :
                                    params.value === 'Signé' ? (role === 5 ? 'nonTraite' : 'signe') :
                                    params.value === 'À la présidence' ? (role === 7 ? 'nonTraite' : 'presidence') :
                                    params.value === 'Reçu' ? 'recu' : 
                                    params.value === 'Prêt à retirer' ? 'pret' : 
                                    params.value === 'Retiré' ? 'retire' :
                                    params.value === 'Non imprimé' || 
                                    params.value === 'Non signé' || params.value === 'En attente' ?
                                    'nonTraite' : '')
                        }}
                    />
                </div>
            </div>
            {/* open dialog of info diplome for all users */}
            {openInfo ?
                <DetailsDiplome handleOpen={openInfo} diplomeId={id} title="Détails" button={null}
                    closeCallback={handleCloseCallback} />
                : <div></div>}
            {/* open form of checkbox items to export data for Admin */}
            {openCheckbox ?
                <ExportForm handleOpen={openCheckbox} archive={archive}
                closeCallback={handleCloseCallback1} checkedData={handleCheckedData}/>
                : <div></div>}
            {/* open edit diplome form for Service de diplomes */}
            {openEdit ?
                <ReeditionForm handleOpen={openEdit} diplome={diplomeReedition}
                    closeCallback={handleCloseCallback1} openCallback={handleOpenNote}/>
                : <div></div>}
        </Paper>}
    </>
    );
}

DiplomesTraitement.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DiplomesTraitement);