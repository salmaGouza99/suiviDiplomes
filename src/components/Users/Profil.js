import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import UserForm from "./UserForm";
import UserService from "../../Services/UserService";
import AuthService from "../../Services/AuthService";
import DetailsRow from '../Diplomes/DetailsRow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { Container } from '@material-ui/core';

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
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const loggedInUser = authService.getCurrentUser();
        userService.showUser(loggedInUser?.user?.id).then((response) => {
            setUser(response?.data.user);
        }).catch(err => {
            // setMessage("Erreur de chargement , veuillez reessayer !");
        })
    }, []);

    const handleEditProfil = (e) => {
        setOpen(true);
    }

    const handleCloseCallback = (open) => {
        setOpen(open);
    }

    return (
        <Container>
            <Card >
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
                            <DetailsRow title="Identifiant" data={user.email} />
                            <DetailsRow title="Mot de passe" data="******************" />
                            <DetailsRow title="Role" data={user.role} />
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
                open && <UserForm handleOpen={open} user={user}
                    closeCallback={handleCloseCallback} title="Editer Profil" formType="edit"
                    closeCallback={handleCloseCallback}
                />
            }
        </Container>
    );
}