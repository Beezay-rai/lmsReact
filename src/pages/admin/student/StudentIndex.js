import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Card,
  CardContent,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  FaTrash,
  FaEdit,
  FaUserPlus,
  FaSearch,
  FaUserGraduate,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteStudentService,
  studentService,
} from "../../../services/apiServices/student/studentService";
import { setDialogState, setIsLoading } from "../../../redux/appSlices";
import MySpinner from "../../../components/ui/MySpinner";
import { BsPencilSquare } from "react-icons/bs";

import { useMyDialog } from "../../../components/context/MyDialogContext.tsx";

const tableRowAnimation = {
  hover: {
    scale: 1.01,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 },
  },
};

export default function StudentIndex() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [studentList, setStudentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const { open } = useMyDialog();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentService();
      if (response?.status) {
        setStudentList(response.data);
      } else {
        toast.error("Failed to fetch students.");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    dispatch(setIsLoading(true));
    try {
      const response = await deleteStudentService(id);
      if (response.status) {
        toast.success("Student deleted successfully", { autoClose: 2000 });
        fetchStudents();
      } else {
        toast.error("Error occurred while deleting!");
      }
    } catch {
      toast.error("Failed to delete student.");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

   const openDeleteDialog = (id) => {
   open({
      title: "Delete Item",
      message: "Are you sure you want to delete this item?",
      confirmText: "Delete",
      color: "error",
      onConfirm: handleDelete,
      params:[id]
    });
  };


  const filteredStudents = studentList.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
  );

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <div className="flex p-4 justify-between align-items-center mb-3">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <FaUserGraduate size={28} />
            Student Management
          </Typography>

          <Link to="/Admin/Student/Create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaUserGraduate />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Add Student
            </Button>
          </Link>
        </div>

        <div className="flex justify-end ">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search Student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "background.paper",
              },
            }}
          />
        </div>
      </Paper>
      <Card
          elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "common.white", fontWeight: 600 }}>
                  #
                </TableCell>
                <TableCell sx={{ color: "common.white", fontWeight: 600 }}>
                  Student
                </TableCell>
                <TableCell sx={{ color: "common.white", fontWeight: 600 }}>
                  Student ID
                </TableCell>
                <TableCell sx={{ color: "common.white", fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{ py: 5 }}>
                    <MySpinner />
                  </TableCell>
                </TableRow>
              ) : filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                    <Typography variant="body1" color="textSecondary">
                      {searchTerm
                        ? "No matching students found"
                        : "No students available"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow
                      key={item.id}
                      component={motion.tr}
                      whileHover="hover"
                      variants={tableRowAnimation}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            {item.first_name.charAt(0)}
                            {item.last_name.charAt(0)}
                          </Avatar>
                          <Typography>
                            {item.first_name} {item.last_name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <Link to={`/Admin/Student/Edit/${item.id}`}>
                          <Button sx={{ margin: "4px" }} variant="contained">
                            <BsPencilSquare title="Edit" />
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => openDeleteDialog(item.id)}
                        >
                          <FaTrash title="Delete" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredStudents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
            sx={{
              borderTop: "1px solid",
              borderColor: "divider",
              "& .MuiTablePagination-toolbar": {
                minHeight: "60px",
              },
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
