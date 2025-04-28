import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { closeDialog, setDialogState } from "../../redux/appSlices";
import { useDispatch, useSelector } from "react-redux";

export const MyDialog = ({ open, title = "Confirm Delete", message = "Are you sure you want to delete?", confirmText = "Delete", color = "error" }) => {
  const dispatch = useDispatch();
  const { isLoading ,dialogState} = useSelector((state) => state.appFeature);
  const hideDialog = () => {
    dispatch(closeDialog());
  };

  const handleConfirm = async () => { 
    if (dialogState.onConfirm) {
      await dialogState.onConfirm(...(dialogState.params || []));
    }
    hideDialog(); 
  };
  return (
    <Dialog open={open} onClose={hideDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hideDialog}>Cancel</Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={color}
          autoFocus
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
