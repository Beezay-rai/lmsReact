import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { setDialogState } from "../../redux/appSlices";
import { useDispatch, useSelector } from "react-redux";
import { useMyFunctionContext } from "../context/MyFunctionContext";

export const MyDialog = ({ open, title = "Confirm Delete", message = "Are you sure you want to delete?", confirmText = "Delete", color = "error" }) => {
  const dispatch = useDispatch();
  const { myStoredFunction, storedParams } = useMyFunctionContext();
  const { isLoading } = useSelector((state) => state.appFeature);

  const hideDialog = () => {
    dispatch(setDialogState({ open: false }));
  };

  const handleConfirm = async () => { 
    if (myStoredFunction) {
      await myStoredFunction(...storedParams);
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
