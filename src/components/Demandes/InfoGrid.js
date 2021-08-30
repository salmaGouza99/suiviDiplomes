import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import userService from "../../Services/userService";
import DetailsRow from '../Diplomes/DetailsRow';

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'center',
    },
    closeIcon: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 14,
    },
    card: {
        marginBottom: theme.spacing(2),
    },
    alert: {
        marginTop: -theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    loading: {
        color: '#0268B5',
    },
}));

export default function InfoGrid(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [demande, setDemande] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        setOpen(props?.handleOpen);
        setLoading(true);
        if (props?.demandeId !== null) {
            userService.showDemande(props?.demandeId).then((response) => {
                setLoading(false);
                setDemande(response?.data.demande)
            }).catch(err => {
                console.log(err);
                setLoading(false);
                setError("Erreur de chargement, veuillez reessayer.");
            })
        } else {
            setLoading(false);
            setError("Erreur de chargement, veuillez reessayer.");
        }
    }, []);


    ///////////////////////////////////////////
    const handleClose = (e) => {
        props.closeCallback(false);
    }

    return (
        <div className={classes.root}>

            <Dialog open={open} aria-labelledby="form-dialog-title" className={classes.root}>
                <IconButton color="primary" aria-label="upload picture"
                    component="span" size="small" className={classes.closeIcon}>
                    <CloseIcon onClick={handleClose} />
                </IconButton>
                <DialogContent>
                    {loading && (
                        <div align='center' >
                            <LinearProgress className={classes.loading} />
                        </div>
                    )}
                    {error && (
                        <Alert className={classes.alert}
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
                            >
                                <Grid item xs={100}>

                                    <Typography variant="body" component="h3">
                                        Informations Personnelles
                                    </Typography><br />
                                    <DetailsRow title="Apogée" data={demande?.etudiant?.apogee} />
                                    <DetailsRow title="CIN" data={demande?.etudiant?.cin} />
                                    <DetailsRow title="CNE" data={demande?.etudiant?.cne} />
                                    <DetailsRow title="Nom" data={demande?.etudiant?.nom} />
                                    <DetailsRow title="Prénom" data={demande?.etudiant?.prenom} />
                                    <DetailsRow title="Nom arabe" data={demande?.etudiant?.nom_arabe} />
                                    <DetailsRow title="Prénom arabe" data={demande?.etudiant?.prenom_arabe} />
                                    <DetailsRow title="Filière" data={demande?.etudiant?.filiere} />
                                    {demande?.etudiant?.option !== null ?
                                        <DetailsRow title="Option" data={demande?.etudiant?.option} /> : <div></div>
                                    }
                                    <DetailsRow title="Nationalité" data={demande?.etudiant?.nationalite} />
                                    <DetailsRow title="Date de naissance" data={demande?.etudiant?.date_naiss} />
                                    <DetailsRow title="Lieu de naissance" data={demande?.etudiant?.lieu_naiss} />
                                    <DetailsRow title="E-mail institutionnel" data={demande?.etudiant?.email_inst} />
                                    <DetailsRow title="Type de demande" data={demande?.type_demande} />
                                    <DetailsRow title="Date de demande" data={demande?.date_demande} />
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