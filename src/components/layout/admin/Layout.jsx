import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Avatar,
  Badge,
  IconButton,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ava from "../../../assests/img/ava.jpg";
import Sidebar from "./Sidebar";
export default function AdminLayout({ children }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [drawerOpen,setDrawerOpen] = useState(false);

  const handleSideBar = ()=>{
    
    setDrawerOpen(!drawerOpen)
  }

  const drawerWidth="250px";
  const navBarHeight ="60px";


  return (
    <>
 
      <Box className="navbar" sx={{height:navBarHeight}}>
        <Box className="flex justify-between px-5 " sx={{backgroundColor:"#1976d2",color:"white"}} >
          <Box  className="flex " sx={{alignItems:"center"}} >
       
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleSideBar}
            >
              {drawerOpen?<ArrowBackIcon />:<MenuIcon/>}
            </IconButton>
           
           
            <Link to={'/'}>
            <Typography variant="h6">LMS</Typography>
            </Link>
          </Box>

          <Box>
            <IconButton>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton>
              <Avatar src={ava}></Avatar>
            </IconButton>
          </Box>
        </Box>
      </Box>


      <Sidebar sideBarOpen={drawerOpen} drawerWidth={drawerWidth} navBarHeight={navBarHeight}  />
      <Box
        component="main"
        sx={{marginTop:"20px",marginLeft:drawerOpen? drawerWidth:"0px"   }}
      >
        {children}
      </Box>
    </>
  );
}
