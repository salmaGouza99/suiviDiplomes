import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  date:{
    marginBottom: theme.spacing(1)
  }
}));

//////////creation - envoi au decanat - signature- ..........///////
function getSteps() {

  return [  'Reception de la demande','Creation du dossier',
            'Impression et envoi au decanat','Signature et Renvoi au service de diplomes',
            'Evnoi a la presidence', 'Reception aupres du bureau d\'ordre',
            'Reception chez guichet de retrait', 'Notification de l\'etudiant',
            'Retrait du diplome et archive du dossier',  
        ];
}


export default function TimeLine(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(-1);
  const [steps, setSteps] = React.useState([]);


  useEffect(() => {
    // props.diplome ? setDiplome(props.diplome) : setDiplome('');

    const {diplome} = props;
    
    setSteps(
      [
        {label :'Reception de la demande', date : `${diplome.date_demande}`,},
        {label :'Creation du dossier',date : `${diplome.date_creationDossier_envoiAuServiceDiplome}`,},
        {label :'Impression et envoi au decanat',date : `${diplome.date_impression_envoiAuDecanat}`,},
        {label :'Signature et Renvoi au service de diplomes',date : `${diplome.date_singature_renvoiAuServiceDiplome}`,},
        {label :'Evnoi a la presidence',date : `${diplome.date_generationBorodeaux_envoiApresidence}`,},
        {label :'Reception aupres du bureau d\'ordre',date : `${diplome.date_receptionParBureauOrdre_envoiAuGuichetRetrait}`,},
        {label :'Reception chez guichet de retrait et Notification de l\'etudiant',date : `${diplome.date_notificationEtudiant}`,},
        {label :'Retrait du diplome et archive du dossier',date : `${diplome.date_retraitDiplome_archiveDossier}`,},
      ]
    );

    ////handle ActiveStep selon les dates
    if(`${diplome.date_creationDossier_envoiAuServiceDiplome}` === 'null'){
      setActiveStep(0)
    }else if(`${diplome.date_impression_envoiAuDecanat}` === 'null'){
      setActiveStep(1)
    }else if(`${diplome.date_singature_renvoiAuServiceDiplome}` === 'null'){
      setActiveStep(2)
    }else if(`${diplome.date_generationBorodeaux_envoiApresidence}` === 'null'){
      setActiveStep(3)
    }else if(`${diplome.date_receptionParBureauOrdre_envoiAuGuichetRetrait}` === 'null'){
      setActiveStep(4)
    }else if(`${diplome.date_notificationEtudiant}` === 'null'){
      setActiveStep(5)
    }else if(`${diplome.date_retraitDiplome_archiveDossier}` === 'null'){
      setActiveStep(6)
    }
},[]);


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}  orientation="vertical">
        {steps.map(({label,date}) => (
          <Step key={label}>
            <StepLabel>
                <div className={classes.date}>
                  <Typography variant="body" component="h3" >
                     {date === 'null' ? 'aaaa-mm-jj' : date} 
                  </Typography>
                </div>
                  
                <div>{label}</div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Toutes les étapes sont terminées</Typography>
          </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    </div>
  );
}
