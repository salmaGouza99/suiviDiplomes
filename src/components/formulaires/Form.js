import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import Message from './Message';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinkIcon from '@material-ui/icons/Link';
import CodeIcon from '@material-ui/icons/Code';

const API_URL = "http://127.0.0.1:8000/api/";



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));

export default function Form(props) {
    const classes = useStyles();
    const [formId, setFormId] = useState('');
    const [lien, setLien] = useState('');
    const [api_id, setApiId] = useState('');
    const [type_formulaire, setTypeFormulaire] = useState('');
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState(false);
    const [message, setMessage] = useState('');
    const [disableButton, setDisableButton] = useState(true);



    useEffect(() => {
        setFormId(props.form.id);
        setTypeFormulaire(props.form.type_formulaire);
        setLien(props.form.lien);
        setApiId(props.form.api_id);
        

    },[])


    const handleLien = (event) => {
        setLien(event.target.value);
        setDisableButton(false);
    };

    const handleApiId = (event) => {
        setApiId(event.target.value);
        setDisableButton(false);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`${API_URL}formulaires/${formId}`,
            {
                type_formulaire,
                lien,
                api_id

            }).then((response) => {
                console.log(response);
                setSuccess(true);
                setMessage(response.data.message);
            }).catch(err => {
                console.log(err.response);
                setErrors(true);
                setMessage("Une erreur est survenu, veuillez réessayer..");
            })



    }


    return (
        <div>
            {success && <Message message={message} success="success"/>}
            {errors && <Message message={message} success="error"/>}

            
            <form className={classes.root} onSubmit={handleSubmit}>
                <Typography gutterBottom variant="h5" component="h2" color="primary">
                    {type_formulaire}
                </Typography><br />
                <div>
                    <TextField
                        onChange={handleLien}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <LinkIcon />
                            </InputAdornment>
                        ),
                        }}
                        value={lien}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lien"
                        label="Lien du formulaire GOOGLE FORM"
                        name="lien"
                        autoFocus



                    />
                    <TextField
                       onChange={handleApiId}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <CodeIcon />
                            </InputAdornment>
                        ),
                        }}
                        id="outlined-uncontrolled"
                        label="API ID du formulaire"
                        value={api_id}
                        variant="outlined"
                        required
                    />
                </div>
                <Button type='submit' variant="contained" color="primary"
                    startIcon={<AddBoxRoundedIcon />}  disabled={disableButton} 
                >Modifier</Button>

            </form>
        </div>

    );
}