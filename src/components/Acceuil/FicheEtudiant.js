import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import userService from "../../Services/userService";
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import DetailsRow from '../Diplomes/DetailsRow';
import TimeLine from '../Diplomes/TimeLine'


export default function FicheEtudiant(props) {
    const [etudiant, setEtudiant] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        userService.showEtudiant(props?.etudiantId).then((response) => {
            setLoading(false);
            setEtudiant(response?.data?.etudiant);
        }).catch(err => {
            setLoading(false);
            console.log(err);
            setError("Erreur de chargement, veuillez reessayer.");
        })
    }, []);

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
            <div style={{ marginBottom: 13 }}>
                {loading && (
                    <div align='center' >
                        <LinearProgress />
                    </div>
                )}
                {props?.load && (
                    <div align='center' >
                        <LinearProgress />
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
                <Typography variant="body" component="h2" align='center' color='primary'
                    style={{ marginBottom: 15 }}>
                    Fiche Etudiant
                </Typography><br></br>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={0}
                    style={{ marginLeft: 15 }}>
                    {etudiant.diplome?.length === 2 ?
                     <>
                    <Grid item xs={4} style={{ marginBottom: 20 }}>
                        {firstData()}
                    </Grid>
                    <Grid item xs={6} style={{ marginBottom: 20 }}>
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
                                        <Typography variant="body" component="h3">
                                            Parcours du DEUG
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            <div><TimeLine diplome={diplome} dateDemande={demande.date_demande} /></div>
                                        </Typography>
                                    </Grid> :
                                    demande.id === diplome.demande_id && demande.type_demande === "Licence" ?
                                        <Grid item xs={5}>
                                            <Typography variant="body" component="h3">
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