import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function AlertDialog(props) {

  const {setShowDialog, message} = props;

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
