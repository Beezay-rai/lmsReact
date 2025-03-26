import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setDialogState } from "../../redux/appSlices";

export default function DeleteDialog({ 
  open, 
  title = "Confirm Delete", 
  message = "Are you sure you want to delete this item?", 
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false
}) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setDialogState({ open: false }));
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    if (!loading) {
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" sx={{ py: 2 }}>
        {title}
      </DialogTitle>
      
      <DialogContent sx={{ py: 1 }}>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button 
          onClick={handleConfirm} 
          color="error"
          variant="contained"
          disabled={loading}
          autoFocus
        >
          {loading ? "Deleting..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}