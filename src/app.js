import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Gateway from "./gateway.js";
import "./styles/global.css";
import { useSelector } from "react-redux";
import { Fade } from "@mui/material";
import { MyDialog } from "./components/ui/MyDialog";

function App() {
  const dialogState = useSelector((state) => state.appFeature.dialogState);

  return (
    <>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MyDialog />
        <Gateway />
      </LocalizationProvider>
    </>
  );
}
export default App;
