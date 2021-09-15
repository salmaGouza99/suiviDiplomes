import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import userService from "../../Services/userService";
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import DetailsRow from '../Diplomes/DetailsRow';
import TimeLine from '../Diplomes/TimeLine';
import logo from '../../Images/logoFsjes.png';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#a104fc'
        }
    }
});

export default function FicheEtudiant(props) {
    // States
    const [etudiant, setEtudiant] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        // show student info in the opened dialog
        userService.showEtudiant(props?.etudiantId).then((response) => {
            setLoading(false);
            setEtudiant(response?.data?.etudiant);
        }).catch(err => {
            setLoading(false);
            console.log(err);
            setError("Erreur de chargement, veuillez reessayer.");
        })
    }, []);

    // some student info
    const firstData = () => {
        return (
            <>
                <DetailsRow title="Apogée" data={etudiant.apogee} />
                <DetailsRow title="CIN" data={etudiant.cin} />
                <DetailsRow title="CNE" data={etudiant.cne} />
                <DetailsRow title="Nom" data={etudiant.nom} />
                <DetailsRow title="Prénom" data={etudiant.prenom} />
                <DetailsRow title="Nom arabe" data={etudiant.nom_arabe} />
                <DetailsRow title="Prénom arabe" data={etudiant.prenom_arabe} />
            </>
        )
    };
    const secondData = () => {
        return (
            <>
                <DetailsRow title="Filière" data={etudiant.filiere} />
                {etudiant.option !== null ?
                    <DetailsRow title="Option" data={etudiant.option} /> : <div></div>
                }
                <DetailsRow title="Nationalité" data={etudiant.nationalite} />
                <DetailsRow title="Date de naissance" data={etudiant.date_naiss} />
                <DetailsRow title="Lieu de naissance" data={etudiant.lieu_naiss} />
                <DetailsRow title="E-mail institutionnel" data={etudiant.email_inst} />
                <DetailsRow title="Type de demande"
                    data={etudiant.demande?.length === 2 ?
                        etudiant.demande[0].type_demande + ' et ' + etudiant.demande[1].type_demande :
                        etudiant.demande?.length === 1 ?
                            etudiant.demande[0].type_demande : "Pas de demande"} />
                {etudiant.diplome?.map((diplome) => (
                    diplome.date_reedition !== null && diplome.type_erreur !== null ?
                        etudiant.demande?.map((demande) => (
                            demande.id === diplome.demande_id && demande.type_demande === "DEUG" ?
                                <DetailsRow title="Type d'erreur du DEUG" data={diplome.type_erreur} color='red' /> :
                                demande.id === diplome.demande_id && demande.type_demande === "Licence" ?
                                    <DetailsRow title="Type d'erreur de la Licence" data={diplome.type_erreur} color='red' /> :
                                    <div></div>
                        ))
                        : <div></div>
                ))}
            </>
        )
    };

    return (
        <div>
            <div style={{ marginBottom: 13}}>
                {loading && (
                    <div align='center' >
                        <MuiThemeProvider theme={theme}>
                            <LinearProgress color='secondary'/>
                        </MuiThemeProvider>
                    </div>
                )}
                {props?.load && (
                    <div align='center' >
                        <MuiThemeProvider theme={theme}>
                            <LinearProgress color='secondary'/>
                        </MuiThemeProvider>
                    </div>
                )}
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
            </div>
            <div >
                <Grid container direction="row" justifyContent="space-around" 
                    alignItems="center" >
                    <Grid item style={{ marginLeft:-40}}>
                        <div style={{ textAlign: "center" }}>
                            <Typography variant="body" component="h4">ⵜⴰⵙⴷⴰⵡⵉⵜⵎⵓⵃⴰⵎⴷⴸ - ⵔⴱⴰⴹ</Typography>
                            <Typography variant="body" component="h4" >ⵜⴰⵙⵖⵉⵡⴰⵏⵜ ⵏ ⵜⵎⵓⵙⵏⵉⵏⵉⵣⵔⴼⴰⵏⵉⵏ,</Typography>
                            <Typography variant="body" component="h4" >ⵜⵉⴷⴰⵎⵙⴰⵏⵉⵏ ⴷ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ</Typography>
                            <Typography variant="body" component="h4" >ⴰⴳⴷⴰⵍ</Typography>
                        </div>
                    </Grid>
                    <Grid item style={{ marginLeft:-50, marginRight:-50 }}>
                        <img src={`${logo}`}  width={90} height={90}/>
                    </Grid>
                    <Grid item >
                        <div style={{ textAlign: "center", marginTop:-20 }}>
                            <br />
                            <Typography variant="body" component="h3" >جامعة محمد الخامس الرباط</Typography>
                            <Typography variant="body" component="h3" > كلية العلوم القانونية والاقتصادية </Typography>
                            <Typography variant="body" component="h3" >  والاجتماعية - أكدال</Typography>
                        </div>
                    </Grid>
                </Grid>
                <br></br>
                <Typography variant="body" component="h2" align='center' 
                    style={{ marginBottom: 15, color: '#a104fc' }}>
                    Fiche Etudiant
                </Typography>
                <br></br>
                <Grid
                    container
                    direction="row"
                    justifyContent={etudiant.diplome?.length === 2 ? "space-around" : "space-between"}
                    alignItems="flex-start"
                    style={{ marginLeft: 15 }}>

                    {/* //////////////////// Info Personnelles //////////////////// */}
                    {etudiant.diplome?.length === 2 ?
                     <>
                    <Grid item style={{ marginBottom: 20 }}>
                        {firstData()}
                    </Grid>
                    <Grid item xs={6} tyle={{ marginBottom: 20 }}>
                       {secondData()}
                    </Grid> </> :
                     <Grid item xs={6} style={{ marginBottom: 20 }}>
                         <Typography variant="body" component="h3" >
                            Informations Personnelles
                        </Typography><br/>
                        {firstData()}
                        {secondData()}
                    </Grid>}
                    {etudiant.diplome?.length === 0 ?
                        <Grid item xs={10}>
                            <Typography variant="body" component="h4" style={{ color: 'gray' }}>
                                Pas encore du dossier créé.
                            </Typography>
                        </Grid> :
                        etudiant.diplome?.map((diplome) => (
                            etudiant.demande?.map((demande) => (
                                demande.id === diplome.demande_id && demande.type_demande === "DEUG" ?
                                    <Grid item xs={5}>
                                    {/* //////////////////// Parcours du DEUG //////////////////// */}
                                        <Typography variant="body" component="h3" style={{marginLeft: 25}}>
                                            Parcours du DEUG
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            <div><TimeLine diplome={diplome} dateDemande={demande.date_demande} /></div>
                                        </Typography>
                                    </Grid> :
                                    demande.id === diplome.demande_id && demande.type_demande === "Licence" ?
                                        <Grid item xs={5}>
                                    {/* //////////////////// Parcours de la Licence //////////////////// */}
                                            <Typography variant="body" component="h3" style={{marginLeft: 25}}>
                                                Parcours de la Licence
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                <div><TimeLine diplome={diplome} dateDemande={demande.date_demande} /></div>
                                            </Typography>
                                        </Grid> :
                                        <div></div>
                            ))
                        ))}

                </Grid>
            </div>
        </div>
    );
}