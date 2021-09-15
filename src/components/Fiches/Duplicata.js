import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import um5_logo from '../../Images/um5_logo.jpg';
import fsjes_logo from '../../Images/fsjes_logo.jpg';

export default class Duplicata extends React.PureComponent {

    render() {
        return (
        <div style={{marginBottom:-10}}>
            <br></br>
            <Typography component="h3" variant="body" style={{marginLeft: 35, marginBottom: 10, marginTop: 10 }}>  
                Annexe 4 : Duplicata de diplôme en cas de perte
            </Typography>
            <div style={{marginRight: 50, marginLeft: 50, border: '3px solid', paddingTop: 20, paddingLeft: 40, paddingRight: 30}}>
                <div align='center'>
                    <img src={`${fsjes_logo}`} width={140} height={120} style={{marginLeft: 30}}/>
                    <img src={`${um5_logo}`} width={150} height={110} style={{ marginLeft: 260}}/>
                </div>
                <br></br>
                <Grid container justifyContent="space-around">
                    <div style={{ textAlign: "center" }}>
                        <Typography component="h2" variant="body" style={{color: "#2596be"}}>ATTESTATION ADMINISTATIVE</Typography>
                        <Typography component="h2" variant="body" style={{color: "#2596be"}}>شهادة إدارية</Typography>
                    </div>
                </Grid>
                        <div>
                            <br></br><br></br>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 Vu la demande de l'étudiant datée du
                                 <input type='text' defaultValue='.../.../.....' style={{fontWeight: "bold",
                                        width: 120, paddingLeft: 6,  fontSize: 18, borderColor: "Transparent"}}/>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 Vu la déclaration de perte
                                 <span style={{fontWeight: "bold"}}> N° </span>
                                 <input type='text' defaultValue='...' style={{fontWeight: "bold", width: 40, 
                                    fontSize: 18, borderColor: "Transparent"}}/>
                                 datée du 
                                 <input type='text' defaultValue='.../.../.....' style={{fontWeight: "bold", width: 120, 
                                    fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>               
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 Le Doyen de la 
                                 <span style={{fontWeight: "bold"}}> Faculté des sciences Juridiques, Economiques et Sociales - Agdal, </span>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 atteste que l'étudiant(e) :  
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 <input type='text' defaultValue='Nom complet du lauréat(e),  Nationalité,' style={{fontWeight: "bold",
                                    width: 600, fontSize: 18, marginLeft: -5, borderColor: "Transparent"}}/>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 Né(e) le
                                 <input type='text' defaultValue='.../.../..... ' style={{fontWeight: "bold", width: 115, 
                                    fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>  
                                 à  
                                 <input type='text' defaultValue='Lieu de naissance,' style={{fontWeight: "bold", width: 200,
                                  fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 CIN : 
                                 <input type='text' defaultValue=' ........................' style={{fontWeight: "bold", 
                                  width: 200, fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 CNE :
                                 <input type='text' defaultValue='...................................' style={{fontWeight: "bold",
                                   width: 200, fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 a obtenu le diplôme de
                                 <input type='text' defaultValue='Type diplôme' style={{fontWeight: "bold", width: 150,
                                  fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>
                                 à la date du 
                                 <Tooltip title="Date de délibération">
                                    <input type='text' defaultValue='.../.../..... ' style={{fontWeight: "bold", width: 120, 
                                       paddingLeft: 6, fontSize: 18, borderColor: "Transparent"}}/>
                                 </Tooltip>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 Filière :
                                 <input type='text' defaultValue='...........................................................' style={{fontWeight: "bold",
                                   width: 500, fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 Option :
                                 <input type='text' defaultValue='...........................................................' style={{fontWeight: "bold",
                                   width: 500, fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 Session :
                                 <input type='text' defaultValue='........................' style={{fontWeight: "bold",
                                   width: 400, fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} > 
                                 Mention :
                                 <input type='text' defaultValue='........................' style={{fontWeight: "bold",
                                   width: 400, fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6, marginLeft: 20 }} > 
                                 La présente attestation tient lieu du duplicata du diplôme.
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6, marginLeft: 20 }} > 
                                 Cette attestation est délivrée à l'intéressé(e) pour servir et valoir ce que de droit.
                            </Typography>
                            <Typography style={{ fontSize: 18, marginBottom: 6}} align='center'> 
                                 <span style={{marginLeft: 8}}>Fait à </span>
                                 <span style={{fontWeight: "bold"}}> Rabat</span> le
                                 <input type='text' defaultValue='.../.../..... ' style={{fontWeight: "bold", width: 120, 
                                    fontSize: 18, paddingLeft: 6, borderColor: "Transparent"}}/>
                            </Typography>
                            <br></br>
                            <Typography style={{ fontSize: 18, marginBottom: 6 }} align='center'> 
                                 <span style={{fontWeight: "bold"}}> Le Doyen </span> 
                                 <span style={{fontWeight: "bold", marginLeft: 250}}> Le président </span>  
                            </Typography>
                            <br></br><br></br><br></br>
                        </div>
            </div> 
            <div style={{margin: 35, paddingTop: 6, borderTop: '8px solid #2596be'}}>
                <Typography component="h3" variant="body" >  
                PROCEDURE DE LA DUPLICATION DES DIPLOMES PERDUS
                </Typography>
            </div>
        </div>
        );
    }
}