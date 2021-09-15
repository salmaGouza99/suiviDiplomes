import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Message from './Message';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinkIcon from '@material-ui/icons/Link';
import CodeIcon from '@material-ui/icons/Code';
import userService from "../../Services/userService";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Link from '@material-ui/core/Link';
import Tutoriel from './Tutoriel';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
    button: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(6),
        background: '#a104fc', 
        '&:hover': {
            background: "#ab5fe7",
        },
        color: 'white'
    },
    help: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(89),
        marginBottom: theme.spacing(1),
    },
    link :{
        marginLeft: theme.spacing(101),
    }
}));

export default function Form(props) {
    // States
    const classes = useStyles();
    const [formId, setFormId] = useState('');
    const [lien, setLien] = useState('');
    const [api_id, setApiId] = useState('');
    const [type_formulaire, setTypeFormulaire] = useState('');
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const [openTutoriel, setOpenTutoriel] = useState(false);

    useEffect(() => {
        // set the props values of the parent component in the appropriate variables
        setFormId(props.form.id);
        setTypeFormulaire(props.form.type_formulaire);
        setLien(props.form.lien);
        setApiId(props.form.api_id);
    }, []);

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
        setDisableButton(true);
        // update form
        userService.updateForm(formId, type_formulaire, lien, api_id).then((response) => {
            setDisableButton(false);
            setSuccess(true);
            setMessage(response.data.message);
            setOpen(true);
        }).catch((err) => {
            setDisableButton(false);
            console.log(err);
            setSuccess(false);
            setMessage("Une erreur est survenue, veuillez réessayer.");
            setOpen(true);
        })
    }

    // open the success or the error message
    const handleCallBackOpen = (open) => {
        setOpen(open);
    };

    // open the dialog of tutorial images
    const handleTutoriel = () => {
        setOpenTutoriel(true);
    };

    // close the dialog of tutorial images
    const handleCloseCallback = (value) => {
        setOpenTutoriel(value);
    };

    return (
        <div>
            {open && <Message message={message} success={success ? "success" : "error"} 
                     callBackOpen={handleCallBackOpen}/>}

            <form className={classes.root} onSubmit={handleSubmit}>
                <Typography gutterBottom variant="h5" component="h2" style={{color: '#a104fc'}}>
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
                    <Button type='submit' variant="contained" className={classes.button}
                        startIcon={<AddBoxRoundedIcon />} disabled={disableButton}
                    >Modifier</Button>

                    <Button variant="contained" color="secondary" className={classes.help} onClick={handleTutoriel}
                        startIcon={<HelpOutlineIcon />} size="small"
                        // the dialog of tutorial images of how to obtain the api id of a form
                    >Comment obtenir API ID du formulaire</Button>
                </div>
                    {/* Link to the page of getting the api id of the form */}
                    <Link href="https://sheetdb.io/" target="_blank" className={classes.link}>
                        Obtenir API ID
                    </Link>
            </form>
            {
                // open the dialog of tutorial images 
                openTutoriel && <Tutoriel open={openTutoriel} closeCallback={handleCloseCallback}/>
            }
        </div>

    );
}