import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
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
        className={`mt-1 mr-4 md:ml-[255px] lg:ml-[255px] sm:ml-0 ` }
      >
        {children}
      </Box>
    </>
  );
}
