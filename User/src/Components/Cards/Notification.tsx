import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Notifications } from '../../Models/Models';
import { useSelector } from 'react-redux';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Notification = ({setnotify}:any) => {
    //const{opennotification,message, type} = props;
    const notificationMessageBox = useSelector((state:any) => state.notification);
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
        setnotify(false);
    };
  return (
    <div>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notificationMessageBox.color} sx={{ width: '100%' }}>
                  { notificationMessageBox.message }
                </Alert>
            </Snackbar>
        </Stack>
    </div>
  )
}

export default Notification
