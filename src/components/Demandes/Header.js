import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import authService from "../../Services/authService";
import ProfilCard from "../Profil/ProfilCard";
import Aide from "../Aide/Aide";
import TodayDate from "../Date/DatePicker";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
    secondaryBar: {
        zIndex: 0,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
        padding: 4,
    },
    button: {
        borderColor: lightColor,
        marginRight: theme.spacing(1),
        '&:hover': {
            background: "#3A7BAF",
        },
    },
    profilRoot: {
        position: 'relative',
    },
    profil: {
        position: 'absolute',
        top: theme.spacing(5),
        right: 0,
        left: -theme.spacing(24),
    },
    aideRoot: {
        position: 'relative',
        marginTop: -theme.spacing(1.5),
    },
    aide: {
        position: 'absolute',
        top: theme.spacing(13),
        right: 0,
        left: -theme.spacing(41.9),
    },
});

function Header(props) {
    const { classes, onDrawerToggle, emailUpdate, title, role, tabs } = props;
    const [currentIndex,setCurrentIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setCurrentIndex(0);
        props.parentCallback(0);
    },[title]);

    const handleChange = (event, currentSelectedIndex) => {
        setCurrentIndex(currentSelectedIndex);
        props.parentCallback(currentSelectedIndex);
    };

    const handleLogout = () => {
        authService.logout();
        history.push("/");
    };

    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    
      const handleClickAway = () => {
        setOpen(false);
    };

    const handleClick1 = () => {
        setOpen1((prev) => !prev);
    };
    
      const handleClickAway1 = () => {
        setOpen1(false);
    };

    const handleCallBackEditProfil = (edit) => {
        props?.callBackEditProfil(edit);
        setOpen(false);
    };

    return (
        <React.Fragment>
            <AppBar style={{ background: "#0268B5" }} position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Hidden smUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={onDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item xs />
                        <Grid item>
                            <Button className={classes.button} variant="outlined" 
                                color="inherit" size="small" onClick={handleLogout}> 
                                Se déconnecter
                            </Button>
                        </Grid>
                        <Grid item>
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <div className={classes.profilRoot}>
                                    <Tooltip title={open ? '' : "Profil"}>
                                        <IconButton color="inherit" className={classes.iconButtonAvatar} 
                                            onClick={handleClick}>
                                            <Avatar src="" alt="My Avatar" />
                                        </IconButton>
                                    </Tooltip>
                                    {open ? (
                                    <div className={classes.profil}>
                                    <ProfilCard callBackEditProfil={handleCallBackEditProfil} 
                                            emailUpdate={emailUpdate} />
                                    </div>
                                    ) : null}
                                    {open1 ? (
                                    <div className={classes.aide}>
                                    <Aide title={title} role={role}/>
                                    </div>
                                    ) : null}
                                </div>
                            </ClickAwayListener>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div" 
                className={classes.secondaryBar}
                style={{ background: "#0268B5", marginTop: -12}}
                position="static"
                elevation={0}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                {title}
                            </Typography>
                        </Grid>
                        
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                className={classes.secondaryBar}
                style={{ background: "#0268B5", marginTop: -8}}
                position="static"
                elevation={0}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Tabs textColor="inherit" value={currentIndex} onChange={handleChange}>
                                {tabs && <Tab textColor="inherit" label="DEUG" />}
                                {tabs && <Tab textColor="inherit" label="Licence" />}
                            </Tabs>      
                        </Grid>
                        <Grid item >
                            <TodayDate/>     
                        </Grid>
                        <Grid item>
                            <ClickAwayListener onClickAway={handleClickAway1}>
                                <div className={classes.aideRoot}>
                                    <Tooltip title={open1 ? '' : "Obtenir de l'aide"}>
                                        <IconButton color="inherit" onClick={handleClick1}>
                                            <HelpIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </ClickAwayListener>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);