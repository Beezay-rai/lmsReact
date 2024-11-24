import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  deleteCourseService,
  courseService,
} from "../../../Services/apiServices/course/courseServices";
import { toast } from "react-toastify";

export default function CourseIndex() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [apiData, setApiData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [change, setChange] = useState(false);

  const handleEditClick = (id) => {
    setId(id);
    toggleModal();
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await deleteCourseService(id);
      if (response.status) {
        toast.success("Deleted Successfully", { autoClose: 2000 });
        setChange(!change);
      } else {
        toast.error("Error while Deleting", { autoClose: 2000 });
      }
    } catch {
      toast.error("Error while Deleting", { autoClose: 2000 });
    } finally {
      toggleModal();
    }
  };

  const toggleModal = () => setOpen((prev) => !prev);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { status, data } = await courseService();
        setApiData(status ? data : []);
      } catch {
        setApiData([]);
      }
    };
    fetchCourses();
  }, [change]);

  return (
    <>
      <div className="flex flex-row justify-between py-5 px-3 rounded bg-white mb-2">
        <Typography variant="h5">Course</Typography>
        <Link to="/Admin/Course/Create">
          <Button variant="contained" color="success">
            + Add
          </Button>
        </Link>
      </div>

      <Modal open={open} onClose={toggleModal}>
        <div className="modal">
          <Typography variant="h5" component="h6" sx={{ marginBottom: "15px" }}>
            Are you sure?
          </Typography>
          <Grid container direction="row-reverse">
            <Grid item>
              <Button variant="outlined" color="error" onClick={toggleModal}>
                Cancel
              </Button>
            </Grid>
            <Grid item sx={{ mr: "5px" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteSubmit}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>

      <div className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="border-r-2 border-gray-200">S.N</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Credits</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow hover key={item.id}>
                  <TableCell className="border-r-2 border-gray-200 w-2">
                    {index + 1}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.credits}</TableCell>
                  <TableCell>
                    <Link to={`/Admin/Course/Edit/${item.id}`}>
                      <Button sx={{ margin: "4px" }} variant="contained">
                        <BsPencilSquare title="Edit" />
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleEditClick(item.id)}
                    >
                      <FaTrash title="Delete" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={apiData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
