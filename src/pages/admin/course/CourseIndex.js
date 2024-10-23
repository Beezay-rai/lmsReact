import { useState, React, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Checkbox, Grid, Modal, Toolbar, Typography } from '@mui/material';
import { FaTrash } from 'react-icons/fa'
import { BsPencilSquare } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { deleteCourseService, courseService } from '../../../Services/apiServices/course/courseServices';
import { toast } from 'react-toastify';
export default function CourseIndex() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [apiData, setApiData] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const [change, setChange] = useState(false);

    const handleClick = (id) => {
        debugger
        setId(id);
        handleOpen();
    }

    const handleSubmit = () => {
        debugger
        deleteCourseService(id)
            .then((response) => {
                if (response.status) {
                    toast.error("Deleted Sucessfully", {
                        autoClose: 2000
                    })
                    handleOpen()
                    setChange(!change)

                }
                else {
                    toast.error("Error while Deleting", {
                        autoClose: 2000
                    })
                }
            })


    }

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const ModalBoxStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "auto",
        height: "auto",
        bgcolor: 'background.paper',
        border: '1px solid silver',
        outline: "none",
        borderRadius: '10px',
        padding: "30px"
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //Fetch Course 
    useEffect(() => {
        const fetchedData = () => {
            courseService().then(({ status, data }) => {
                try {
                    if (status) {
                        setApiData(data);
                    }
                    else {
                        setApiData([]);
                    }
                }
                catch (error) {
                }
            })
        }
        fetchedData()
    }, [change])

    return (<>
        <Toolbar sx={{ flexDirection: `row`, borderRadius: '20px', justifyContent: "space-between", padding: '10px', alignItems: 'flex-start', background: 'white', marginBottom: '10px' }}>
            <Typography variant='h5' >Course</Typography>
            <Link to={"/Admin/Course/Create"}>
                <Button variant="contained" color="success" sx={{ marginBottom: `20px` }}>
                    Add
                </Button>

            </Link>
        </Toolbar >
        <Modal open={open}
            onClose={handleOpen}>
            <Box sx={ModalBoxStyle}>
                <Typography id="modal-modal-title" variant="h5" component="h6" sx={{ marginBottom: "15px" }}>
                    Are you sure ?
                </Typography>
                <Grid container direction="row-reverse">
                    <Grid item>
                        <Button variant="outlined" color="error" onClick={handleOpen}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item sx={{ mr: '5px' }}>


                        <Button variant="contained" color="error" onClick={handleSubmit}>
                            Delete
                        </Button>

                    </Grid>


                </Grid>
            </Box>
        </Modal>
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '20px' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table  >
                    <TableHead>
                        <TableRow>
                            <TableCell >
                                Course Id
                            </TableCell>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                                Credits
                            </TableCell>


                            <TableCell>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                            return (
                                <TableRow hover key={item.id}>
                                    <TableCell>
                                        {(item?.id)}
                                    </TableCell>
                                    <TableCell>
                                        {item?.courseName}
                                    </TableCell>
                                    <TableCell>
                                        {item?.credits}
                                    </TableCell>


                                    <TableCell>
                                        <Link to={`/Admin/Course/Edit/${item?.id}`}>
                                            <Button sx={{ margin: "4px" }} variant="contained" >
                                                <BsPencilSquare title='Edit'></BsPencilSquare>
                                            </Button>
                                        </Link>
                                        <Button variant="contained" color="error" onClick={() => handleClick(item?.id)}>
                                            <FaTrash title='Delete'></FaTrash>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )

                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={apiData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </>
    );
}