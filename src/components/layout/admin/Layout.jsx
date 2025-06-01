import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Backdrop,
} from "@mui/material";
import { AiOutlineSetting, AiOutlineUserAdd } from "react-icons/ai";
import { FaHome, FaWrench } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiBookCover } from "react-icons/gi";
import { MdBook, MdExpandLess, MdExpandMore } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "./Navbar";
import Logo from "../../../assests/img/logo.png";
import { useDispatch } from "react-redux";
import { logout, setDialogState } from "../../../redux/appSlices";
import { IoMdBook, IoMdSchool } from "react-icons/io";
import { useMyDialog } from "../../../components/context/MyDialogContext.tsx";
// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const setUpArray = [
  { label: "Course", icon: <IoMdSchool />, to: "/Admin/Course" },
  { label: "Student", icon: <PiStudentFill />, to: "/Admin/Student" },
  { label: "Book", icon: <GiBookCover />, to: "/Admin/Book" },
  { label: "Category", icon: <IoMdBook />, to: "/Admin/Book-Category" },
];

const mainSetUpArray = [
  { label: "User", icon: <AiOutlineUserAdd />, to: "/Admin/UserList" },
];

const MenuItem = ({ label, icon, to, nested = false, index }) => (
  <motion.div
    variants={itemVariants}
    custom={index}
    initial="hidden"
    animate="visible"
  >
    <ListItem disablePadding>
      <Link to={to} style={{ width: "100%" }}>
        <ListItemButton sx={{ pl: nested ? 4 : 2 }}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </Link>
    </ListItem>
  </motion.div>
);

const ExpandableMenu = ({ title, icon, items, index }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      initial="hidden"
      animate="visible"
    >
      <ListItemButton onClick={() => setMenuOpen(!menuOpen)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {menuOpen ? <MdExpandLess /> : <MdExpandMore />}
      </ListItemButton>
      <Collapse in={menuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item, i) => (
            <MenuItem key={item.label} {...item} nested index={i} />
          ))}
        </List>
      </Collapse>
    </motion.div>
  );
};

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const { open } = useMyDialog();
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/Login");
  };



  
  const openLogOutDialog = () => {
     open({
        title: "Log Out",
        message: "Are you sure you want to log out?",
        confirmText: "Log Out",
        color: "info",
        onConfirm: handleLogOut,
      });
  };

  return (
    <div className="content">
      <NavBar />
      <div className="sidebar  absolute top-0 w-80 border-r-2 h-full">
        <div className="h-44 bg-white flex justify-center items-center relative">
          <img className="h-full" src={Logo} alt="Logo" />
        </div>

        <List>
          <MenuItem label="Home" icon={<FaHome />} to="/" index={0} />
          <ExpandableMenu
            title="Main SetUp"
            icon={<FaWrench />}
            items={mainSetUpArray}
            index={1}
          />
          <ExpandableMenu
            title="SetUp"
            icon={<FaWrench />}
            items={setUpArray}
            index={2}
          />
          <MenuItem
            label="Transaction"
            icon={<MdBook />}
            to="/Admin/Transaction"
            index={3}
          />
        </List>

        <Divider />

        <List>
          <motion.div variants={itemVariants} custom={4}>
            <ListItemButton>
              <ListItemIcon>
                <AiOutlineSetting />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItemButton>
          </motion.div>

          <motion.div variants={itemVariants} custom={5}>
            <ListItemButton onClick={openLogOutDialog}>
              <ListItemIcon>
                <FiLogOut />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </motion.div>
        </List>
      </div>

      <div className="main ml-80 p-5">
        <motion.div
          key={window.location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
