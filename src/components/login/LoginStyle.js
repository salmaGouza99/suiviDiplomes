import { makeStyles } from '@material-ui/core/styles';
import img from "../../FSJES_Agdal.png";

const useStyles = makeStyles((theme) => ({
    image: {
      backgroundImage: `url(${img})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      //filter: "brightness(50%)",
    },
    root: {
      maxWidth: 400,
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      backgroundColor: 'rgba(255,255,255,0.95)',
    },
    loading: {
      marginBottom: -theme.spacing(3),
      marginTop: theme.spacing(2),
      color: '#0268B5',
    },
    alert: {
      marginBottom: -theme.spacing(7),
      marginTop: theme.spacing(3),
      textAlign: 'center'
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    img: {
      width: 70,
      height: 70,
      margin: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0),
      background: '#0268B5',
      '&:hover': {
        background: "#3A7BAF",
      },
      color: '#FFFFFF'
    },
  }));

  export default useStyles;
