import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SchoolIcon from '@material-ui/icons/School';
import TimelineIcon from '@material-ui/icons/Timeline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Navigator from '../components/Demandes/Navigator';
import DemandesGrid from '../components/Demandes/DemandesGrid';
import DiplomesTraitement from '../components/Dossiers/DiplomesTraitement';
import Header from '../components/Demandes/Header';
import Profil from '../components/Profil/Profil';
import Acceuil from '../components/Acceuil/Acceuil';
import FormsPage from '../components/Formulaires/FormsPage';
import Dashboard from '../components/Dashboard/Dashboard';
import UsersGrid from '../components/Users/UsersGrid';
import RolesGrid from '../components/Roles/RolesGrid';
import authService from "../Services/authService";

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

function Admin(props) {
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
        if(loggedOut === true || props?.role !== 1) {
            history.push("/");
        } else {
          setNavItems(
            [
              {
                id: 'Menu',
                children: [
                  { id: 'Utilisateurs', icon: <PersonIcon />, index: '1' },
                  { id: 'Rôles', icon: <AssignmentIndIcon />, index: '2' },
                  { id: 'Formulaires', icon: <LinkIcon />, index: '3' },
                  { id: 'Demandes en attente', icon: <InsertDriveFileIcon />, index: '4' },
                  { id: 'Diplômes', icon: <SchoolIcon />, children: [
                        {id: "En cours de traitement", icon: <HourglassEmptyIcon/>, index: '5'},
                        {id: "Retirés", icon: <UnarchiveIcon/>, index: '6'}
                  ]},
                ],
              },
              {
                id: 'Tableau de bord',
                children: [
                  { id: 'Statistiques', icon: <TimelineIcon />, index: '7'}
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
          handleCallbackNav(localStorage.getItem("index"));
        }
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleCallbackHeader = (childData) => {
        setCurrentIndex(childData);
    };
    
    const handleCallbackNav = (childData) => {
        setIndexItem(childData);
        setChangeIndexToEdit('');
        childData === '0' && setTitle("Acceuil");
        childData === '1' && setTitle("Utilisateurs");
        childData === '2' && setTitle("Rôles");
        childData === '3' && setTitle("Formulaires");
        childData === '4' && setTitle("Demandes en attente");
        childData === '5' && setTitle("Diplômes en cours de traitement");
        childData === '6' && setTitle("Diplômes retirés");
        childData === '7' && setTitle("Statistiques");
        childData === '8' && setTitle("Profil Personnel");
    };

    const handleCallbackProfil = (childData) => {
        setEmailUpdate(childData);
    };

    const handleCallBackEditProfil = (edit) => {
        setChangeIndexToEdit('8');
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="js">
                        <Navigator
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
                        <Navigator PaperProps={{ style: { width: drawerWidth } }}
                            navItems={navItems} parentCallback={handleCallbackNav} emailUpdate={emailUpdate}
                            indexEdit={changeIndexToEdit}/>
                    </Hidden>
                </nav>
                <div className={classes.app}>
                    <Header onDrawerToggle={handleDrawerToggle} parentCallback={handleCallbackHeader} role={props?.role}
                        callBackEditProfil={handleCallBackEditProfil} emailUpdate={emailUpdate} 
                        title={title} tabs={indexItem === '0' || indexItem === '1' || indexItem === '2' ||
                                            indexItem === '3' || indexItem === '7' || indexItem === '8' ? false : true} />
                    <main className={classes.main}>
                        {indexItem === '0' && <Acceuil role={props?.role} />}
                        {indexItem === '1' && <UsersGrid user={props?.user}/>}
                        {indexItem === '2' && <RolesGrid/>}
                        {indexItem === '3' && <FormsPage/>}
                        {indexItem === '4' && <DemandesGrid currentIndex={currentIndex} role={props?.role}/>}
                        {indexItem === '5' && <DiplomesTraitement currentIndex={currentIndex} 
                                                role={props?.role} traitement={true}/>}
                        {indexItem === '6' && <DiplomesTraitement currentIndex={currentIndex} 
                                                role={props?.role} traitement={true} archive={true}/>}
                        {indexItem === '7' && <Dashboard />}
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
