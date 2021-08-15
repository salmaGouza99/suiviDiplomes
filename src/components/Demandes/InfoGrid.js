import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,

  },
  media: {
    height: 80,
    backgroundImage: 'url(https://source.unsplash.com/random)',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(10),
  },
  container: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
}));

export default function UserForm(props) {
  const classes = useStyles();

  const handleClose = (e) => {
    window.location.reload();
    // setOpen(false)
  }
  
  return (
    <div>

      <Dialog open={props.handleOpen} aria-labelledby="form-dialog-title">
        <DialogContent>
              <IconButton color="primary" aria-label="upload picture"
                component="span" size="small" className={classes.closeIcon}>
                <CloseIcon onClick={handleClose}/>
              </IconButton>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image=""
                title=""
              />
              <CardContent>

                <Typography gutterBottom variant="h5" component="h2" color="primary">
                  {props.title}
                </Typography>

              </CardContent>

            </CardActionArea>
            <CardActions>
              <Container component="main" maxWidth="xs">
                <div>{props.demande}</div>
              </Container>
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}