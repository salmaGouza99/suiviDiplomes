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
import AuthService from "../../Services/AuthService";
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";



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
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover,&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    logout: {
        paddingTop: 1,
        paddingBottom: 1,
        marginTop: theme.spacing(2),
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover,&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemCategory: {
        backgroundColor: '#232f3e',
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
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(2),
    },
});

function NavBar(props) {
    const { classes, ...other } = props;
    const [email, setEmail] = useState(initialState);
    const [role, setRole] = useState(initialState);
    const [navItems, setNavItems] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const loggedInUser = authService.getCurrentUser();
        if (loggedInUser) {
            setEmail(loggedInUser?.user?.email);
            setRole(loggedInUser?.user?.roles[0]?.name);

        }
        setNavItems(props.navItems);
    });

    const handleLogout = () => {
        authService.logout();
        history.push("/");
    };

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                    {email}
                </ListItem>
                <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                    {role}
                </ListItem>


                <ListItem className={clsx(classes.item, classes.itemCategory)}>
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

                {navItems.map(({ id, children }) => (
                    <React.Fragment key={id}>
                        <ListItem className={classes.categoryHeader}>
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                {id}
                            </ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, active,link }) => (
                             <Link to={link}>
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
                        <Divider className={classes.divider} />
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
