import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    data: {
       marginLeft: theme.spacing(5),
    },

}));
export default function ProfilInfos(props) {
    const classes = useStyles();

    return (



        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
        >
            <Typography component="h5" variant="subtitle1">
                {props.title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" className={classes.data}>
               {props.data}
            </Typography>
        </Grid>
    );


}