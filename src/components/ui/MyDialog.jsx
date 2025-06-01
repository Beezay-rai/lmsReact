import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { closeDialog, setDialogState } from "../../redux/appSlices.js";
import { useDispatch, useSelector } from "react-redux";
import { useMyDialog } from "../context/MyDialogContext.tsx";

export const MyDialog = () => {
  const { isOpen, config, runConfirm, close } = useMyDialog();
  const { isLoading } = useSelector((state) => state.appFeature);

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{config.title ?? "Confirm Action"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {config.message ?? "Are you sure you want to proceed?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          onClick={runConfirm}
          variant="contained"
          color={config.color ?? "primary"}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : config.confirmText ?? "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
