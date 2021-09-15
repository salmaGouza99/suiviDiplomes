import React, {useEffect , useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

 
export default function Message(props) {

  // close the success or the error message
  const handleClose = () => {
    props?.callBackOpen(false);
  };

  return (
      <Snackbar open={true} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={props.success} onClose={handleClose}>
          {props.message}
        </Alert>
      </Snackbar>
  );
}
