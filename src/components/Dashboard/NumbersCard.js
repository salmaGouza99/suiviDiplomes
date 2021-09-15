import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: '#fff',
  },
}));

export default function NumbersCard(props) {
  // States
  const classes = useStyles();
  const { title, number, icon, color } = props;

  return (
    // return the styling card numbers of Dashboard component
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          justifyContent='space-between'
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              {title}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {number}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{ backgroundColor: `${color}` }}
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56
              }}
              className={classes.large}
              variant="rounded"
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
