import React , { useEffect, useState } from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Alert from '@material-ui/lab/Alert';
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

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#a104fc'
      }
  }
});

export default function TimeLine(props) {
  // States
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState("");
  const [steps, setSteps] = React.useState([]);
  const diplome = props?.diplome;
  const dateDemande = props?.dateDemande;

  useEffect(() => {
    setSteps(
      [
        // set labels and dates in the timeline of the given diplome
        {label :'Réception de la demande', date : dateDemande ?
            dateDemande : `${diplome.date_demande}`,},
        {label :'Création du dossier',date : `${diplome.date_creationDossier_envoiAuServiceDiplome}`,},
        diplome.date_reedition !== null ? // if there is date_reedition we will show the label and date, else we pass to the next step
        {label :'Réédition par service de diplômes',date : `${diplome.date_reedition}`,} : {label: null,date: null},
        {label :'Impression et envoi au décanat',date : `${diplome.date_impression_envoiAuDecanat}`,},
        {label :'Signature et renvoi au service de diplômes',date : `${diplome.date_singature_renvoiAuServiceDiplome}`,},
        {label :'Evnoi à la présidence',date : `${diplome.date_generationBorodeaux_envoiApresidence}`,},
        {label :'Réception auprès du bureau d\'ordre',date : `${diplome.date_receptionParBureauOrdre_envoiAuGuichetRetrait}`,},
        {label :'Réception chez guichet de retrait et Notification de l\'étudiant',date : `${diplome.date_notificationEtudiant}`,},
        {label :'Retrait du diplôme et archive du dossier',date : `${diplome.date_retraitDiplome_archiveDossier}`,},
      ]
    );

    // handle ActiveStep according to the dates
    if(`${diplome.date_creationDossier_envoiAuServiceDiplome}` === 'null'){
      setActiveStep(0)
    }else if(`${diplome.date_impression_envoiAuDecanat}` === 'null'){
      setActiveStep(`${diplome.date_reedition}` === 'null' ? 1 : 2)
    }else if(`${diplome.date_singature_renvoiAuServiceDiplome}` === 'null'){
      setActiveStep(`${diplome.date_reedition}` === 'null' ? 2 : 3)
    }else if(`${diplome.date_generationBorodeaux_envoiApresidence}` === 'null'){
      setActiveStep(`${diplome.date_reedition}` === 'null' ? 3 : 4)
    }else if(`${diplome.date_receptionParBureauOrdre_envoiAuGuichetRetrait}` === 'null'){
      setActiveStep(`${diplome.date_reedition}` === 'null' ? 4 : 5)
    }else if(`${diplome.date_notificationEtudiant}` === 'null'){
      setActiveStep(`${diplome.date_reedition}` === 'null' ? 5 : 6)
    }else if(`${diplome.date_retraitDiplome_archiveDossier}` === 'null'){
      setActiveStep(`${diplome.date_reedition}` === 'null' ? 6 : 7)
    }else { // if all the steps are finished, so there is no ActiveStep
      setActiveStep(-1)
    }
  },[diplome]);

  return (
    <div className={classes.root}>
    <MuiThemeProvider theme={theme}>
      <Stepper activeStep={activeStep}  orientation="vertical" color="primary">
        {steps.map(({label,date}) => (
          (label !== null && date !== null && 
            <Step key={label}>
            <StepLabel>
                <div className={classes.date}>
                  <Typography variant="body" component="h3" >
                    {date === 'null' ? 'aaaa-mm-jj' : date} 
                  </Typography>
                </div>
                <div>{label}</div>
            </StepLabel>
          </Step>)
        ))}
      </Stepper>
    </MuiThemeProvider>
    <div>
        {activeStep === -1 ? (
          <div> 
            {/* if all the steps are finished, this alert message will appear */}
            <Alert severity="success" color="info" >
              Toutes les étapes sont terminées.
            </Alert>
          </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    </div>
  );
}
