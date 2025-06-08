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
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  Box,
  Checkbox,
  Modal,
  Grid,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setDialogState, setIsLoading } from "../../../redux/appSlices.js";
import MySpinner from "../../../components/ui/MySpinner.jsx";
import {
  deleteTransactionService,
  transactionService,
  returnTransactionService,
} from "../../../services/apiServices/issue-book/issueBookService.js";
import { IoMdBook } from "react-icons/io";
import { useMyDialog } from "../../../components/context/MyDialogContext.tsx";

const tableRowAnimation = {
  hover: {
    scale: 1.01,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 },
  },
};

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "1px solid silver",
  outline: "none",
  borderRadius: "10px",
  padding: "30px",
};

export default function IssuedBookList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState("");
  const [id, setId] = useState(0);
  const [status, setStatus] = useState(false);
  const [change, setChange] = useState(false);
  const { open } = useMyDialog();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchTransactions();
  }, [change]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await transactionService();
      if (response?.status) {
        setApiData(response.data);
      } else {
        toast.error("Failed to fetch transactions.");
        setApiData([]);
      }
    } catch (error) {
      toast.error("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    dispatch(setIsLoading(true));
    try {
      const response = await deleteTransactionService(id);
      if (response.status) {
        toast.success("Deleted Successfully", { autoClose: 2000 });
        setChange(!change);
      } else {
        toast.error("Error Occurred!");
      }
    } catch {
      toast.error("Failed to delete transaction.");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleReturnStatusUpdate = async (id, currentStatus) => {
    dispatch(setIsLoading(true));
    try {
      const response = await returnTransactionService(id, !currentStatus);
      if (response.status) {
        toast.success("Updated Successfully", { autoClose: 2000 });
        setChange(!change);
      } else {
        toast.error("Error Occurred!");
      }
    } catch {
      toast.error("Failed to update transaction.");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const openActionDialog = (action, id, returnStatus) => {
    if (action === "delete") {
      open({
        title: "Delete Transaction",
        message: "Are you sure you want to delete this transaction?",
        confirmText: "Delete",
        color: "error",
        onConfirm: handleDelete,
        params: [id],
      });
    } else {
      open({
        title: "Update Return Status",
        message: `Are you sure you want to mark this transaction as ${
          returnStatus ? "not returned" : "returned"
        }?`,
        confirmText: "Update",
        color: "primary",
        onConfirm: handleReturnStatusUpdate,
        params: [id, returnStatus],
      });
    }
  };

  const filteredTransactions = apiData.filter(
    (transaction) =>
      transaction.issuedDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toString().includes(searchTerm)
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
            Issue Book
          </Typography>

          <Link to="/Rent-Book/Create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<IoMdBook />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Issue book
            </Button>
          </Link>
        </div>

        <div className="flex justify-end">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoMdBook />
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
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 600, width: "10%" }}>
                  #
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600, width: "40%" }}>
                  Issued Date
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600, width: "30%" }}>
                  Return Status
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
              ) : filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                    <Typography variant="body1" color="textSecondary">
                      {searchTerm
                        ? "No matching transactions found"
                        : "No transactions available"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions
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
                            {item.issuedDate.charAt(0)}
                          </Avatar>
                          <Typography fontWeight={500}>{item.issuedDate}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.returnStatus}
                          onChange={() =>
                            openActionDialog("update", item.id, item.returnStatus)
                          }
                          color="primary"
                        />
                        <Chip
                          label={item.returnStatus ? "Returned" : "Not Returned"}
                          color={item.returnStatus ? "success" : "error"}
                          variant="outlined"
                          sx={{ ml: 1, fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Link to={`/Transaction/Edit/${item.id}`}>
                          <Button sx={{ margin: "4px" }} variant="contained">
                            <BsPencilSquare title="Edit" />
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => openActionDialog("delete", item.id)}
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
            count={filteredTransactions.length}
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