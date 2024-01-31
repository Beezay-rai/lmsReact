import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AiOutlineSetting, AiOutlineUserAdd } from 'react-icons/ai'
import { FaHome, FaWrench } from 'react-icons/fa'
import { PiStudentFill } from 'react-icons/pi'
import { GiBookCover } from 'react-icons/gi'
import { MdBook, MdExpandLess, MdExpandMore } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Collapse, Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userDetail';

const drawerWidth = 240;
function Sidebar(props) {

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '1px solid silver',
        outline: 'none',
        p: 4,
        padding: '20px'
    };

    const dispatch = useDispatch();
    
    //Login Modal
    const [modalOpen, setModalOpen] = useState(false);

    //SetUp Dropdown
    const [open, setOpen] = useState(false);
    const handleListItem = () => {
        setOpen(!open);
    }
    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    }
    // for Main Setup Dropdown
    const [mainListOpen,setMainListOPen]= useState(false);
    const handleMainListOpen = ()=>{
        setMainListOPen(!mainListOpen)
    }

    return (
        <div className='hidden xl:block '>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}

            >
                <Toolbar />
                <Box sx={{ overflow: 'hidden' }}>
                    <List>
                        <Link to="/" style={{
                            color: 'inherit',
                            textDecoration: 'none',
                            width: '100%'
                        }}>
                            <ListItemButton sx={{ padding: '15px' }} >
                                <ListItemIcon sx={{ fontSize: '25px' }}>
                                    <FaHome />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </Link>
                        {/* Main Set Up */}
                        <ListItemButton sx={{ padding: '15px' }} onClick={handleMainListOpen}>
                            <ListItemIcon sx={{ fontSize: '25px' }}>
                                <FaWrench />
                            </ListItemIcon>
                            <ListItemText primary="Main SetUp" />
                            {mainListOpen ? <MdExpandLess /> : <MdExpandMore />}
                        </ListItemButton>
                        <Collapse in={mainListOpen} >
                        <List sx={{ padding: `0px 0px 0px 25px` }}>
                                {mainSetUpArray.map(({ label, icon, to }) => {
                                    return (
                                        <ListItem key={label} disablePadding>
                                            <Link to={to} style={{
                                                color: 'inherit',
                                                textDecoration: 'none',
                                                width: '100%'
                                            }}>
                                                <ListItemButton sx={{ padding: '15px' }}>
                                                    <ListItemIcon sx={{ fontSize: '25px' }}>
                                                        {icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={label} />
                                                </ListItemButton>
                                            </Link>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Collapse>

                        {/* Set Up */}
                        <ListItemButton sx={{ padding: '15px' }} onClick={handleListItem}>
                            <ListItemIcon sx={{ fontSize: '25px' }}>
                                <FaWrench />
                            </ListItemIcon>
                            <ListItemText primary="SetUp" />
                            {open ? <MdExpandLess /> : <MdExpandMore />}
                        </ListItemButton>
                        <Collapse in={open}>
                            <List sx={{ padding: `0px 0px 0px 25px` }}>
                                {setUpArray.map(({ label, icon, to }) => {
                                    return (
                                        <ListItem key={label} disablePadding>
                                            <Link to={to} style={{
                                                color: 'inherit',
                                                textDecoration: 'none',
                                                width: '100%'
                                            }}>
                                                <ListItemButton sx={{ padding: '15px' }}>
                                                    <ListItemIcon sx={{ fontSize: '25px' }}>
                                                        {icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={label} />
                                                </ListItemButton>
                                            </Link>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Collapse>
                        <Link to="/Admin/Transaction" style={{
                            color: 'inherit',
                            textDecoration: 'none',
                            width: '100%'
                        }}>
                            <ListItemButton sx={{ padding: '15px' }} >
                                <ListItemIcon sx={{ fontSize: '25px' }}>
                                    <MdBook />
                                </ListItemIcon>
                                <ListItemText primary="Transaction" />
                            </ListItemButton>
                        </Link>
                    </List>
                    <Divider />
                    <List>

                        <ListItemButton sx={{ padding: '15px' }} >
                            <ListItemIcon sx={{ fontSize: '25px' }}>
                                <AiOutlineSetting />
                            </ListItemIcon>
                            <ListItemText primary="Setting" />
                        </ListItemButton>

                        <ListItemButton sx={{ padding: '15px' }} onClick={handleModalOpen}  >
                            <ListItemIcon sx={{ fontSize: '25px' }}>
                                <FiLogOut />
                            </ListItemIcon>
                            <ListItemText primary="Log out" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>

            {/* Log Out Modal Pop up */}
            <Modal
                open={modalOpen}
                onClose={handleModalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={modalStyle} className='rounded-2xl'>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ padding: `20px`, textAlign: `center` }}>
                        Are you sure,<br /> you want to log out?
                    </Typography>
                    <Toolbar sx={{ justifyContent: 'space-evenly' }}>
                        <Button variant="contained" onClick={() => dispatch(logout())}>Log Out</Button>
                        <Button variant="outlined" color='error' onClick={handleModalOpen}>Cancel</Button>
                    </Toolbar>

                </Box>
            </Modal>
            {/* Modal popup End */}

        </div >
    )
}




const setUpArray = [

    {
        label: "Course",
        icon: <AiOutlineUserAdd />,
        to: "/Admin/Course",
    },
    {
        label: "Student",
        icon: <PiStudentFill />,
        to: "/Admin/Student",
    },
    {
        label: "Book",
        icon: <GiBookCover />,
        to: "/Admin/Book",


    },
    {
        label: "Category",
        icon: <MdBook />,
        to: "/Admin/Category",

    }
]

const mainSetUpArray = [
    {
        label:"User",
        icon: <AiOutlineUserAdd />,
        to:"/Admin/UserList"
    }
]

export default Sidebar

