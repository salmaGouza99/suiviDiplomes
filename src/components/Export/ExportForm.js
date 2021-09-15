import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 430,
    marginBottom: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(15),
    background: '#a104fc', 
    '&:hover': {
      background: "#ab5fe7",
    },
    color: 'white'
  },
  container: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginLeft: theme.spacing(2),
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
}));

export default function ExportForm(props) {
  // States
  const classes = useStyles();
  const [checked, setChecked] = useState([false, false, false, false, false, false, false, false, false, false, false]);
  const open = props?.handleOpen;
  const archive = props?.archive;

  // handle the choice of select all items
  const handleChangeAll = (event) => {
    if(checked.indexOf(true) > -1 ) {
      setChecked([false, false, false, false, false, false, false, false, false, false, false]);
    } else {
      setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked, 
                  event.target.checked, event.target.checked, event.target.checked, event.target.checked,
                  event.target.checked, event.target.checked, event.target.checked]);
    }
  };

  // handle the selection of each item
  const handleChange1 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3], checked[4],
                checked[5], checked[6], checked[7], checked[8], checked[9], checked[10] ]);
  };
  const handleChange2 = (event) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3], checked[4],
                checked[5], checked[6], checked[7], checked[8], checked[9], checked[10] ]);
  };
  const handleChange3 = (event) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3], checked[4],
                checked[5], checked[6], checked[7], checked[8], checked[9], checked[10] ]);
  };
  const handleChange4 = (event) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked, checked[4],
                checked[5], checked[6], checked[7], checked[8], checked[9], checked[10] ]);
  };
  const handleChange5 = (event) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], event.target.checked,
                checked[5], checked[6], checked[7], checked[8], checked[9], checked[10] ]);
  };
  const handleChange6 = (event) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], checked[4],
                event.target.checked, checked[6], checked[7], checked[8], checked[9], checked[10] ]);
  };
  const handleChange7 = (event) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], checked[4],
                checked[5], event.target.checked, checked[7], checked[8], checked[9], checked[10] ]);
  };
  const handleChange8 = (event) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], checked[4],
                checked[5], checked[6], event.target.checked, checked[8], checked[9], checked[10] ]);
  };
  const handleChange9 = (event) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], checked[4],
                checked[5], checked[6], checked[7], event.target.checked, checked[9], checked[10] ]);
  };
  const handleChange10 = (event) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], checked[4],
                checked[5], checked[6], checked[7], checked[8], event.target.checked, checked[10] ]);
  };

  const handleChange11 = (event) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], checked[4],
                checked[5], checked[6], checked[7], checked[8], checked[9], event.target.checked ]);
  };


  // close the form of choosing items for export data 
  const handleClose = (e) => {
    props.closeCallback(false, false);
  }

  // send the checked items to the parent component
  const handleSumbit = (e) => {
    e.preventDefault();
    props.checkedData(checked);
    props.closeCallback(false, false);
  }

  // the children items
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Apogée"
        control={<Checkbox color="secondary" checked={checked[0]} onChange={handleChange1} />}
      />
      <FormControlLabel
        label="CIN"
        control={<Checkbox color="secondary" checked={checked[1]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="CNE"
        control={<Checkbox color="secondary" checked={checked[2]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Nom et prénom (en Français)"
        control={<Checkbox color="secondary" checked={checked[3]} onChange={handleChange4} />}
      />
      <FormControlLabel
        label="Nom et prénom (en Arabe)"
        control={<Checkbox color="secondary" checked={checked[4]} onChange={handleChange5} />}
      />
      <FormControlLabel
        label="Filière"
        control={<Checkbox color="secondary" checked={checked[5]} onChange={handleChange6} />}
      />
      <FormControlLabel
        label="Option"
        control={<Checkbox color="secondary" checked={checked[6]} onChange={handleChange7} />}
      />
      <FormControlLabel
        label="Type de diplôme"
        control={<Checkbox color="secondary" checked={checked[7]} onChange={handleChange8} />}
      />
      {!archive &&
      <FormControlLabel
        label="Statut du diplôme"
        control={<Checkbox color="secondary" checked={checked[8]} onChange={handleChange9} />}
      />}
      <FormControlLabel
        label="Type d'erreur (en cas de réédition)"
        control={<Checkbox color="secondary" checked={checked[9]} onChange={handleChange10} />}
      />
      <FormControlLabel
        label="Dates du parcours détaillé du diplôme"
        control={<Checkbox color="secondary" checked={checked[10]} onChange={handleChange11} />}
      />
    </Box>
  );

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogContent>
              <IconButton color="primary" aria-label="upload picture"
                component="span" size="small" className={classes.closeIcon}>
                <CloseIcon onClick={handleClose}/>
              </IconButton>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" style={{color: '#a104fc', marginTop: 8}} align='center'>
                  Veuillez sélectionner s'il vous plaît les champs à exporter
                </Typography>
              </CardContent>

            </CardActionArea>
            <CardActions>
              <Container component="main" maxWidth="xs">
                <form className={classes.form} onSubmit={handleSumbit} validate>
                    {/* The select all item */}
                    <FormControlLabel
                        label="Séléctionner tout"
                        style={{color: 'gray'}}
                        control={
                        <Checkbox color="secondary"
                            checked={checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5]
                                    && checked[6] && checked[7] && checked[8] && checked[9] && checked[10]}
                            indeterminate={checked.indexOf(true) > -1 ? true : false}
                            onChange={handleChangeAll} />}
                    />
                    {/* call the children items */}
                    {children}
                    <Button 
                      variant="contained" color="primary" size="small"
                      type='submit' className={classes.fab} startIcon={<DoneIcon />}
                      disabled={checked.indexOf(true) > -1 ? false : true}
                    >Valider</Button>
                </form>
              </Container>
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}