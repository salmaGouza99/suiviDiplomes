import React ,{useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Form from "./Form";
import Message from './Message';
import userService from "../../Services/userService";
import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    backgroundColor: theme.palette.background.paper,
  },
  container :{
    marginTop: theme.spacing(15),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function FormsPage(props) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [formDeug, setFormDeug] = useState('');
  const [formLicence, setFormLicence] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // if (props?.role !== 1) {
    //   history.push("/Acceuil");
    //   window.location.reload();  
    // }

    userService.getAllForms().then((response) => {
        response.data.forms.forEach(form => {
          if(form.type_formulaire === "DEUG"){
            setFormDeug(form);
          }else if(form.type_formulaire === "Licence"){
            setFormLicence(form);
          }
          setValue(1);
        });
      }).catch(err => {
        setMessage("Erreur de chargement , veuillez reessayer !");
        setError(true);
    })
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.paper}>
     {error && <Message message={message} success="error"/>}
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Formulaire de demande de DEUG" {...a11yProps(0)} />
          <Tab label="Formulaire de demande de Licence" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Form form={formDeug} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Form form={formLicence} />
      </TabPanel>
</Paper>
  );
}
