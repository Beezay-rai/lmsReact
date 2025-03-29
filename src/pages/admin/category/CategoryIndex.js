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
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { deleteCategoryService, categoryService } from "../../../services/apiServices/category/categoryServices";
import { toast } from "react-toastify";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setDialogState, setIsLoading } from "../../../redux/appSlices";
import { useMyFunctionContext } from "../../../components/context/MyFunctionContext";

export default function CategoryIndex() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryList, setCategoryList] = useState([]);

  const dispatch = useDispatch();
  const { setMyStoredFunction, setStoredParams } = useMyFunctionContext();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { status, data } = await categoryService();
      if (status) setCategoryList(data);
    } catch {
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    dispatch(setIsLoading(true));
    try {
      const response = await deleteCategoryService(id);
      if (response.status) {
        toast.success("Deleted Successfully", { autoClose: 2000 });
        fetchCategories();
      } else {
        toast.error("Error Occurred!");
      }
    } catch {
      toast.error("Failed to delete category.");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const openDeleteDialog = (id) => {
    setMyStoredFunction(() => handleDelete);
    setStoredParams([id]);
    dispatch(setDialogState({ open: true }));
  };

  return (
    <>
      <div className="flex flex-row justify-between py-5 px-3 rounded bg-white mb-2">
        <Typography variant="h5">Category</Typography>
        <Link to="/Admin/Category/Create">
          <Button variant="contained" color="success">+ Add</Button>
        </Link>
      </div>
      <Card variant="outlined">
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="border-r-2 border-gray-200">S.N</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <InfinitySpin visible width="100" color="#1976d2" ariaLabel="loading" />
                  </TableCell>
                </TableRow>
              ) : categoryList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">No categories available</TableCell>
                </TableRow>
              ) : (
                categoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <TableRow hover key={item.id}>
                    <TableCell className="border-r-2 border-gray-200 w-2">{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <Link to={`/Admin/Category/Edit/${item.id}`}>
                        <Button sx={{ margin: "4px" }} variant="contained">
                          <BsPencilSquare title="Edit" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" onClick={() => openDeleteDialog(item.id)}>
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
            count={categoryList.length}
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
