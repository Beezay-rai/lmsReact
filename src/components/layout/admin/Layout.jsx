
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItem,
  Divider,
  Collapse,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { AiOutlineSetting, AiOutlineUserAdd } from "react-icons/ai";
import { FaHome, FaWrench } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiBookCover } from "react-icons/gi";
import { MdBook, MdExpandLess, MdExpandMore } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import NavBar from "./Navbar";
import Logo from "../../../assests/img/logo.png";
import { useDispatch } from "react-redux";
import { setDialogState } from "../../../redux/appSlices";

const setUpArray = [
  { label: "Course", icon: <AiOutlineUserAdd />, to: "/Admin/Course" },
  { label: "Student", icon: <PiStudentFill />, to: "/Admin/Student" },
  { label: "Book", icon: <GiBookCover />, to: "/Admin/Book" },
  { label: "Category", icon: <MdBook />, to: "/Admin/Category" },
];

const mainSetUpArray = [
  { label: "User", icon: <AiOutlineUserAdd />, to: "/Admin/UserList" },
];

const MenuItem = ({ label, icon, to, nested = false }) => (
  <ListItem disablePadding>
    <Link to={to} style={{ width: "100%" }}>
      <ListItemButton sx={{ pl: nested ? 4 : 2 }}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </Link>
  </ListItem>
);

const ExpandableMenu = ({ title, icon, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <MdExpandLess /> : <MdExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => (
            <MenuItem key={item.label} {...item} nested />
          ))}
        </List>
      </Collapse>
    </>
  );
};




export default function AdminLayout({ children }) {
  const dispatch = useDispatch();

  const openLogOutDialog=()=>{
    dispatch(setDialogState({
      open:true,
      title:"Log Out",
      color:"info",
      confirmText:"Log Out",
      message:"Are you sure you want to log out?"
    }))
  }

  return (
    <div style={{paddingLeft:"300px"}}>
      <NavBar />
      <Drawer
        variant="permanent"
        sx={{
          width: "300px",
          "& .MuiDrawer-paper": { width: "300px" },
        }}
        anchor="left"
      >
        <div className="h-44 bg-white flex justify-center items-center relative">
          <img className="h-full" src={Logo}></img>
        </div>

        <List>
          <MenuItem label="Home" icon={<FaHome />} to="/" />
          <ExpandableMenu
            title="Main SetUp"
            icon={<FaWrench />}
            items={mainSetUpArray}
          />
          <ExpandableMenu
            title="SetUp"
            icon={<FaWrench />}
            items={setUpArray}
          />
          <MenuItem
            label="Transaction"
            icon={<MdBook />}
            to="/Admin/Transaction"
          />
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <AiOutlineSetting />
            </ListItemIcon>
            <ListItemText primary="Setting" />
          </ListItemButton>
          <ListItemButton onClick={openLogOutDialog} >
            <ListItemIcon>
              <FiLogOut />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        className="p-5"
      >
        {children}
      </Box>
    </div>
  );
}
