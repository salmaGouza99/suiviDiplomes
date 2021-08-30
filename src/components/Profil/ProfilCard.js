import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import authService from "../../Services/authService";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(15),

    },
    card: {
        width: 200,
        height: 150,
    },

}));

export default function ProfilCard(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const emailUpdate = props?.emailUpdate;

    useEffect(() => {
        const loggedInUser = authService.getCurrentUser();
        setRole(loggedInUser?.user?.roles[0]?.name);
        setEmail(emailUpdate !== null ? props?.emailUpdate : loggedInUser?.user?.email);
    }, [emailUpdate]);

    const handleClickEdit = (e) => {
        props?.callBackEditProfil(true);
    };

    return (
        <Container>
            <Card className={classes.card}>
                <CardContent>
                    <div align='right' style={{marginTop:-10}}>
                    <Tooltip title="Editer">
                        <IconButton onClick={handleClickEdit}>
                            <EditIcon color='primary'/>
                        </IconButton>
                    </Tooltip>
                    </div>
                    <Typography variant="body" component="h3" align='center'>
                        {email}
                    </Typography><br></br>
                    <Typography variant="body" component="h4" align='center' style={{color: 'gray'}}>
                        {role}
                    </Typography>
                </CardContent>
            </Card>
        </Container >
    );
}