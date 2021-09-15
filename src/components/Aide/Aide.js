import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import PrintIcon from "@material-ui/icons/Print";
import RefreshIcon from '@material-ui/icons/Refresh';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Visibility from "@material-ui/icons/VisibilityRounded";
import ReceivedIcon from '@material-ui/icons/CallReceived';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ColorizeIcon from '@material-ui/icons/Colorize';
import BackspaceIcon from '@material-ui/icons/Archive';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import SendIcon from '@material-ui/icons/Send';
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
    // States 
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
                    
                    {   ///////////////////////////////////// All users /////////////////////////////////////
                    title === "Acceuil" ?
                    (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un étudiant qui a déjà envoyé sa(ses) demande(s) par son apogée, CIN
                        ou CNE à partir de la barre de recherche.</li>
                        <li>Et puis, pour exporter sa fiche personnelle qui contient ses informations plus le parcours
                        détaillé de son(ses) diplôme(s), vous cliquez sur l'icône : 
                        <PrintIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/> </li>
                        <li>Vous pouvez ainsi cliquer sur la même icône si vous voulez juste voir ses informations.</li> 
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir la recherche vous cliquez sur
                        l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                    </Typography></>) :

                    title === "Profil Personnel" ?
                        ///////////////////////////////////// Admin /////////////////////////////////////
                        (role === 1 ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Après que vous cliquez sur le bouton Editer, vous pouvez modifier votre Identifiant 
                        seulement ou bien changer aussi votre mot de passe en donnant un nouveau.</li>
                        <li>Pour votre profil (rôle) comme Admin vous ne pouvez pas le changer.</li>
                        </Typography></>) :
                        ///////////////////////////////////// All users except Admin /////////////////////////////////////
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Après que vous cliquez sur le bouton Editer, vous pouvez modifier votre Identifiant 
                        seulement ou bien changer aussi votre mot de passe en donnant un nouveau.</li>
                        <li>Pour votre profil (rôle) vous ne pouvez pas le changer, cette permission est donnée juste
                        pour l'Admin.</li>
                        </Typography></>) ) :

                        ///////////////////////////////////// Admin /////////////////////////////////////
                    title === "Utilisateurs" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Pour ajouter un utilisateur, vous cliquez sur l'icône :
                        <PersonAddIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Pour éditer ou supprimer un utilisateur, vous pouvez sélectionner un seul et puis vous cliquez
                        sur l'icône appropriée : 
                        <EditIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/> ou 
                        <DeleteIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi chercher un utilisateur par son Identifiant à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les utilisateurs selon leurs rôles.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtre, recherche et 
                        liste d'utilisateurs) vous cliquez sur l'icône :  
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Rôles" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un rôle par son nom à partir de la barre de recherche.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (recherche et 
                        liste des rôles) vous cliquez sur l'icône :  
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Formulaires" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous avez la possibilité de modifier les liens et les API ID des formulaires de demandes 
                        respectivement de DEUG et de Licence, pour le faire vous pouvez changer les anciennes valeurs et puis 
                        vous cliquez sur le bouton Modifier.</li>
                        <li>Pour obtenir les API ID de vos nouveaux formulaires, (plus précisément ceux de leurs Google
                        sheets contenant les réponses) vous cliquez sur le lien 'Obtenir API ID'.</li>
                        <li>Si vous avez besoin d'une aide pour obtenir ces API ID, vous pouvez cliquez sur le bouton au dessus
                        du lien pour voir un petit tutoriel.</li>
                        </Typography></>) :
                    title === "Diplômes en cours de traitement" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme en cours de traitement d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi filtrer les diplômes selon leur statut, les filières des étudiants, ou selon 
                        la date de création du dossier (diplôme).</li>
                        <li>Pour exporter sous format Excel la liste affichée avec ou sans filtres, vous cliquez sur l'icône :
                        <img alt="excel" src={ExcelImg} width={17} height={17} style={{marginLeft: 5, marginBottom:-4}}/> ,
                         puis vous choisissez les données voulues à exporter.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtres, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Statistiques" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Au début, vous avez les statistiques générales dès la réception des demandes jusqu'au retrait des
                        diplômes, et vous pouvez filtrer ces statistiques selon le type du diplôme (DEUG ou Licence) 
                        ou selon la date de réception de la demande.</li>
                        <li>En suite, vous avez les statistiques actuelles des diplômes respectivement DEUG et Licence,
                        ces statistiques sont donnés selon le statut momentané du diplôme.</li>
                        <li>En fin, vous avez les statistiques en gros de l'année courante.</li>
                        </Typography></>) :
                    title === "Demandes non traitées" ?
                        (role === 1 ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez cliquer sur l'icône :
                        <PostAddIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/> pour charger
                        les nouvelles demandes (DEUG et Licence) provenant du formulaire.</li>
                        <li>Si vous voulez voir les informations d'une demande précise vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi chercher une demande d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les demandes selon les filières des étudiants.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtre, recherche et 
                        liste de demandes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :

                        ///////////////////////////////////// Guichet de scolarité /////////////////////////////////////
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Tout d'abord, vous cliquez sur l'icône :
                        <PostAddIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/> pour charger
                        les nouvelles demandes (DEUG et Licence) provenant du formulaire.</li>
                        <li>Si vous voulez voir les informations d'une demande précise vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi chercher une demande d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Puis, vous pouvez sélectionner un ou plusieurs demandes pour créer les dossiers correspondants
                        en cliquant sur l'icône :  
                        <CreateNewFolderIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Pour voir les dossiers que vous avez créé aller vers la page 'Demandes traitées'.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (recherche et 
                        liste de demandes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) ) :
                    title === "Demandes traitées (Dossiers Créés)" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un dossier créé d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un dossier précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (recherche et 
                        liste de dossiers) vous cliquez sur l'icône :  
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :

                    ///////////////////////////////////// Service de diplômes /////////////////////////////////////
                    title === "Diplômes à imprimer" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Pour marquer un diplôme comme imprimé, vous pouvez sélectionner un ou plusieurs
                        diplômes et puis cliquez sur l'icône :
                        <PrintIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Si vous voulez rééditer un diplôme contenant une erreur, vous séléctionnez le diplôme 
                        et vous cliquez sur l'icône :
                        <EditIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/>, vous avez 
                        la possibilté de rééditer le diplôme autant de fois que vous voulez, mais avant de l'imprimer,
                        un diplôme imprimé ne pourra pas être réédité.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi chercher un diplôme d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les diplômes non imprimés selon les filières des étudiants, ou
                        selon le statut du diplôme (réédité ou non).</li>
                        <li>Pour voir les diplômes que vous avez marqué comme imprimés aller vers la page 'Diplômes imprimés
                        et envoyés au décanat'.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtres, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Note de présentation" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Avant d'imprimer la note de présentation générée, veuillez entrer d'abord la date de délibération
                        de l'étudiant, sinon vous pouvez la laisser vide et vous cliquez sur l'icône : 
                        <PrintIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/> , pour imprimer
                        la note.</li>
                        </Typography></>) :
                    title === "Diplômes imprimés et envoyés au décanat" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme imprimé d'un étudiant par son apogée, CIN 
                        ou CNE à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Diplômes renvoyés (signés)" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Pour générer le bordoreau des diplômes renvoyés du décanat qui sont signés, vous pouvez 
                        séléctionner tous les diplômes ou les filtrer selon la filière des étudiants ou selon le type
                        du diplôme, puis vous cliquez sur l'icône : 
                        <DescriptionIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Après avoir cliqué sur cette icône, le bordoreau sera généré et vous aurez la possibilité
                        de l'imprimer et d'envoyer les diplômes signés (séléctionnés) à la présidence.</li>
                        <li>Vous pouvez aussi chercher un diplôme signé d'un étudiant par son apogée, CIN 
                        ou CNE à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtres, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Bordoreau" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Pour imprimer le bordoreau généré, veuillez écrivez d'abord vos remarques dans la case 'الملاحظات'
                        ainsi que le numéro du bordoreau dans le champ à coté du 'الرقم' sinon vous pouvez effacer les 3 points
                        de suspension, puis vous cliquez sur l'cône : 
                        <PrintIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Après avoir imprimé le bordoreau, vous pouvez maintenant envoyer les diplômes déjà séléctionnés
                        à la présidence en cliquant sur l'icône :  
                        <SendIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Diplômes envoyés à la présidence" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme envoyé à la présidence d'un étudiant par son apogée, CIN 
                        ou CNE à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Duplicata" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Cette attestation administative tient lieu du duplicata du diplôme en cas de perte.</li>
                        <li>Vous pouvez la remplir avec les informations d'étudiant, puis l'imprimer ou bien vous pouvez 
                        juste l'imprimer avec les champs vides.</li>
                        </Typography></>) :

                    ///////////////////////////////////// Décanat /////////////////////////////////////
                    title === "Diplômes à signer" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Pour marquer un diplôme comme signé, vous pouvez sélectionner un ou plusieurs
                        diplômes et puis cliquez sur l'icône :
                        <ColorizeIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi chercher un diplôme d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Pour voir les diplômes que vous avez marqué comme signés aller vers la page 'Diplômes signés'.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Diplômes signés" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme signé d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :

                    ///////////////////////////////////// Bureau d'ordre /////////////////////////////////////
                    title === "Diplômes en attente de réception" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Pour marquer un diplôme provenant de la présidence comme reçu, vous pouvez sélectionner un ou plusieurs
                        diplômes et puis cliquez sur l'icône :
                        <ReceivedIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi chercher un diplôme d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Pour voir les diplômes que vous avez marqué comme reçus aller vers la page 'Diplômes reçus'.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :
                    title === "Diplômes reçus" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme reçu d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :


                    ///////////////////////////////////// Guichet de retrait /////////////////////////////////////
                    title === "Diplômes En attente du retrait" ?
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Tout d'abord, vous devez notifier l'étudiant sur son E-mail institutionnel que son diplôme
                        est prêt, pour le faire sélectionner un ou plusieurs diplômes et puis cliquez sur l'icône :
                        <NotificationsIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Puis, pour marquer un diplôme -que vous avez déjà notifié son propriétaire- comme retiré et 
                        son dossier comme archivé, vous pouvez sélectionner un ou plusieurs diplômes et puis cliquez sur l'icône :
                        <BackspaceIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi chercher un diplôme d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Vous pouvez ainsi filtrer les diplômes selon les filières des étudiants, ou selon le statut du diplôme
                        (En attente : l'étudiant n'est pas encore notifié, Prêt à retirer : l'étudiant est déjà notifié).</li>
                        <li>Pour voir les diplômes que vous avez marqué comme retirés, et les dossiers comme archivés aller vers
                        la page 'Diplômes retirés'.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtres, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) :

                    title === "Diplômes retirés" ?
                        ///////////////////////////////////// Admin /////////////////////////////////////
                        (role === 1 ? 
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme retiré d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi filtrer les diplômes selon les filières des étudiants ou selon 
                        la date du retrait du diplôme (archive du dossier).</li>
                        <li>Pour exporter sous format Excel la liste affichée avec ou sans filtres, vous cliquez sur l'icône :
                        <img alt="excel" src={ExcelImg} width={17} height={17} style={{marginLeft: 5, marginBottom:-4}}/> ,
                        puis vous choisissez les données voulues à exporter.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtres, recherche et 
                        liste de diplômes) vous cliquez sur l'icône : 
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) : 

                        ///////////////////////////////////// Guichet de retrait /////////////////////////////////////
                        (<><Typography variant="body" component="h5" color="textSecondary">
                        <li>Vous pouvez chercher un diplôme retiré (dossier archivé) d'un étudiant par son apogée, CIN ou CNE 
                        à partir de la barre de recherche.</li>
                        <li>Si vous voulez voir les informations d'un diplôme précis vous cliquez sur l'icône :
                        <Visibility style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        <li>Vous pouvez aussi filtrer les diplômes selon les filières des étudiants.</li>
                        <li>Si vous trouvez un problème ou vous voulez rafraîchir les données (filtre, recherche et 
                        liste de diplômes) vous cliquez sur l'icône :  
                        <RefreshIcon style={{fontSize:20, marginLeft: 5, marginBottom:-4,color:"#87888a"}}/></li>
                        </Typography></>) ) :
                    <></>}
                </CardContent>
            </Card>
        </Container >
    );
}