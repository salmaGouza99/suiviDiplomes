import React, { useEffect, useState } from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import Badge from '@material-ui/core/Badge';
import userService from "../../Services/userService";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    block: {
        display: 'block',
    },

}));
export default function PrintButton(props) {
    const classes = useStyles();
    const [deugDroitArabe, setDeugDroitArabe] = useState([]);
    const [deugDroitfrancais, setDeugDroitfrancais] = useState([]);
    const [deugEconomie, setDeugEconomie] = useState([]);
    const [licenceDroitArabe, setLicenceDroitArabe] = useState([]);
    const [licenceDroitfrancais, setLicenceDroitfrancais] = useState([]);
    const [licenceEconomie, setLicenceEconomie] = useState([]);
    const { lenght, disablePrintButton, id } = props;
    let diplomes = [];

    const handlePrint = () => {
        id.forEach(element => {
            userService.showDiplome(element).then((response) => {
                console.log(response.data.diplome)
                diplomes.push(response.data.diplome)
                // props.refreshCallBack(true);
                // props.MessageSuccessCallBack("Diplômes imprimés et envoyés avec succèss!");
            }).catch(err => {
                console.log(err);
                props.MessageSuccessCallBack("Erreur, veuillez reessayer !");
            })
        });

        setDeugDroitArabe(
            diplomes?.filter((diplome) =>
                    diplome.type_demande === "DEUG" &&
                    diplome.filiere.toLowerCase().includes("Droit Arabe".toLocaleLowerCase())
            )
        );
        setDeugDroitfrancais(
            diplomes?.filter((diplome) =>
                    diplome.type_demande === "DEUG" &&
                    diplome.filiere.toLowerCase().includes("Droit Français".toLocaleLowerCase())
            )
        );
        setDeugEconomie(
            diplomes?.filter((diplome) =>
                    diplome.type_demande === "DEUG" &&
                    diplome.filiere.toLowerCase().includes("Economie et gestion".toLocaleLowerCase())
            )
        );
        setLicenceDroitArabe(
            diplomes?.filter((diplome) =>
                    diplome.type_demande === "licence" &&
                    diplome.filiere.toLowerCase().includes("Droit Arabe".toLocaleLowerCase())
            )
        );
        setLicenceDroitfrancais(
            diplomes?.filter((diplome) =>
                    diplome.type_demande === "DEUG" &&
                    diplome.filiere.toLowerCase().includes("Droit Français".toLocaleLowerCase())
            )
        );
        setLicenceEconomie(
            diplomes?.filter((diplome) =>
                    diplome.type_demande === "licence" &&
                    diplome.filiere.toLowerCase().includes("Economie et gestion".toLocaleLowerCase())
            )
        );

        props.openPdfCallBack(true)
        props.deugDroitArabeCallback(deugDroitArabe)
        props.deugDroitFrancaisCallback(deugDroitfrancais)
        props.deugEconomieCallback(deugEconomie)
        props.licenceDroitArabeCallback(licenceDroitArabe)
        props.licenceDroitfrancaisCallback(licenceDroitfrancais)
        props.licenceDroitfrancaisCallback(licenceDroitfrancais)
    }


    return (
        <Tooltip title="Génerer bordereau">
            <IconButton disabled={disablePrintButton}
                onClick={handlePrint}>
                <Badge badgeContent={lenght} color="error" showZero anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                >
                    <DescriptionIcon className={classes.block} color="inherit" />
                </Badge>
            </IconButton>
        </Tooltip>

        
    );
}