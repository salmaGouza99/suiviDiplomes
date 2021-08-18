import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import LinearProgress from "@material-ui/core/LinearProgress";
import userService from "../../Services/userService";
import Alert from "@material-ui/lab/Alert";
import DetailsRow from '../Diplomes/DetailsRow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { Container } from '@material-ui/core';
import ProfilEdit from './ProfilEdit';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(15),

    },
    absolute: {
        marginLeft: theme.spacing(43),
    },

}));

export default function Profil(props) {
    const classes = useStyles();
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [changed, setChanged] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        setChanged(false);
        userService.showProfil().then((response) => {
            setLoading(false);
            setUser(response?.data.user);
        }).catch(err => {
            setLoading(false);
            console.log(err);
            setError("Erreur de chargement, veuillez reessayer.");
        })
    }, [changed]);

    const handleEditProfil = (e) => {
        setOpen(true);
    }

    const closeCallback = (open) => {
        setOpen(open);
        setChanged(true);
    }

    return (
        <Container>
            <Card >
                {loading && (
                    <div align='center' >
                    <LinearProgress />
                    </div>
                )}
                <CardContent>
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
                <br></br>
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
                            <DetailsRow title="Identifiant" data={user.email} />
                            <DetailsRow title="Mot de passe" data="******************" />
                            <DetailsRow title="Rôle" data={user.role} />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-end"
                        spacing={6}>
                        <Grid item xs={12}>
                        <Tooltip title="Editer Profil">
                        <Button variant="contained" color="primary" size="small"
                            startIcon={<EditIcon />}
                            onClick={handleEditProfil}>
                            Editer
                        </Button>
                    </Tooltip>
                        </Grid>
                    </Grid>

                </CardContent>
                <CardActions>
                    
                </CardActions>
            </Card>
            {
                open && <ProfilEdit handleOpen={open} user={user}
                        closeCallback={closeCallback} title="Editer Profil"
                />
            }
        </Container>
    );
}