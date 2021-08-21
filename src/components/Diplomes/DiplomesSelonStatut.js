import React, { useEffect, useState, useRef } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
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
import Alert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import PrintButton from './PrintButton';
import BordereauButton from './BordereauButton';
import BordereauPdf from '../Bordereau/BordereauPdf';
import DescriptionIcon from '@material-ui/icons/Description';
import Badge from '@material-ui/core/Badge';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@material-ui/icons/Print';
import SendIcon from '@material-ui/icons/Send';
import Fab from '@material-ui/core/Fab';
import swal from 'sweetalert';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ArchiveIcon from '@material-ui/icons/Archive';

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

    },
    buttonPrintBord: {
        position: "center"
    },
    marginbutton: {
        marginRight: theme.spacing(3),
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
    },
});


///Data grid columns


function DiplomesSelonStatut(props) {

    /////States
    const classes = useStyles();
    const [id, setId] = useState([]);
    const [diplomes, setDiplomes] = useState([]);
    const [filtredDiplomes, setFiltredDiplomes] = useState([]);
    const [diplome, setDiplome] = useState('');
    const [disableButton, setDisableButton] = useState(true);
    const [disablePrintButton, setDisablePrintButton] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');
    let [searchItem, setSearchItem] = useState('');
    const [type, setType] = useState(0);
    const [lenght, setLenght] = useState(0);
    const [filiere, setFiliere] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [openPdf, setOpenPdf] = useState(false);
    const [listDiplomes, setListDiplomes] = useState([]);
    const [disableSend, setDisableSend] = useState(true);
    const diplomesList = new Array();
    // const componentRef = useRef();
    const { selection, printButton, statut, dateEnvoi, 
            dateHeaderName, borderauButton,notifEtudiantButton,retraitButton } = props;

    const columns = [
        { field: 'id', headerName: 'ID Diplome', width: 20 },
        {
            field: `${dateEnvoi}`,
            headerName: `${dateHeaderName}`,
            width: 150,
            editable: false,
            filterable: false,

        },
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

    const handlebordereau = () => {
        id.forEach(element => {
            userService.showDiplome(element).then((response) => {
                diplomesList.push(response.data.diplome)
                // console.log(diplomesList)
                setOpenPdf(true);
            }).catch(err => {
                console.log(err);
                setMessageSuccess("Erreur, veuillez reessayer !");
            })
        });
        setListDiplomes(diplomesList);

    }

    const handleSend = () => {
        swal({
            title: "Envoyer les Diplômes ?",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    id.forEach(element => {
                        userService.envoiPresidence(element).then((response) => {
                            setMessageSuccess("Diplômes envoyés avec succes !");
                            setRefresh(true)
                        }).catch(err => {
                            console.log(err);
                            setMessage("Erreur de chargement , veuillez reessayer !");
                        });
                    });
                    setOpenPdf(false)
                }
            });

    }
    const handleNotif = () => {
        swal({
            title: "Envoyer Email de notification ?",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    id.forEach(element => {
                        userService.notifEtudiant(element).then((response) => {
                            console.log(response.data.message)
                            setRefresh(true);
                            setMessageSuccess(response.data.message);
                        }).catch(err => {
                            console.log(err);
                            setMessage('Une erreur est survenue ! Veuillez réessayer');
                        })
                    });
                }
            });

    }

    const handleRetrait = () => {
        swal({
            title: "Retirer les Diplômes ?",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    id.forEach(element => {
                        userService.retraitDiplome(element).then((response) => {
                            console.log(response.data.message)
                            setRefresh(true);
                            setMessageSuccess("Diplômes retirés avec succes");
                        }).catch(err => {
                            console.log(err);
                            setMessage('Une erreur est survenue ! Veuillez réessayer');
                        })
                    });
                }
            });

    }
    useEffect(() => {
        userService.getDiplomesByFilter(statut, '0', '0').then((response) => {
            setDiplomes(response.data.diplomes)
        }).catch(err => {
            console.log(err);
            setMessage("Erreur de chargement , veuillez reessayer !");
        })


    }, [refresh])
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
        if (type !== 0 && filiere === '') {
            setFiltredDiplomes(
                diplomes?.filter((diplome) =>
                    (diplome.cin.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.apogee.toLowerCase().includes(searchItem.toLowerCase()) ||
                        diplome.cne.toLowerCase().includes(searchItem.toLowerCase())) &&
                    diplome.type_demande === type
                )
            );
        }

        ///Filiere seulemet
        else if (type === 0 && filiere !== '') {
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

        //type & filiere
        else if (type !== 0 && filiere !== '') {
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

    }, [diplomes, searchItem, type, filiere, refresh]);

    /////////////////////////////////////////////////////////


    ///Callback function to close forms
    const handleCloseCallback = (open) => {
        setOpen(open);
    };
    /////////////////////////////////////////////////////////
    const handleRowSelection = (e) => {
        setId(e);
        setLenght(e['length']);
        e['length'] === 1 ? setDisableButton(false) : setDisableButton(true);
        e['length'] >= 1 ? setDisablePrintButton(false) : setDisablePrintButton(true);


    };

    const handleLoad = () => {
        setSearchItem('');
        setId('');
        setFiliere('');
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

    const filterByFiliere = (e) => {
        setFiliere(e.target.value);
    }

    const handleRefreshCallBack = (value) => {
        setRefresh(value)
    }
    const handleMessageSuccessCallBack = (value) => {
        setMessageSuccess(value)
    }



    const componentRef = useRef();
    const handlePrintBord = useReactToPrint({
        content: () => componentRef.current,
    });

    ////////////////////////////////////////////////////////////


    return (
        <Paper className={classes.paper}>
            {messageSuccess && (
                <Alert
                    severity="success"
                    onClose={() => {
                        setMessageSuccess(null);
                    }}
                >
                    {messageSuccess}
                </Alert>
            )}
            {message && (
                <Alert
                    severity="error"
                    onClose={() => {
                        setMessage(null);
                    }}
                >
                    {message}
                </Alert>
            )}
            <br></br>
            {openPdf ?
                <div>
                    <Grid container justifyContent="flex-end"
                        alignItems="center" direction="row"
                    >
                        <Tooltip title="Imprimer bordereau">
                            <span>
                                <Fab color="primary" size="small" className={classes.marginbutton}
                                    onClick={handlePrintBord}>
                                    <PrintIcon />
                                </Fab>
                            </span>
                        </Tooltip>

                        <Tooltip title={disableSend ?
                            "Imprimer le bordereau d'abord pour Envoyer Diplômes à la présidence"
                            : "Envoyer Diplômes à la présidence"}>
                            <span>
                                <Fab color="primary" size="small" className={classes.marginbutton}
                                    onClick={handleSend}
                                // disabled={disableSend}
                                >
                                    <SendIcon />
                                </Fab>
                            </span>
                        </Tooltip>
                    </Grid>
                    <BordereauPdf ref={componentRef} diplomesList={listDiplomes} />
                </div>

                : <>

                    <AppBar style={{ paddingTop: "0px", paddingRight: "20px" }}
                        position="static" color="#fff" elevation={0}>
                        <Grid container justifyContent="flex-end"
                            alignItems="flex-start"
                        >
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
                                <MenuItem key={1} value="القانون باللغة العربية">
                                    Droit en Arabe القانون باللغة العربية
                                </MenuItem>
                                <MenuItem key={2} value="Droit en Français">
                                    Droit en Français القانون باللغة الفرنسية
                                </MenuItem>
                                <MenuItem key={3} value="Economie et gestion">
                                    Economie et gestion الاقتصاد والتسيير
                                </MenuItem>
                            </TextField>


                        </Grid>
                    </AppBar>

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
                                {/* /////showDetails//// */}
                                <Button variant="contained" color="primary" size="small"
                                    className={classes.button} startIcon={<VisibilityIcon />}
                                    disabled={disableButton}
                                    onClick={showDetails}
                                >Voir Details
                                </Button>

                                {/* ////Print icon//// */}
                                {printButton &&
                                    <Grid item>
                                        <PrintButton refreshCallBack={handleRefreshCallBack}
                                            MessageSuccessCallBack={handleMessageSuccessCallBack}
                                            lenght={lenght} id={id} disablePrintButton={disablePrintButton}
                                        />
                                    </Grid>
                                }
                                {/* /////bordereau button// */}
                                {borderauButton &&
                                    <Grid item>
                                        <Tooltip title="Génerer bordereau">
                                            <span>   <IconButton disabled={disablePrintButton}
                                                onClick={handlebordereau}>
                                                <Badge badgeContent={lenght} color="error" showZero anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                >
                                                    <DescriptionIcon className={classes.block} color="inherit" />
                                                </Badge>
                                            </IconButton></span>
                                        </Tooltip>
                                    </Grid>
                                }

                                {notifEtudiantButton &&
                                    <Grid item>
                                        <Tooltip title="Notifier l'étudiant">
                                            <span>   <IconButton 
                                                onClick={handleNotif}>
                                                <Badge badgeContent={lenght} color="error" showZero anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                >
                                                    <NotificationsActiveIcon className={classes.block} color="inherit" />
                                                </Badge>
                                            </IconButton></span>
                                        </Tooltip>
                                    </Grid>
                                }
                                {retraitButton &&
                                    <Grid item>
                                        <Tooltip title="Retirer le Diplôme et archiver dossier">
                                            <span>   <IconButton 
                                                onClick={handleRetrait}>
                                                <Badge badgeContent={lenght} color="error" showZero anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                >
                                                    <ArchiveIcon className={classes.block} color="inherit" />
                                                </Badge>
                                            </IconButton></span>
                                        </Tooltip>
                                    </Grid>
                                }




                                <Grid item>
                                    {/* /////Refresh/// */}
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
                                checkboxSelection={selection}
                                disableSelectionOnClick={false}
                                autoHeight={true}
                                NoRowsOverlay
                                onSelectionModelChange={handleRowSelection}
                                disableMultipleSelection={true}
                                disableColumnMenu={true}



                            />
                        </div>
                    </div>
                </>}
            {open &&
                <DetailsDiplome handleOpen={open} diplomeId={id} title="Détails"
                    closeCallback={handleCloseCallback} />
            }


        </Paper>

    );
}
DiplomesSelonStatut.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DiplomesSelonStatut);