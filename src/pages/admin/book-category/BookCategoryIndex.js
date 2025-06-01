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
} from "@mui/material";
import { FaTrash, FaEdit, FaPlus, FaSearch, FaBook } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteBookCategoryService, getAllBookCategoryService } from "../../../services/apiServices/book-category/bookCategoryServices";
import { setDialogState, setIsLoading } from "../../../redux/appSlices";
import MySpinner from "../../../components/ui/MySpinner";
import { IoMdBook } from "react-icons/io";
import { useMyDialog } from "../../../components/context/MyDialogContext.tsx";

const tableRowAnimation = {
  hover: {
    scale: 1.01,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 },
  },
};

export default function BookCategoryIndex() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryList, setCategoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const { open } = useMyDialog();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllBookCategoryService();
      if (response?.status) {
        setCategoryList(response.data);
      } else {
        toast.error("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    dispatch(setIsLoading(true));
    try {
      const response = await deleteBookCategoryService(id);
      if (response.status) {
        toast.success("Category deleted successfully", { autoClose: 2000 });
        fetchCategories();
      } else {
        toast.error("Error occurred while deleting!");
      }
    } catch {
      toast.error("Failed to delete category.");
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


  const filteredCategories = categoryList.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toString().includes(searchTerm)
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
            <IoMdBook size={50} />
            Book Categories
          </Typography>

          <Link to="/Admin/Book-Category/Create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<IoMdBook />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Add Category
            </Button>
          </Link>
        </div>

        <div className="flex justify-end">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search categories..."
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
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 600, width: "10%" }}>
                  #
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600, width: "50%" }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600, width: "20%" }}>
                  Category ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600, width: "20%" }}>
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
              ) : filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                    <Typography variant="body1" color="textSecondary">
                      {searchTerm
                        ? "No matching categories found"
                        : "No categories available"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories
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
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            {item.name.charAt(0)}
                          </Avatar>
                          <Typography fontWeight={500}>{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.id}
                          color="primary"
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Link to={`/Admin/Book-Category/Edit/${item.id}`}>
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
            count={filteredCategories.length}
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