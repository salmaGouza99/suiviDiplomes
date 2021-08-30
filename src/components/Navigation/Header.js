import React, { useState } from 'react';
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
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import authService from "../../Services/authService";
import { useEffect } from 'react';
import Aide from "../Aide/Aide";
import ProfilCard from "../Profil/ProfilCard";


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
    },
    aide: {
        position: 'absolute',
        top: theme.spacing(10.5),
        right: 0,
        left: -theme.spacing(42.5),
    },
});

function Header(props) {
    const { classes, onDrawerToggle } = props;
    const [currentIndex,setCurrentIndex] = useState(0);
    const [title,setTilte] = useState('');
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const history = useHistory();

    useEffect(() => {
        setTilte(props.title);
    },[]);
    const handleChange = (event, currentSelectedIndex) => {
        setCurrentIndex(currentSelectedIndex);
        props.parentCallback(currentIndex);
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

    return (
        <React.Fragment>
            <AppBar style={{ background: "#5664d2" }} position="sticky" elevation={0}>
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
                                    <ProfilCard callBackEditProfil={null} 
                                            emailUpdate={null} />
                                    </div>
                                    ) : null}
                                    {open1 ? (
                                    <div className={classes.aide}>
                                    <Aide title={title} role={props?.role}/>
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
                style={{ background: "#5664d2" }} 
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
            <AppBar
                component="div"
                className={classes.secondaryBar}
                style={{ background: "#5664d2" }}
                position="static"
                elevation={0}
            >
                <Tabs textColor="inherit" value={currentIndex} onChange={handleChange}>
                    <Tab textColor="inherit" label="" />
                    <Tab textColor="inherit" label="" />
                </Tabs>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);