import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import img1 from '../../tutorielImages/1.JPG';
import img2 from '../../tutorielImages/2.JPG';
import img3 from '../../tutorielImages/3.JPG';
import img4 from '../../tutorielImages/4.JPG';
import img5 from '../../tutorielImages/5.JPG';
const tutorialSteps = [
    {
        label: 'Aller sur le site SHEETDB  en cliquant sur le lien',
        imgPath:img1,
    },
    {
        label: 'Se connecter avec votre compte',
        imgPath:img2,
    },
    {
        label: 'Aller sur le boutton "CREATE NEW"',
        imgPath:img3,
    },
    {
        label: 'Copier et Coller le lien du formulaire',
        imgPath:img4,
    },
    {
        label: 'Cliquer sur le boutton "CREATE API"',
        imgPath:img4,
    },
    {
        label: 'Copier l\'API ID généré',
        imgPath:img5,
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
    closeIcon: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
}));

export default function Tutoriel(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;
    const { open } = props;

    ///////////////////////////////////////////
    const handleClose = (e) => {
        props.closeCallback(false);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <IconButton color="primary" aria-label="upload picture"
                    component="span" size="small" className={classes.closeIcon}>
                    <CloseIcon onClick={handleClose} />
                </IconButton>
                <Paper square elevation={0} className={classes.header}>
                    <Typography>{tutorialSteps[activeStep].label}</Typography>
                </Paper>
                <img
                    className={classes.img}
                    src={tutorialSteps[activeStep].imgPath}
                    alt={tutorialSteps[activeStep].label}
                />
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            Suivant
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Précedent
                        </Button>
                    }
                />
            </Dialog>
        </div>
    );
}
