import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Gateway from "./gateway.js";
import "./styles/global.css";
import DeleteDialog from "./components/ui/DeleteDialog.jsx";
import { useSelector } from "react-redux";
function App() {
  const {isDialog,dialogState} = useSelector((state)=>state.appFeature)
  debugger
  return (
    <>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DeleteDialog open={dialogState.open} onConfirm={dialogState.onConfirm}/>
        <Gateway />
      </LocalizationProvider>
    </>
  );
}

export default App;
