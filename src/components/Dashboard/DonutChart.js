import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Card,
    CardHeader,
    Divider,
    CardContent,
    Box,
    Typography,
    colors,
    TextField,
    InputAdornment,
    MenuItem
}
    from '@material-ui/core';
import { green, red, purple, lime, grey, cyan } from '@material-ui/core/colors';
import { useTheme, makeStyles } from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import userService from "../../Services/userService";
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DescriptionIcon from '@material-ui/icons/Description';
import BorderColorIcon from '@material-ui/icons/BorderColor';

const useStyles = makeStyles((theme) => ({
    cardTitle: {
        color: 'rgb(128,128,128)',
        fontSize: '5px',
    },
}));


export default function DonutChart(props) {
    const theme = useTheme();
    const classes = useStyles();
    const currentYear = new Date().getFullYear();
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');
    const data = {
        datasets: [
            {
                data: [results.demandes_recues,
                results.demandes_traites,
                results.diplomes_retires,
                results.diplomes_retires],
                backgroundColor: [
                    cyan[500],
                    purple[500],
                    red[600],
                    grey[700]
                ],
                borderWidth: 6,
                hoverBorderWidth: 1,
                borderColor: colors.common.white,
                cutout: "80%"

            }
        ],
        labels: ['Demandes Reçues', 'Demandes Traitées', 'Diplômes Réédités', 'Diplômes Retirés'],
        hoverOffset: 4
    };
    const options = {
        animation: {
            animateRotate: true,
        },
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }

    };
    const labels1 = [
        {
            title: 'Demandes Reçues',
            value: results.demandes_recues,
            icon: CallReceivedIcon,
            color: cyan[500]
        },
        {
            title: 'Demandes Traitées',
            value: results.demandes_traites,
            icon: AssignmentTurnedInIcon,
            color: purple[500]
        },
       
    ];
    const labels2 = [
        {
            title: 'Diplômes Retirés',
            value: results.diplomes_retires,
            icon: DescriptionIcon,
            color: green[500]
        },
        {
            title: 'Diplômes Réédités',
            value: results.diplomes_reedites,
            icon: BorderColorIcon,
            color: red[600]
        },

    ];
    const typeOptions = [
        { value: 'DEUG', label: 'DEUG' },
        { value: 'licence', label: 'Licence' },
    ]
    useEffect(() => {
        userService.dashboardCurrentYear().then((response) => {
            setResults(response.data.results)
        }).catch(err => {
            console.log(err);
            setMessage("Erreur de chargement , veuillez reessayer !");
        })


    }, [])
    return (
        <Card {...props}>
            <CardHeader
                title={`Statistiques de l'année courante ${currentYear}`}
                titleTypographyProps={{
                    color: "textSecondary",
                    variant: "h6"
                }}
                className={classes.cardTitle}
                // action={(
                //     <TextField
                //         style={{ height: "35px", width: "100px" }}
                //         id="standard-select-currency"
                //         select
                //         // onChange={filterByType}
                //         variant="standard"
                //         margin="normal"
                //         size="small"
                //     // value={type}
                //     ><MenuItem key={1} value="DEUG">
                //             DEUG
                //         </MenuItem>
                //         <MenuItem key={2} value="licence">
                //             Licence
                //         </MenuItem>
                //     </TextField>
                // )}
            />
            <Divider light={true} />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                >
                    {labels1.map(({
                        color,
                        icon: Icon,
                        title,
                        value
                    }) => (
                        <Box
                            key={title}
                            sx={{
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Icon color="action" />
                            <Typography
                                color="textPrimary"
                                variant="body2"
                            >
                                {title}
                            </Typography>
                            <Typography
                                style={{ color }}
                                variant="h4"
                            >
                                {value}

                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                >
                    {labels2.map(({
                        color,
                        icon: Icon,
                        title,
                        value
                    }) => (
                        <Box
                            key={title}
                            sx={{
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Icon color="action" />
                            <Typography
                                color="textPrimary"
                                variant="body2"
                            >
                                {title}
                            </Typography>
                            <Typography
                                style={{ color }}
                                variant="h4"
                            >
                                {value}

                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}