import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SchoolIcon from '@material-ui/icons/School';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Navigator from '../components/Demandes/Navigator';
import DiplomesTraitement from '../components/Dossiers/DiplomesTraitement';
import Header from '../components/Demandes/Header';
import Profil from '../components/Profil/Profil';
import Acceuil from '../components/Acceuil/Acceuil';
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

function BureauOrdre(props) {
    const { classes } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [indexItem, setIndexItem] = useState('0');
    const [title, setTitle] = useState('');
    const [navItems, setNavItems] = useState([]);
    const [emailUpdate, setEmailUpdate] = useState(null);
    const [changeIndexToEdit, setChangeIndexToEdit] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const loggedOut = authService.getLoggedOutValue();
        if(loggedOut === true || props?.role !== 7) {
            history.push("/");
        } else {
            setNavItems([
                {
                    id: 'Menu',
                    children: [
                        { id: 'Diplômes en attente de réception', icon: <SchoolOutlinedIcon />, index: '1'},
                        { id: 'Diplômes reçus', icon: <SchoolIcon />, index: '2'},
                    ],
                },
                {
                    id: 'Profil',
                    children: [
                        { id: 'Afficher', icon: <VisibilityIcon />, index: '3'},
                    ],
                },
            ]);
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
        setChangeIndexToEdit(false);
        childData === '0' && setTitle("Acceuil");
        childData === '1' && setTitle("Diplômes en attente de réception");
        childData === '2' && setTitle("Diplômes reçus");
        childData === '3' && setTitle("Profil Personnel");
    };

    const handleCallbackProfil = (childData) => {
        setEmailUpdate(childData);
    };

    const handleCallBackEditProfil = (edit) => {
        setChangeIndexToEdit('3');
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
                        title={title} tabs={indexItem === '0' || indexItem === '3' ? false : true} />
                    <main className={classes.main}>
                        {indexItem === '0' && <Acceuil role={props?.role} />}
                        {indexItem === '1' && <DiplomesTraitement currentIndex={currentIndex} 
                                                role={props?.role} traitement={true} />}
                        {indexItem === '2' && <DiplomesTraitement currentIndex={currentIndex} 
                                                role={props?.role} traitement={false} />}
                        {indexItem === '3' && <Profil parentCallback={handleCallbackProfil}/>}
                    </main>
                    <footer className={classes.footer}>
                        <Copyright />
                    </footer>
                </div>
            </div>
        </ThemeProvider>
    );
}

BureauOrdre.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BureauOrdre);
