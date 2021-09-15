import React, { useState, useEffect } from 'react';
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
import { Box, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { indigo } from '@material-ui/core/colors';
import authService from "../../Services/authService";
import fsjes from "../../Images/fsjes.png";

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
          backgroundColor: "#E6D9F3",
      },
  },
  logout: {
      paddingTop: 1,
      paddingBottom: 1,
      marginTop: theme.spacing(2),
      color: '6b778c',
      '&:hover,&:focus': {
          backgroundColor: "#E6D9F3",
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
  itemPrimary: {
      fontSize: 'inherit',
      color: 'gray',
  },
  itemActivePrimary: {
    color: '#bb0086',
    fontWeight: 'bold',
  },
  itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(2),
      color: '#6b778c',
  },
  itemActiveIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
    color: '#bb0086',
  },
  itemIcon2: {
      minWidth: 'auto',
      marginRight: theme.spacing(1),
      color: '#6b778c',
  },
  itemActiveIcon2: {
    minWidth: 'auto',
    marginRight: theme.spacing(1),
    color: '#bb0086',
  },
  divider: {
      marginTop: theme.spacing(2),
  },
  menu: {
      backgroundColor: '#fff',
  },
  infos: {
      backgroundColor: "#F6EDFF",
  },
  large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: '#fff',
  },
  acceuil :{
      '&:hover,&:focus': {
          backgroundColor: "#E6D9F3",
      },
  },
  nested: {
      paddingLeft: theme.spacing(6),
      paddingTop: 2,
      paddingBottom: 2,
      color: '#6b778c',
      '&:hover,&:focus': {
          backgroundColor:  indigo[50],
      },
  },
  titre: {
    fontWeight: 'bold',
    paddingTop: 4,
    color: '#37183a'
  }
});


function SideBar(props) {
  // States
  const { classes, ...other } = props;
  const [open, setOpen] = useState(false);
  const indexEdit = props?.indexEdit;
  const history = useHistory();
  const selectedItem = localStorage.getItem("index");

  useEffect(() => {
    const loggedInUser = authService.getCurrentUser();
  }, []);

  useEffect(() => {
    if(indexEdit) {
      // if there is a call from the parent component to edit the profil, we set its index in localstorage
      localStorage.setItem("index", indexEdit);
      // and we send it to the parent
      props.parentCallback(indexEdit);
    }
  }, [indexEdit]);

  // change the index of itmes navside on click
  const handleListItemClick = (event, index) => {
    localStorage.setItem("index", index);
    props.parentCallback(index);
  };

  // if the item of logout is clicked we redirect the user to the login page
  const handleLogout = () => {
    authService.logout();
    history.push("/");
  };

  // open children items if they exist
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
              <img alt="fsjes" src={fsjes} width={215} height={150} style={{border: '1px solid #37183a', marginTop: -4}}/>
              <Typography
                  className={classes.titre}
                    variant="h6"
                >  
                  FSJESR-AGDAL
                </Typography>
                <Typography
                    variant="body1"
                    align='center'
                    style={{color: '#37183a', marginBottom: -10}}
                > 
                  كلية العلوم القانونية والاقتصادية والاجتماعية أكدال
                </Typography>
            </Box>
            <Divider />
      <List disablePadding className={classes.menu} >

        <ListItem 
          key="Acceuil"
          button
          onClick={(event) => handleListItemClick(event, '0')}
          className={clsx(classes.acceuil, selectedItem === '0' && classes.itemActiveItem)}
        >
          <ListItemIcon className={clsx(classes.itemIcon, selectedItem === '0' && classes.itemActiveIcon)}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: clsx(classes.itemPrimary, selectedItem === '0' && classes.itemActivePrimary),
            }}
          >
            Acceuil
          </ListItemText>
        </ListItem>
        <Divider light={true} />
        {props?.navItems.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText>
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, children, index }) => (
                children ?
                <><ListItem button onClick={handleClick} className={classes.item}>
                    <ListItemIcon className={clsx(classes.itemIcon, selectedItem === index && classes.itemActiveIcon)}>
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
                                <ListItemIcon className={clsx(classes.itemIcon2, selectedItem === index2 && classes.itemActiveIcon2)}>
                                    {icon2}
                                </ListItemIcon>
                                <ListItemText
                                  classes={{
                                      primary: clsx(classes.itemPrimary, selectedItem === index2 && classes.itemActivePrimary),
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
                  <ListItemIcon className={clsx(classes.itemIcon, selectedItem === index && classes.itemActiveIcon)}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: clsx(classes.itemPrimary, selectedItem === index && classes.itemActivePrimary),
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
              </>
            ))}
            <Divider className={classes.divider} light={true}/>
          </React.Fragment>
        ))}
        <ListItem
          key="Se déconnecter"
          button
          className={clsx(classes.logout)}
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
        <br></br>
      </List>
    </Drawer>
  );
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);
