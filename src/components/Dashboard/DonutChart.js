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
} from '@material-ui/core';
import { red, purple, grey, cyan } from '@material-ui/core/colors';
import { useTheme, makeStyles } from '@material-ui/core';
import userService from "../../Services/userService";
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DescriptionIcon from '@material-ui/icons/Description';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Message from '../Formulaires/Message';

const useStyles = makeStyles((theme) => ({
    cardTitle: {
        color: 'rgb(128,128,128)',
        fontSize: '5px',
    },
}));

export default function DonutChart(props) {
    // States
    const theme = useTheme();
    const classes = useStyles();
    const currentYear = new Date().getFullYear();
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    // set data of the current year according to each type
    const data = {
        datasets: [
            {
                data: [results.demandes_recues,
                results.demandes_traites,
                results.diplomes_reedites,
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

    // styling the DonutChart
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

    // fill the labels of the DonutChart by titles and the previous values
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
            title: 'Diplômes Réédités',
            value: results.diplomes_reedites,
            icon: BorderColorIcon,
            color: red[600]
        },
        {
            title: 'Diplômes Retirés',
            value: results.diplomes_retires,
            icon: DescriptionIcon,
            color: grey[700]
        },

    ];
    
    useEffect(() => {
        // get all data of the current year
        userService.dashboardCurrentYear().then((response) => {
            setResults(response.data.results)
        }).catch((err) => {
            console.log(err);
            setMessage("Erreur de chargement des statistiques de l'année courante, veuillez réessayer.");
            setOpen(true);
        })
    }, [])

    // open and close the error message
    const handleCallBackOpen = (open) => {
        setOpen(open);
    };

    return (
        <Card {...props}>
            {open && <Message message={message} success="error" callBackOpen={handleCallBackOpen}/>}
            <CardHeader
                title={`Statistiques de l'année courante ${currentYear}`}
                titleTypographyProps={{
                    color: "textSecondary",
                    variant: "h6"
                }}
                className={classes.cardTitle}
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