import React, {useEffect , useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

 
export default function Message(props) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      setOpen(props.success);
    });

  const handleClose = () => {
    props.closeCallback(false);
  };

  return (
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert severity={props.success} onClose={handleClose}>
          {props.message}
        </Alert>
      </Snackbar>
  );
}
