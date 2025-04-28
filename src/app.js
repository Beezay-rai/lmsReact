import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Gateway from "./gateway.js";
import "./styles/global.css";
import { MyDialog } from "./components/ui/MyDialog.jsx";
import { useSelector } from "react-redux";

function App() {
  const dialogState = useSelector((state) => state.appFeature.dialogState);

  return (
    <>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MyDialog
          open={dialogState.open}
          message={dialogState.message}
          confirmText={dialogState.confirmText}
          title={dialogState.title}
          color={dialogState.color}
        />
        <Gateway />
      </LocalizationProvider>
    </>
  );
}
export default App;
