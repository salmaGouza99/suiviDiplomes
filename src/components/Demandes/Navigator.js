import React, { useState, useEffect, initialState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar, Box, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';import authService from "../../Services/authService";

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  email: {
    color: theme.palette.common.white,
    // fontSize: 23,
    textAlign: 'center',
    marginTop: theme.spacing(1),
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
  nested: {
    paddingLeft: theme.spacing(6),
    paddingTop: 2,
    paddingBottom: 2,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  role: {
    paddingTop: 1,
    // paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
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
  itemIcon2: {
    minWidth: 'auto',
    marginRight: theme.spacing(1.1),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: '#fff',
  },
  infos: {
    backgroundColor: "#232f3e",
    padding: "25px",
  },
});

function Navigator(props) {
  const { classes, ...other } = props;
  const [email, setEmail] = useState(initialState);
  const [role, setRole] = useState(initialState);
  // const [selectedItem, setSelectedItem] = useState('0');
  const [open, setOpen] = useState(false);
  const emailUpdate = props?.emailUpdate;
  const indexEdit = props?.indexEdit;
  const history = useHistory();
  const selectedItem = localStorage.getItem("index");

  useEffect(() => {
    const loggedInUser = authService.getCurrentUser();
    setRole(loggedInUser?.user?.roles[0]?.name);
    setEmail(emailUpdate !== null ? props?.emailUpdate : loggedInUser?.user?.email);
  }, [emailUpdate]);

  useEffect(() => {
    if(indexEdit) {
      // setSelectedItem(indexEdit);
      localStorage.setItem("index", indexEdit);
      props.parentCallback(indexEdit);
    }
  }, [indexEdit]);

  const handleListItemClick = (event, index) => {
    // setSelectedItem(index);
    localStorage.setItem("index", index);
    props.parentCallback(index);
  };

  const handleLogout = () => {
    authService.logout();
    history.push("/");
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" {...other}>
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
                  className={classes.email}
                    variant="h6"
                >
                    {email}
                </Typography>
                <Typography
                    className={classes.role}
                    variant="body1"
                >
                    {role}
                </Typography>
            </Box>
            <Divider light={true} />
      <List disablePadding>
        {/* <React.Fragment key={'info pers'}>
          <div className={classes.itemCategory}>
            <ListItem align='center'>
              <ListItemText
                classes={{
                  primary: classes.email,
                }}>
                {email}
              </ListItemText>
            </ListItem>
            <ListItem
              key={"role"}
              className={clsx(classes.role)}
            >
              <ListItemText >
                {role}
              </ListItemText>
            </ListItem>

          </div>
        </React.Fragment> */}

        <ListItem 
          key="Acceuil"
          button
          onClick={(event) => handleListItemClick(event, '0')}
          className={clsx(classes.item, classes.itemCategory, selectedItem === '0' && classes.itemActiveItem)}
        >
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
        {props?.navItems.map(({ id, children }) => (
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
            {children.map(({ id: childId, icon, children, index }) => (
                children ?
                <><ListItem button onClick={handleClick} className={classes.item}>
                    <ListItemIcon className={classes.itemIcon}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                        }}
                    >
                        {childId}
                    </ListItemText>
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                {children.map(({ id: childId2, icon: icon2, index: index2 }) => (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem key={childId2}
                                  button
                                  onClick={(event) => handleListItemClick(event, index2)}
                                  className={clsx(classes.nested, selectedItem === index2 && classes.itemActiveItem)}>
                                <ListItemIcon className={classes.itemIcon2}>
                                    {icon2}
                                </ListItemIcon>
                                <ListItemText
                                  classes={{
                                      primary: classes.itemPrimary,
                                  }}
                                >
                                    {childId2}
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Collapse>))}</> :

                <>   
                <ListItem
                  key={childId}
                  button
                  onClick={(event) => handleListItemClick(event, index)}
                  className={clsx(classes.item, selectedItem === index && classes.itemActiveItem)}
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
              </>
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

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
