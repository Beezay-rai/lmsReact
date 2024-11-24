import { Box } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Badge, IconButton, Typography } from "@mui/material";
import ava from "../../../assests/img/ava.jpg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

function NavBar(){
  const navBarHeight = "60px";
  const [drawerOpen, setDrawerOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const handleDrawerToggle = () => {
        if (!isClosing) {
          setMobileOpen(!mobileOpen);
        }
      };
    return (
      <Box
        className="navbar  flex justify-between px-5 w-full h-[400]"
        sx={{
          height: navBarHeight,
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        <Box className="flex items-center">
          <button
            className="sm:block md:hidden lg:hidden text-white"
            onClick={handleDrawerToggle}
          >
            {drawerOpen ? <ArrowBackIcon /> : <MenuIcon />}
          </button>

          <Link to={"/"}>
            <Typography variant="h6">LMS</Typography>
          </Link>
        </Box>

        <Box className="flex items-center gap-3">
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon color="inherit" />
            </Badge>
          </IconButton>

          <Avatar src={ava}></Avatar>
        </Box>
      </Box>
    );
}
export default NavBar;