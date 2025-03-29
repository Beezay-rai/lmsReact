// import Box from "@mui/material/Box";
// import * as React from "react";
// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import NavBar from "./Navbar";
// import {
//   Collapse,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItem,
//   Divider,
// } from "@mui/material";

// import { AiOutlineSetting, AiOutlineUserAdd } from "react-icons/ai";
// import { FaHome, FaWrench } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
// import { GiBookCover } from "react-icons/gi";
// import { MdBook, MdExpandLess, MdExpandMore } from "react-icons/md";
// import { PiStudentFill } from "react-icons/pi";

// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { Link } from "react-router-dom";
// const setUpArray = [
//   {
//     label: "Course",
//     icon: <AiOutlineUserAdd />,
//     to: "/Admin/Course",
//   },
//   {
//     label: "Student",
//     icon: <PiStudentFill />,
//     to: "/Admin/Student",
//   },
//   {
//     label: "Book",
//     icon: <GiBookCover />,
//     to: "/Admin/Book",
//   },
//   {
//     label: "Category",
//     icon: <MdBook />,
//     to: "/Admin/Category",
//   },
// ];

// const mainSetUpArray = [
//   {
//     label: "User",
//     icon: <AiOutlineUserAdd />,
//     to: "/Admin/UserList",
//   },
// ];

// export default function AdminLayout({ children }) {
//   const [mainListOpen, setMainListOpen] = useState(false);
//   const handleMainListOpen = () => {
//     setMainListOpen(!mainListOpen);
//   };

//   const [open, setOpen] = useState(false);
//   const handleListItem = () => {
//     setOpen(!open);
//   };

//   return (
//     <>
//       <NavBar />
//       {/* <Sidebar navBarHeight={navBarHeight} /> */}
//       <Drawer

//         variant="permanent"
//         sx={{
//           width: "250px",
//           "& .MuiDrawer-paper": {
//             width: "250px",
//           }
//         }}
//         anchor="left"
//       >
//         <List>
//           <Link to="/">
//             <ListItemButton>
//               <ListItemIcon>
//                 <FaHome />
//               </ListItemIcon>
//               <ListItemText primary="Home" />
//             </ListItemButton>
//           </Link>

//           {/* Main Set Up */}
//           <ListItemButton onClick={handleMainListOpen}>
//             <ListItemIcon>
//               <FaWrench />
//             </ListItemIcon>
//             <ListItemText primary="Main SetUp" />
//             {mainListOpen ? <MdExpandLess /> : <MdExpandMore />}
//           </ListItemButton>
//           <Collapse in={mainListOpen}>
//             <List component="div" disablePadding>
//               {mainSetUpArray.map(({ label, icon, to }) => {
//                 return (
//                   <ListItem key={label} disablePadding>
//                     <Link
//                       to={to}
//                       style={{
//                         width: "100%",
//                       }}
//                     >
//                       <ListItemButton sx={{ pl: 4 }}>
//                         <ListItemIcon>{icon}</ListItemIcon>
//                         <ListItemText primary={label} />
//                       </ListItemButton>
//                     </Link>
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Collapse>

//           {/* Set Up */}
//           <ListItemButton onClick={handleListItem}>
//             <ListItemIcon>
//               <FaWrench />
//             </ListItemIcon>
//             <ListItemText primary="SetUp" />
//             {open ? <MdExpandLess /> : <MdExpandMore />}
//           </ListItemButton>
//           <Collapse in={open}>
//             <List component="div" disablePadding>
//               {setUpArray.map(({ label, icon, to }) => {
//                 return (
//                   <ListItem key={label} disablePadding>
//                     <Link to={to} style={{ width: "100%" }}>
//                       <ListItemButton sx={{ pl: 4 }}>
//                         <ListItemIcon>{icon}</ListItemIcon>
//                         <ListItemText primary={label} />
//                       </ListItemButton>
//                     </Link>
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Collapse>
//           <Link
//             to="/Admin/Transaction"
//             style={{
//               width: "100%",
//             }}
//           >
//             <ListItemButton>
//               <ListItemIcon>
//                 <MdBook />
//               </ListItemIcon>
//               <ListItemText primary="Transaction" />
//             </ListItemButton>
//           </Link>
//         </List>
//         <Divider />

//         <List>
//           <ListItemButton>
//             <ListItemIcon>
//               <AiOutlineSetting />
//             </ListItemIcon>
//             <ListItemText primary="Setting" />
//           </ListItemButton>

//           <ListItemButton>
//             <ListItemIcon>
//               <FiLogOut />
//             </ListItemIcon>
//             <ListItemText primary="Log out" />
//           </ListItemButton>
//         </List>
//       </Drawer>
//       <Box
//         component="main"
//         className={`mt-1 mr-4 md:ml-[255px] lg:ml-[255px] sm:ml-0 `}
//       >
//         {children}
//       </Box>
//     </>
//   );
// }

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
          <ListItemButton>
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
