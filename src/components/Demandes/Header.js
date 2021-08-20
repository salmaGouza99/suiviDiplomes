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
import { withStyles } from '@material-ui/core/styles';
import authService from "../../Services/authService";
import { useEffect } from 'react';

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
});

function Header(props) {
    const { classes, onDrawerToggle, title } = props;
    const [currentIndex,setCurrentIndex] = useState(0);
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
                            <Tooltip title="Profil">
                                <IconButton color="inherit" className={classes.iconButtonAvatar}>
                                    <Avatar src="" alt="My Avatar" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                className={classes.secondaryBar}
                style={{ background: "#0268B5" }}
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
                            <Tooltip title="Aide">
                                <IconButton color="inherit" >
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                className={classes.secondaryBar}
                style={{ background: "#0268B5" }}
                position="static"
                elevation={0}
            >
                <Tabs textColor="inherit" value={currentIndex} onChange={handleChange}>
                    {props?.tabs && <Tab textColor="inherit" label="DEUG" />}
                    {props?.tabs && <Tab textColor="inherit" label="Licence" />}
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