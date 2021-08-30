import React ,{useEffect , useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import userService from "../../Services/userService";
import Message from '../Formulaires/Message';

export default function BarChart(props){
  const theme = useTheme();
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
      userService.dashboardCurrents().then((response) => {
        setResults(response.data.results)
    }).catch(err => {
        console.log(err);
        setMessage("Erreur de chargement des statistiques actuelles, veuillez réessayer.");
        setOpen(true);
    })
  },[])


  const data = {
    datasets: [
      {
        backgroundColor:'#5664d2',
        data: [
            results.nbrDiplomesDeugCrees,
            results.nbrDiplomesDeugReedites,
            results.nbrDiplomesDeugImprimes, 
            results.nbrDiplomesDeugSignes, 
            results.nbrDiplomesDeugPresidence, 
            results.nbrDiplomesDeugRecus, 
            results.nbrDiplomesDeugPrets, 
      ],
        label: 'DEUG'
      },
      {
        backgroundColor: grey[300],       
        data: [
          results.nbrDiplomesLicenceCrees,
          results.nbrDiplomesLicenceReedites, 
          results.nbrDiplomesLicenceImprimes, 
          results.nbrDiplomesLicenceSignes, 
          results.nbrDiplomesLicencePresidence, 
          results.nbrDiplomesLicenceRecus, 
          results.nbrDiplomesLicencePrets, 
    ],
        label: 'LICENCE'
      }
    ],
    labels: ['Créés', 'Réédités', 'Imprimés', 'Signés', 'A la Présidence', 'Reçus', 'Prêts']
  };

  const options = {
    animation: {
      animateScale : true
    },
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: true, align: 'end'},
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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

  const handleCallBackOpen = (open) => {
    setOpen(open);
  }

  return (
    <Card {...props}>
        {open && <Message message={message} success="error" callBackOpen={handleCallBackOpen}/>}
      <CardHeader
        title="Statistiques actuelles"
        titleTypographyProps={{
                    color: "textSecondary",
                    variant: "h6"
                }}
      />
      <Divider light={true}/>
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      {/* <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box> */}
    </Card>
  );
}

