import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container';
import ProfilInfos from './ProfilInfos';
import IconButton from '@material-ui/core/IconButton';
import profilIcon from "../../profilIcon.jpg";
import profilIconCircle from "../../profilIconCircle.jpg";
import ProfilEdit from "./ProfilEdit";
import userService from "../../Services/userService";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(15),
        width: "55%",

    },
    cover: {
        width: 220,
        // backgroundImage: `url(${profilIconCircle})`,
        backgroundImage: 'url(https://source.unsplash.com/random)',
        marginRight: theme.spacing(2),

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
        userService.showUser(props?.user?.id).then((response) => {
                setUser(response?.data.user);
            }).catch(err => {
                // setMessage("Erreur de chargement , veuillez reessayer !");
            })
    }, []);

    const handleEditProfil = (e) =>{
        setOpen(true);
    }


    return (
        <Container>

            <Card className={classes.root}>

                <CardMedia
                    className={classes.cover}
                    image=""
                    title="Live from space album cover"
                />

                <div>
                    <CardContent >
                        <Tooltip title="Editer Profil">
                            <IconButton aria-label="edit" className={classes.absolute}
                            onClick={handleEditProfil}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </CardContent>
                    <div className={classes.controls}>
                        <ProfilInfos title="Identifiant" data={user.email} />
                        <ProfilInfos title="Mot de passe" data="***********************" />
                        <ProfilInfos title="Profil" data={user.role} /><br /><br />
                    </div>
                </div>
            </Card>

            {open && <ProfilEdit handleOpen={open} 
                            user={user} title="Editer Profil"/>}
        </Container>
    );
}