import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import PrintIcon from "@material-ui/icons/Print";
import RefreshIcon from '@material-ui/icons/Refresh';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Visibility from "@material-ui/icons/VisibilityRounded";
import ReceivedIcon from '@material-ui/icons/CallReceived';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ColorizeIcon from '@material-ui/icons/Colorize';
import BackspaceIcon from '@material-ui/icons/Archive';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExcelImg from "../../Images/excel_gray.png";

const useStyles = makeStyles((theme) => ({
    card: {
        width: 340,
        height: 'auto',
        backgroundColor: 'rgba(247,247,247,0.95)',
    },

}));

export default function Aide(props) {
    const classes = useStyles();
    const title = props?.title;
    const role = props?.role;

    return (
        <Container>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body" component="h4" align='center' style={{color:'#5b5d61',marginBottom:10}} >
                        Aide pour la page : {title}
                    </Typography>
                    {title === "Acceuil" ?
                    (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un étudiant qui a déjà envoyé sa(ses) demande(s) par son apogée, CIN
                        ou CNE à partir de la barre de recherche.</li>
                        <li>Et puis, pour exporter sa fiche personnelle qui contient ses informations plus le parcours
                        détaillé de son(ses) diplôme(s), vous cliquez sur l'icône : 
                        <PrintIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/> </li>
                        <li>Vous pouvez ainsi cliquer sur la même icône si vous voullez juste voir ses informations.</li> 
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir la recherche vous cliquez sur
                        l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                    </Typography></>) :
                    title === "Profil Personnel" ?
                        (role === 1 ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Après que vous cliquez sur le bouton Editer, vous pouvez modifier votre Identifiant 
                        seulement ou bien changer aussi votre mot de passe en donnant un nouveau.</li>
                        <li>Pour votre profil (rôle) comme Admin vous ne pouvez pas le changer.</li>
                        </Typography></>) :
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Après que vous cliquez sur le bouton Editer, vous pouvez modifier votre Identifiant 
                        seulement ou bien changer aussi votre mot de passe en donnant un nouveau.</li>
                        <li>Pour votre profil (rôle) vous ne pouvez pas le changer, cette permission est donnée juste
                        pour l'Admin.</li>
                        </Typography></>) ) :
                    title === "Utilisateurs" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Pour ajouter un utilisateur, vous cliquez sur l'icône :
                        <PersonAddIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Pour éditer ou supprimer un utilisateur, vous pouvez sélectionner un seul et puis vous cliquez
                        sur l'icône appropriée : 
                        <EditIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/> ou 
                        <DeleteIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi chercher un utilisateur par son Identifiant à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les utilisateurs selon leurs rôles.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (filtre, recherche et 
                        liste d'utilisateurs) vous cliquez sur l'icône :  
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Rôles" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Pour ajouter un rôle, vous cliquez sur l'icône :
                        <PersonAddOutlinedIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Pour éditer ou supprimer un rôle, vous pouvez sélectionner un seul et puis vous cliquez
                        sur l'icône appropriée : 
                        <EditIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/> ou 
                        <DeleteIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi chercher un rôle par son nom à partir de la barre de recherche.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (recherche et 
                        liste des rôles) vous cliquez sur l'icône :  
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Formulaires" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous avez la possibilité de modifier les liens et les API ID des formulaires de demandes 
                        respectivement de DEUG et de Licence, pour le faire vous pouvez changer les anciennes valeurs et puis 
                        vous cliquez sur le bouton Modifier.</li>
                        <li>Pour obtenir les API ID de vos nouveaux formulaires, (plus précisément ceux de leurs google
                        sheets) vous cliquez sur le lien 'Obtenir API ID'.</li>
                        </Typography></>) :
                    title === "Diplômes en cours de traitement" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme en cours de traitement d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi filtrer les diplômes selon leur statut, les filières des étudiants, ou selon 
                        la date de création du dossier (diplôme).</li>
                        <li>Pour exporter sous format Excel la liste affichée avec ou sans filtres, vous cliquez sur l'icône :
                        <img alt="excel" src={ExcelImg} width={17} height={17} style={{marginLeft: 5, marginBottom:-4}}/> ,
                         puis vous choisissez les données voulues à exporter.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (filtres, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Statistiques" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Au début, vous avez les statistiques générales dès la réception des demandes jusqu'au retrait des
                        diplômes, et vous pouvez filtrer ces statistiques selon le type de demande (DEUG ou Licence) 
                        ou selon la date de création du dossier (diplôme).</li>
                        <li>En suite, vous avez les statistiques actuelles des diplômes respectivement DEUG et Licence,
                        ces statistiques sont donnés selon le statut momentané du diplôme.</li>
                        <li>En fin, vous avez les statistiques en gros de l'année courante.</li>
                        </Typography></>) :
                    title === "Demandes en attente" ?
                        (role === 1 ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez cliquer sur l'icône :
                        <PostAddIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/> pour charger
                        les nouvelles demandes (DEUG et Licence) provenant du formulaire.</li>
                        <li>Si vous voulez voir les informations d'une demande précise vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi chercher une demande d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les demandes selon les filières des étudiants.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (filtre, recherche et 
                        liste de demandes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Tout d'abord, vous cliquez sur l'icône :
                        <PostAddIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/> pour charger
                        les nouvelles demandes (DEUG et Licence) provenant du formulaire.</li>
                        <li>Si vous voulez voir les informations d'une demande précise vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi chercher une demande d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Puis, vous pouvez sélectionner un ou plusieurs demandes pour créer les dossiers correspondants
                        en cliquant sur l'icône :  
                        <CreateNewFolderIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Pour voir les dossiers que vous avez créé aller vers la page 'Dossiers créés'.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (recherche et 
                        liste de demandes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) ) :
                    title === "Dossiers Créés" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un dossier créé d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un dossier précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (recherche et 
                        liste de demandes) vous cliquez sur l'icône :  
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Diplômes à signer" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Pour marquer un diplôme comme signé, vous pouvez sélectionner un ou plusieurs
                        diplômes et puis cliquez sur l'icône :
                        <ColorizeIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi chercher un diplôme d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Pour voir les diplômes que vous avez marqué comme signés aller vers la page 'Diplômes signés'.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Diplômes signés" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme signé d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Diplômes en attente de réception" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Pour marquer un diplôme provenant de la présidence comme reçu, vous pouvez sélectionner un ou plusieurs
                        diplômes et puis cliquez sur l'icône :
                        <ReceivedIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi chercher un diplôme d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Pour voir les diplômes que vous avez marqué comme reçus aller vers la page 'Diplômes reçus'.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Diplômes reçus" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme reçu d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Diplômes En attente du retrait" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Tout d'abord, vous devez notifier l'étudiant sur son E-mail institutionnel que son diplôme
                        est prêt, pour le faire sélectionner un ou plusieurs diplômes et puis cliquez sur l'icône :
                        <NotificationsIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Puis, pour marquer un diplôme -que vous avez déjà notifié son propriétaire- comme retiré et 
                        son dossier comme archivé, vous pouvez sélectionner un ou plusieurs diplômes et puis cliquez sur l'icône :
                        <BackspaceIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi chercher un diplôme d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les diplômes selon les filières des étudiants, ou selon le statut de diplôme
                        (En attente du retrait : l'étudiant n'est pas encore notifié, Prêt à retirer : l'étudiant est déjà notifié).</li>
                        <li>Pour voir les diplômes que vous avez marqué comme retirés, et les dossiers comme archivés aller vers
                        la page 'Diplômes retirés'.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (filtres, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Diplômes retirés" ?
                        (role === 1 ? 
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme retiré d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi filtrer les diplômes selon les filières des étudiants ou selon 
                        la date du retrait du diplôme (archive du dossier).</li>
                        <li>Pour exporter sous format Excel la liste affichée avec ou sans filtres, vous cliquez sur l'icône :
                        <img alt="excel" src={ExcelImg} width={17} height={17} style={{marginLeft: 5, marginBottom:-4}}/> ,
                        puis vous choisissez les données voulues à exporter.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (filtres, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) : 
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme retiré (dossier archivé) d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>.</li>
                        <li>Vous pouvez aussi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Si vous trouvez un problème ou vous voullez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône :  
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) ) :
                    <></>}
                </CardContent>
            </Card>
        </Container >
    );
}