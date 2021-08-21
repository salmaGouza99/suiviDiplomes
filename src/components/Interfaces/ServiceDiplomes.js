import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import NavBar from '../Navigation/NavBar';
import UsersGrid from '../Users/UsersGrid';
import Header from '../Navigation/Header';
import PrintIcon from '@material-ui/icons/Print';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import SendIcon from '@material-ui/icons/Send';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Profil from '../Users/Profil';
import LinkIcon from '@material-ui/icons/Link';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SchoolIcon from '@material-ui/icons/School';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DiplomesSelonStatut from '../Diplomes/DiplomesSelonStatut';

// import DiplomesAImprimer from '../Diplomes/DiplomesAImprimer';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Suivi de Diplômes '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

function ServiceDiplomes(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [navItems, setNavItems] = useState([]);

  const {classes, openPrint,openDecanat,openSign,openPresidence,openProfil ,title} = props;
  const history = useHistory();

  useEffect(() => {
    if (props?.role !== 5) {
      history.push("/");
      window.location.reload();
    }
    else {
      setNavItems(
        [
          {
            id: 'Menu',
            children: [
              { id: 'Diplômes à imprimer', icon: <PrintIcon />, active: true, link: '/DiplomesAImprimer' },
              { id: 'Diplômes envoyés au décanat', icon: <SendIcon />, link: '/DiplomesEnvoyeDecanat' },
              { id: 'Diplômes signés', icon: <CreateIcon />, link: '/DiplomesSignes' },
              { id: 'Diplômes envoyés a la présidence', icon: <AccountBalanceIcon />, link: '/DiplomesPresidence' },
            ],
          },
          {
            id: 'Profil',
            children: [
              { id: 'Afficher', icon: <VisibilityIcon />, link: '/ServiceDiplomes/Profil' },
            ],
          },
        ]
      );
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCallback = (childData) => {
    setCurrentIndex(childData);
  };


  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <NavBar PaperProps={{ style: { width: drawerWidth } }}
            navItems={navItems} />
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} parentCallback={handleCallback} title={title} />
          <main className={classes.main}>

            {openPrint &&
              <DiplomesSelonStatut selection={true}
                printButton={true}
                statut={1}
                dateEnvoi="date_creationDossier_envoiAuServiceDiplome"
                dateHeaderName="Date envoi" />

            }
            {openDecanat &&
              <DiplomesSelonStatut selection={false}
                printButton={false}
                statut={3}
                dateEnvoi="date_impression_envoiAuDecanat"
                dateHeaderName="Date impression" />
            }
            {openSign &&
              <DiplomesSelonStatut selection={true}
                statut={4}
                dateEnvoi="date_singature_renvoiAuServiceDiplome"
                dateHeaderName="Date signature"
                borderauButton={true} />
            }
            {openPresidence &&
              <DiplomesSelonStatut selection={false}
                statut={5}
                dateEnvoi="date_generationBorodeaux_envoiApresidence"
                dateHeaderName="Date Envoi a la presidence"
              />
            }
            {openProfil && <Profil />}
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

ServiceDiplomes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServiceDiplomes);