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

export default function Layout({ children }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [drawerOpen,setDrawerOpen] = useState(false);

  const handleSideBar = ()=>{
    
    setDrawerOpen(!drawerOpen)
  }


  return (
    <>
      <AppBar sx={{zIndex:(theme)=>theme.zIndex.drawer + 1 }} >
        <Toolbar className="j justify-between">
          <Box className="flex ">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleSideBar}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">LMS</Typography>
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
        </Toolbar>
      </AppBar>

      <Sidebar sideBarOpen={drawerOpen} />
      <Box
        component="main"
      >
        {children}
      </Box>
    </>
  );
}
