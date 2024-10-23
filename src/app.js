import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Gateway from "./gateway.js";
import "./styles/global.css";
function App() {
  return (
    <>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Gateway />
      </LocalizationProvider>
    </>
  );
}

export default App;
