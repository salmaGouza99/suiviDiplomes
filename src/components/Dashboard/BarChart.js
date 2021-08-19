import React ,{useEffect , useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { indigo ,brown,grey} from '@material-ui/core/colors';
import userService from "../../Services/userService";


export default function BarChart(props){
  const theme = useTheme();
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
      userService.dashboardCurrents().then((response) => {
        setResults(response.data.results)
    }).catch(err => {
        console.log(err);
        setMessage("Erreur de chargement , veuillez reessayer !");
    })



  },[])


  const data = {
    datasets: [
      {
        backgroundColor:'#5664d2',
        data: [
            results.nbrDiplomesDeugCree,
            results.nbrDiplomesDeugDecanat, 
            results.nbrDiplomesDeugSignes, 
            results.nbrDiplomesDeugPresidence, 
            results.nbrDiplomesDeugRetrait, 
      ],
        label: 'DEUG'
      },
      {
        backgroundColor: grey[300],       
        data: [
          results.nbrDiplomeslicenceCree,
          results.nbrDiplomeslicenceDecanat, 
          results.nbrDiplomeslicenceSignes, 
          results.nbrDiplomeslicencePresidence, 
          results.nbrDiplomeslicenceRetrait, 
    ],
        label: 'LICENCE'
      }
    ],
    labels: ['Crées', 'Chez Décanat', 'Signés', 'A la Présidence', 'Prêts']
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



  return (
    <Card {...props}>
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

