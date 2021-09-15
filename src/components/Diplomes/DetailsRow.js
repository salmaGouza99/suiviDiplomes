import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function DetailsRow(props) {
    return (
        // set the title and the data style in the dialog of diplome info
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}>
            <Grid item xs={6}>
                <Typography variant="body" component="h4" style={{color: '#a104fc'}}>
                    {props.title}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body2" component="p" style={{color: props.color ? props?.color : ''}}>
                    {props.data}
                </Typography>
            </Grid>
        </Grid>
      
    );
}