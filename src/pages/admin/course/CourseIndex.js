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
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  CardHeader,
} from "@mui/material";
import { FaTrash, FaEdit, FaPlus, FaSearch, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteCourseService,
  courseService,
} from "../../../services/apiServices/course/courseServices";
import { setDialogState, setIsLoading } from "../../../redux/appSlices";
import MySpinner from "../../../components/ui/MySpinner";
import { BsPencilSquare } from "react-icons/bs";
import { IoMdSchool } from "react-icons/io";
import { useMyDialog } from "../../../components/context/MyDialogContext.tsx";
const tableRowAnimation = {
  hover: {
    scale: 1.01,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 },
  },
};

export default function CourseIndex() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [courseList, setCourseList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const { open } = useMyDialog();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await courseService();
      if (response?.status) {
        setCourseList(response.data);
      } else {
        toast.error("Failed to fetch courses.");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    dispatch(setIsLoading(true));
    try {
      const response = await deleteCourseService(id);
      if (response.status) {
        toast.success("Course deleted successfully", { autoClose: 2000 });
        fetchCourses();
      } else {
        toast.error("Error occurred while deleting!");
      }
    } catch {
      toast.error("Failed to delete course.");
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


  const filteredCourses = courseList.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toString().includes(searchTerm) ||
      course.credits.toString().includes(searchTerm)
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
            <IoMdSchool size={50} />
            Course Management
          </Typography>

          <Link to="/Admin/Course/Create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<IoMdSchool />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                
              }}
            >
              Add Course
            </Button>
          </Link>
        </div>

        <div className="flex justify-end ">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "background.paper"
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
          <Table >
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, width: "5%" }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, width: "35%" }}
                >
                  Course
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, width: "20%" }}
                >
                  Course ID
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, width: "20%" }}
                >
                  Credits
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, width: "20%" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ py: 5 }}>
                    <MySpinner />
                  </TableCell>
                </TableRow>
              ) : filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                    <Typography variant="body1" color="textSecondary">
                      {searchTerm
                        ? "No matching courses found"
                        : "No courses available"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses
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
                            {item.name.charAt(0)}
                          </Avatar>
                          <Typography fontWeight={500}>{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.credits}
                          color="primary"
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Link to={`/Admin/Course/Edit/${item.id}`}>
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
            count={filteredCourses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
