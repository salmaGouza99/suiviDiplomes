import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import userService from "../../Services/userService";
import DetailsRow from './DetailsRow';
import TimeLine from './TimeLine'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 900,

    },
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
    card: {
        width: '700',
    },
}));

export default function DetailsDiplome(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [diplome, setDiplome] = useState('');
    const [message, setMessage] = useState('');



    useEffect(() => {
        setOpen(props.handleOpen);
        props.diplome ? setDiplome(props.diplome) : setDiplome('');


    }, []);


    ///////////////////////////////////////////
    const handleClose = (e) => {
        props.closeCallback(false);
    }

    return (
        <div className={classes.root}>

            <Dialog open={open} aria-labelledby="form-dialog-title">
                <IconButton color="primary" aria-label="upload picture"
                    component="span" size="small" className={classes.closeIcon}>
                    <CloseIcon onClick={handleClose} />
                </IconButton>
                <Button variant="outlined" color="primary" size="small">
                    Imprimer
                </Button>
                <DialogContent>

                    <Card className={classes.card}>
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                spacing={6}>
                                <Grid item xs={6}>

                                    <Typography variant="body" component="h3" >
                                        Informations Personnelles
                                    </Typography><br />

                                    <DetailsRow title="CIN" data={diplome.cin} />
                                    <DetailsRow title="CNE" data={diplome.cne} />
                                    <DetailsRow title="Appoge" data={diplome.apogee} />
                                    <DetailsRow title="Nom" data={diplome.nom} />
                                    <DetailsRow title="Prenom" data={diplome.prenom} />
                                    <DetailsRow title="Nom arabe" data={diplome.nom_arabe} />
                                    <DetailsRow title="Prenom arabe" data={diplome.prenom_arabe} />
                                    <DetailsRow title="Filiere" data={diplome.filiere} />
                                    <DetailsRow title="Option" data={diplome.option} />
                                    <DetailsRow title="Nationalité" data={diplome.nationalite} />
                                    <DetailsRow title="Date de naissance" data={diplome.date_naiss} />
                                    <DetailsRow title="Lieu de naissance" data={diplome.lieu_naiss} />
                                    <DetailsRow title="Type Demande" data={diplome.type_demande} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body" component="h3" >
                                        Parcours du diplôme
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <div><TimeLine diplome={diplome}/></div>
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