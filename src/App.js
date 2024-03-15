import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Gateway from "./Gateway";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';

import './styles/global.css'
function App() {

  return (
    <>

   
      <CssBaseline />
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Gateway />
      </LocalizationProvider>
    </>
  );
}

export default App;
