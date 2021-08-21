import React, { useEffect, useState } from 'react';
import PrintIcon from '@material-ui/icons/Print';
import Badge from '@material-ui/core/Badge';
import userService from "../../Services/userService";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';


const useStyles = makeStyles((theme) => ({
    block: {
        display: 'block',
    },

}));
export default function PrintButton(props) {
    const classes = useStyles();
    const {lenght , disablePrintButton , id} = props;


    const handlePrint = () => {
        swal({
            title: "Envoyer les Diplômes ?",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    id.forEach(element => {
                        userService.impressionDiplome(element).then((response) => {
                            console.log(response.data.diplome)
                            props.refreshCallBack(true);
                            props.MessageSuccessCallBack("Diplômes imprimés et envoyés avec succèss!");
                        }).catch(err => {
                            console.log(err);
                            props.MessageSuccessCallBack("Erreur, veuillez reessayer !");
                        })
                    });
                }
            });





        // id.forEach(element => {
        //     userService.impressionDiplome(element).then((response) => {
        //         console.log(response.data.diplome)
        //         props.refreshCallBack(true);
        //         props.MessageSuccessCallBack("Diplômes imprimés et envoyés avec succèss!");
        //     }).catch(err => {
        //         console.log(err);
        //         props.MessageSuccessCallBack("Erreur, veuillez reessayer !");
        //     })
        // });


    }


    return (
        <Tooltip title="Imprimer et envoyer au décanat">
            <IconButton disabled={disablePrintButton}
                onClick={handlePrint}>
                <Badge badgeContent={lenght} color="error" showZero anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                >
                    <PrintIcon className={classes.block} color="inherit" />
                </Badge>
            </IconButton>
        </Tooltip>


    );
}