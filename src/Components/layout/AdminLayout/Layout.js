import * as React from "react";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Collapse,
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ava from "../../../assests/img/ava.jpg";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";
import { PiChatDotsDuotone } from "react-icons/pi";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function Layout({ children }) {
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
