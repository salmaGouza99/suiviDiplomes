import React, { useEffect, useState } from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import userService from "../../Services/userService";
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import DetailsRow from './DetailsRow';
import TimeLine from './TimeLine'

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(5),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    closeIcon: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#a104fc'
        }
    }
});

export default function DetailsDiplome(props) {
    // States
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [diplome, setDiplome] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setOpen(props.handleOpen);
        // show diplome info in the dialog
        userService.showDiplome(props?.diplomeId).then((response) => {
            setLoading(false);
            setDiplome(response?.data?.diplome);
        }).catch(err => {
            setLoading(false);
            console.log(err);
            setError("Erreur de chargement, veuillez reessayer.");
        })
    }, []);

    // close the dialog info
    const handleClose = (e) => {
        props.closeCallback(false);
    };

    return (
        <div className={classes.root}>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <IconButton color="primary" aria-label="upload picture"
                    component="span" size="small" className={classes.closeIcon}>
                    <CloseIcon onClick={handleClose} />
                </IconButton>
                {props?.button !== null && (
                    <Button variant="outlined" color="primary" size="small">
                        {props?.button}
                    </Button>
                )}
                <DialogContent>
                {loading && (
                    <div align='center' >
                        <MuiThemeProvider theme={theme}>
                            <LinearProgress color='secondary'/>
                        </MuiThemeProvider>
                    </div>
                )}
                {error && (
                    <Alert
                        severity="error"
                        onClose={() => {
                            setError(null);
                        }}
                    >
                        {error}
                    </Alert>
                )}
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                spacing={6}>
                                <Grid item xs={6}>
                                    {/* Fill the dialog with the appropriate info for the given diplome */}
                                    <Typography variant="body" component="h3" >
                                        Informations Personnelles
                                    </Typography><br />
                                    <DetailsRow title="Apogée" data={diplome.apogee} />
                                    <DetailsRow title="CIN" data={diplome.cin} />
                                    <DetailsRow title="CNE" data={diplome.cne} />
                                    <DetailsRow title="Nom" data={diplome.nom} />
                                    <DetailsRow title="Prénom" data={diplome.prenom} />
                                    <DetailsRow title="Nom arabe" data={diplome.nom_arabe} />
                                    <DetailsRow title="Prénom arabe" data={diplome.prenom_arabe} />
                                    <DetailsRow title="Filière" data={diplome.filiere} />
                                    {diplome.option !== null ?
                                        <DetailsRow title="Option" data={diplome.option} /> : <div></div>
                                    }
                                    <DetailsRow title="Nationalité" data={diplome.nationalite} />
                                    <DetailsRow title="Date de naissance" data={diplome.date_naiss} />
                                    <DetailsRow title="Lieu de naissance" data={diplome.lieu_naiss} />
                                    <DetailsRow title="E-mail institutionnel" data={diplome.email_inst} />
                                    <DetailsRow title="Type de demande" data={diplome.type_demande} />
                                    {diplome.date_reedition !== null && diplome.type_erreur !== null ?
                                        <DetailsRow title="Type d'erreur" data={diplome.type_erreur} color='red' />
                                        : <div></div>
                                    }
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body" component="h3" align='center'>
                                        Parcours du diplôme
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <div><TimeLine diplome={diplome} /></div>
                                    </Typography>
                                </Grid>

                            </Grid>

                        </CardContent>
                        <CardActions>

                        </CardActions>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    );
}