import { Box } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Badge, IconButton, Typography } from "@mui/material";
import ava from "../../../assests/img/ava.jpg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  return (
    <div
      className="navbar max-w-full flex justify-between px-5  h-16 "
      style={{
        backgroundColor: "#1976d2",
        color: "white",
      }}
    >
      <div className="flex items-center">
        <button
          className="sm:block md:hidden lg:hidden text-white"
          onClick={handleDrawerToggle}
        >
          {drawerOpen ? <ArrowBackIcon /> : <MenuIcon />}
        </button>

      </div>

      <div className="flex items-center gap-3">
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon color="inherit" />
          </Badge>
        </IconButton>

        <Avatar src={ava}></Avatar>
      </div>
    </div>
  );
}
export default NavBar;
