import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SchoolIcon from '@material-ui/icons/School';
import TimelineIcon from '@material-ui/icons/Timeline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PersonIcon from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DemandesGrid from '../components/Demandes/DemandesGrid';
import DiplomesTraitement from '../components/Diplomes/DiplomesTraitement';
import Header from '../components/Nav/Header';
import SideBar from '../components/Nav/SideBar';
import Profil from '../components/Profil/Profil';
import Acceuil from '../components/Acceuil/Acceuil';
import FormsPage from '../components/Formulaires/FormsPage';
import Dashboard from '../components/Dashboard/Dashboard';
import UsersGrid from '../components/Users/UsersGrid';
import RolesGrid from '../components/Roles/RolesGrid';
import authService from "../Services/authService";
import fsjes from "../Images/logoFsjesSmall.png";

function Copyright() {
    return (
        <Grid container direction="row" 
                    alignItems="center" >
            <Grid item >
                <img alt="logo" src={fsjes} width={30} height={25} style={{marginLeft: 370}}/>
            </Grid>
            <Grid item>
                <Typography variant="body2" color="textSecondary" style={{marginLeft: 12}}>
                    {'Copyright © Suivi de Diplômes '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Grid>
            <Grid item >
                <img alt="logo" src={fsjes} width={30} height={25} style={{marginLeft: 10}}/>
            </Grid>
        </Grid>
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
                backgroundColor: 'white',
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
        background: '#F6EDFF',
    },
    footer: {
        padding: theme.spacing(2),
        background: '#F6EDFF',
    },
};

function Admin(props) {
    // States
    const { classes } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [indexItem, setIndexItem] = useState('0');
    const [title, setTitle] = useState('');
    const [navItems, setNavItems] = useState([]);
    const [emailUpdate, setEmailUpdate] = useState(null);
    const [changeIndexToEdit, setChangeIndexToEdit] = useState('');
    const history = useHistory();

    useEffect(() => {
        const loggedOut = authService.getLoggedOutValue();
        // test if the user is loggedout or he hasn't the role of Admin, we redirect him to the login page
        if(loggedOut === true || props?.role !== 1) {
            history.push("/");
        // else we show him the content of this page
        } else {
          setNavItems(
            [ // set the navbar of Admin
              {
                id: 'Tableau de bord',
                children: [
                    { id: 'Statistiques', icon: <TimelineIcon />, index: '1'}
                ],
              },
              { 
                id: 'Menu',
                children: [
                  { id: 'Utilisateurs', icon: <PersonIcon />, index: '2' },
                  { id: 'Rôles', icon: <AssignmentIndIcon />, index: '3' },
                  { id: 'Formulaires', icon: <LinkIcon />, index: '4' },
                  { id: 'Demandes non traitées', icon: <LibraryBooksIcon />, index: '5' },
                  { id: 'Diplômes', icon: <SchoolIcon />, children: [
                        {id: "En cours de traitement", icon: <HourglassEmptyIcon/>, index: '6'},
                        {id: "Retirés", icon: <UnarchiveIcon/>, index: '7'}
                  ]},
                ],
              },
              {
                id: 'Profil',
                children: [
                  { id: 'Afficher', icon: <VisibilityIcon />, index: '8' }
                ],
              },
            ]
          );
          // get the index of navbar from the localstorage in case of refresh page
          handleCallbackNav(localStorage.getItem("index"));
        }
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // set the index of the header if exists (DEUG or Licence)
    const handleCallbackHeader = (childData) => {
        setCurrentIndex(childData);
    };
    
    // set the index of the navbar and the appropriate title
    const handleCallbackNav = (childData) => {
        setIndexItem(childData);
        setChangeIndexToEdit('');
        childData === '0' && setTitle("Acceuil");
        childData === '1' && setTitle("Statistiques");
        childData === '2' && setTitle("Utilisateurs");
        childData === '3' && setTitle("Rôles");
        childData === '4' && setTitle("Formulaires");
        childData === '5' && setTitle("Demandes non traitées");
        childData === '6' && setTitle("Diplômes en cours de traitement");
        childData === '7' && setTitle("Diplômes retirés");
        childData === '8' && setTitle("Profil Personnel");
    };

    // In case of updating the email, we show it updated in the navbar
    const handleCallbackProfil = (childData) => {
        setEmailUpdate(childData);
    };

    // If the user choose to update his profil from the header
    const handleCallBackEditProfil = (edit) => {
        setChangeIndexToEdit('8');
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="js">
                        <SideBar
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            navItems={navItems}
                            parentCallback={handleCallbackNav} emailUpdate={emailUpdate}
                            indexEdit={changeIndexToEdit}
                        />
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <SideBar PaperProps={{ style: { width: drawerWidth, borderRight: '1px solid' } }}
                            navItems={navItems} parentCallback={handleCallbackNav} emailUpdate={emailUpdate}
                            indexEdit={changeIndexToEdit}/>
                    </Hidden>
                </nav>
                <div className={classes.app}>
                    <Header onDrawerToggle={handleDrawerToggle} parentCallback={handleCallbackHeader} role={props?.role}
                        callBackEditProfil={handleCallBackEditProfil} emailUpdate={emailUpdate} 
                        title={title} tabs={indexItem === '0' || indexItem === '1' || indexItem === '2' ||
                                            indexItem === '3' || indexItem === '4' || indexItem === '8' ? false : true} />
                    <main className={classes.main}>
                        {/* Open the appropriate component according to the chosen index */}
                        {indexItem === '0' && <Acceuil role={props?.role} />}
                        {indexItem === '1' && <Dashboard />}
                        {indexItem === '2' && <UsersGrid user={props?.user}/>}
                        {indexItem === '3' && <RolesGrid/>}
                        {indexItem === '4' && <FormsPage/>}
                        {indexItem === '5' && <DemandesGrid currentIndex={currentIndex} role={props?.role}/>}
                        {indexItem === '6' && <DiplomesTraitement currentIndex={currentIndex} 
                                                role={props?.role} traitement={true}/>}
                        {indexItem === '7' && <DiplomesTraitement currentIndex={currentIndex} 
                                                role={props?.role} traitement={true} archive={true}/>}
                        {indexItem === '8' && <Profil parentCallback={handleCallbackProfil} />}
                    </main>
                    <footer className={classes.footer}>
                        <Copyright />
                    </footer>
                </div>
            </div>
        </ThemeProvider>
    );
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);
