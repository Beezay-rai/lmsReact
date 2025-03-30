import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Gateway from "./gateway.js";
import "./styles/global.css";
import { MyDialog } from "./components/ui/MyDialog.jsx";
import { useSelector } from "react-redux";
import { MyFunctionProvider } from "./components/context/MyFunctionContext.js";

function App() {
  const dialogState = useSelector((state) => state.appFeature.dialogState);

  return (
    <>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MyFunctionProvider>
          <MyDialog open={dialogState.open} message={dialogState.message}  confirmText={dialogState.confirmText} title={dialogState.title} color={dialogState.color}/>
          <Gateway />
        </MyFunctionProvider>
      </LocalizationProvider>
    </>
  );
}
export default App;
