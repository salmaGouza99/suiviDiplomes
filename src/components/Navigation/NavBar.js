import React, { useState, useEffect, initialState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import authService from "../../Services/authService";
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import {
    Avatar,
    Box,
    Typography
} from '@material-ui/core';
import { indigo,grey } from '@material-ui/core/colors';



const styles = (theme) => ({
    categoryHeader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    item: {
        paddingTop: 1,
        paddingBottom: 1,
        color: '#6b778c',
        '&:hover,&:focus': {
            backgroundColor:  indigo[50],
        },
    },
    logout: {
        paddingTop: 1,
        marginBottom: 100,
        marginTop: theme.spacing(2),
        color: '6b778c',
        '&:hover,&:focus': {
            backgroundColor: indigo[50],
        },
    },
    itemCategory: {
        backgroundColor: '#fff',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        fontSize: 23,
        color: theme.palette.common.white,
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemPrimary: {
        fontSize: 'inherit',
        color: '#6b778c',

    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
        color: '#5664d2',
        
    },
    divider: {
        marginTop: theme.spacing(2),
    },
    menu: {
        backgroundColor: '#fff',
    },
    infos: {
        backgroundColor: indigo[50],
        padding: "30px"
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        color: '#fff',
    },
    acceuil :{
        '&:hover,&:focus': {
            backgroundColor: grey[100],
        },
    }
});

function NavBar(props) {
    const { classes, navItems, ...other } = props;
    const [email, setEmail] = useState(initialState);
    const [role, setRole] = useState(initialState);

    const history = useHistory();

    useEffect(() => {
        const loggedInUser = authService.getCurrentUser();
        if (loggedInUser) {
            setEmail(loggedInUser?.user?.email);
            setRole(loggedInUser?.user?.roles[0]?.name);

        }
    });

    const handleLogout = () => {
        authService.logout();
        history.push("/");
    };

    return (
        <Drawer variant="permanent" {...other}  >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2
                }}
                className={classes.infos}
            >
                <Avatar
                    className={classes.large}
                    sx={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64
                    }}
                />
                <Typography
                    color="textPrimary"
                    variant="h6"
                >
                    {email}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body1"
                >
                    {role}
                </Typography>
            </Box>
            <Divider light={true} />
            <List disablePadding className={classes.menu} >
                <Link to="/Acceuil"
                 style={{ textDecoration: 'none' }}>
                    <ListItem className={classes.acceuil}>
                        <ListItemIcon className={classes.itemIcon}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classes.itemPrimary,
                            }}
                        >
                            Acceuil
                        </ListItemText>
                    </ListItem>
                </Link>
                <Divider light={true} />

                {navItems.map(({ id, children }) => (
                    <React.Fragment key={id} >
                        <ListItem className={classes.categoryHeader} key={id}>
                            <ListItemText>
                                {id}
                            </ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, active, link }) => (
                            <Link to={link}
                                style={{ textDecoration: 'none' }}>
                                <ListItem
                                    key={childId}
                                    button
                                    className={clsx(classes.item, active && classes.itemActiveItem)}
                                >
                                    <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.itemPrimary,
                                        }}
                                    >
                                        {childId}
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        ))}
                        <Divider className={classes.divider} light={true} />
                    </React.Fragment>
                ))}


                <ListItem
                    key="Se déconnecter"
                    button
                    className={clsx(classes.logout, false && classes.itemActiveItem)}
                >
                    <ListItemIcon className={classes.itemIcon}> <ExitToAppIcon /> </ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                        }}
                        onClick={handleLogout}
                    >
                        Se déconnecter
                    </ListItemText>
                </ListItem>
            </List>
        </Drawer>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
