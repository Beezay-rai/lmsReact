import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, Badge, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ava from "../../../assests/img/ava.jpg";
import Sidebar from "./Sidebar";
import ResponsiveDrawer from "./responsiveTest";
import NavBar from "./Navbar";
export default function AdminLayout({ children }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSideBar = () => {
    setDrawerOpen(!drawerOpen);
  };



  const navBarHeight = "60px";
  return (
    <>
      <NavBar />
      <Sidebar sideBarOpen={drawerOpen} navBarHeight={navBarHeight} />

      <Box
        component="main"
        // className={`mt-1 mr-1 md:ml-[255px] lg:ml-[255px] sm:ml-0 bg-red-50`}
        className={`mt-1 mr-1 md:ml-[255px] lg:ml-[255px] sm:ml-0 `}
      >
        {children}
      </Box>
    </>
  );
}
