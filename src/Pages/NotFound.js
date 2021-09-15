import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import img from "../Images/404.png";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 85
    },
    title: {
        fontSize:30
    },
    paragraph: {
        color: 'gray'
    },
    button: {
        marginTop: 20, 
        color: 'white',
        background: '#0b62ce',
        '&:hover': {
            background: "#436bc3",
        }
    }
  }));

export default function NotFound() {
    const classes = useStyles();

  return (
      <Container className={classes.root}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
              <Box fontWeight="fontWeightBold" className={classes.title}>
                    Désolé, page introuvable !
              </Box>
              <br></br>
            <Typography className={classes.paragraph}>
                Désolé, nous n'avons pas pu trouver la page que vous recherchez. Peut-être vous avez mal saisi l'URL !  
                Assurez-vous de vérifier votre orthographe.
            </Typography>

              <Box
                component="img"
                src={img}
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />

            <Button to="/" size='large' variant="contained" component={RouterLink} className={classes.button}>
                {/* If the user is loggedin, redirect him to her appropriate page, else to the login page */}
                ALLER A L'ACCEUIL
            </Button>
          </Box>
      </Container>
  );
}
