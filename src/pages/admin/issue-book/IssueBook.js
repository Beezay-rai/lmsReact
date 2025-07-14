import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormGroup,
  TextField,
  Typography,
  Stack,
  Avatar,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Box,
  CssBaseline,
  Container,
  IconButton,
  Chip,
  Paper,
} from "@mui/material";
import { IoIosArrowRoundBack, IoMdBook, IoMdAdd, IoMdClose } from "react-icons/io";
import { FaPenAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { getAllBooks } from "../../../services/apiServices/book/bookServices";
import { getAllStudentService, studentService } from "../../../services/apiServices/student/studentService";
import { DatePicker } from "@mui/x-date-pickers";
import { createIssueBookService } from "../../../services/apiServices/issue-book/issueBookService";
import dayjs from "dayjs";

export default function IssueBook() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState({
    bookId: "",
    returnDate: null,
  });

  // Student List
  useEffect(() => {
    let studentData = () => {
      getAllStudentService().then((response) => {
        setStudentList(response.data);
      });
    };
    studentData();
  }, []);

  // Book List
  useEffect(() => {
    let bookData = () => {
      getAllBooks().then((response) => {
        setBookList(response.data);
      });
    };
    bookData();
  }, []);

  const handleReturnDate = (date) => {
    setCurrentBook(prev => ({ ...prev, returnDate: date }));
  };

  const handleBookSelect = (bookId) => {
    setCurrentBook(prev => ({ ...prev, bookId }));
  };

  const addBook = () => {
    if (!currentBook.bookId || !currentBook.returnDate) {
      toast.error("Please select both book and return date", { autoClose: 1000 });
      return;
    }

    const book = bookList.find(b => b.id === currentBook.bookId);
    if (selectedBooks.some(b => b.bookId === currentBook.bookId)) {
      toast.error("This book is already added", { autoClose: 1000 });
      return;
    }

    setSelectedBooks(prev => [
      ...prev,
      {
        ...currentBook,
        bookName: book.name,
      }
    ]);
    setCurrentBook({ bookId: "", returnDate: null });
  };

  const removeBook = (bookId) => {
    setSelectedBooks(prev => prev.filter(book => book.bookId !== bookId));
  };

  const onSubmit = async (data) => {
    try {
      if (isSubmitting) return;
      if (selectedBooks.length === 0) {
        toast.error("Please add at least one book", { autoClose: 1000 });
        return;
      }
      const payload = {
        student_id: data.studentId,
        rent_book: selectedBooks.map(book => ({
          book_id: book.bookId,
          return_date:dayjs(book.returnDate).format('YYYY-MM-DD'),
        })),
      };

      const response = await createIssueBookService(payload);
      if (response.status === true) {
        toast.success(response.message, {
          autoClose: 1000,
          icon: <IoMdBook style={{ color: "#4caf50" }} />,
        });
        navigate("/IssuedBookList");
      } else if (response.status === false) {
        toast.error(response.message, { autoClose: 1000 });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage, { autoClose: 1000 });
    }
  };

  return (
    <>
        <div className="form-cover">
          <Stack direction="row" alignItems="center" spacing={2} mb={4}>
            <Avatar
              sx={{
                bgcolor: "primary.light",
                color: "primary.dark",
                width: 56,
                height: 56,
              }}
            >
              <IoMdBook size={28} />
            </Avatar>
            <div>
              <Typography variant="h4" fontWeight="bold">
                Issue New Book
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fill in the details to issue books to a student
              </Typography>
            </div>
          </Stack>

          <Card
            elevation={4}
            variant="outlined"
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <div className="form-cover">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-6 gap-4">
                    <FormGroup sx={{ gridColumn: "span 6" }}>
                      <FormControl fullWidth>
                        <InputLabel id="student">Student</InputLabel>
                        <Select
                          labelId="student"
                          id="student-select"
                          label="Student"
                          {...register("studentId", { required: "Student is required" })}
                          error={!!errors.studentId}
                        >
                          {studentList.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.first_name} {item.last_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FormGroup>

                    <Divider sx={{ gridColumn: "span 6", my: 2 }} />

                    <Typography variant="h6" sx={{ gridColumn: "span 6" }}>
                      Add Books
                    </Typography>

                    <FormGroup sx={{ gridColumn: "span 3" }}>
                      <FormControl fullWidth>
                        <InputLabel id="book">Book</InputLabel>
                        <Select
                          labelId="book"
                          id="book-select"
                          label="Book"
                          value={currentBook.bookId}
                          onChange={(e) => handleBookSelect(e.target.value)}
                          error={!!errors.bookId}
                        >
                          {bookList
                            .filter(book => !selectedBooks.some(b => b.bookId === book.id))
                            .map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </FormGroup>

                    <FormGroup sx={{ gridColumn: "span 2" }}>
                      <DatePicker
                        label="Return Date"
                        disablePast
                        format="YYYY-MM-DD"
                        value={currentBook.returnDate}
                        onChange={handleReturnDate}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.returnDate,
                          },
                        }}
                      />
                    </FormGroup>

                    <FormGroup sx={{ gridColumn: "span 1", display: "flex", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<IoMdAdd />}
                        onClick={addBook}
                        sx={{ height: "56px" }}
                      >
                        Add
                      </Button>
                    </FormGroup>

                    {selectedBooks.length > 0 && (
                      <FormGroup sx={{ gridColumn: "span 6" }}>
                        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Selected Books:
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                            {selectedBooks.map((book, index) => (
                              <Chip
                                key={index}
                                label={`${book.bookName} (Return: ${new Date(book.returnDate).toLocaleDateString()})`}
                                onDelete={() => removeBook(book.bookId)}
                                deleteIcon={<IoMdClose />}
                                variant="outlined"
                                sx={{ mb: 1 }}
                              />
                            ))}
                          </Stack>
                        </Paper>
                      </FormGroup>
                    )}

                    <FormGroup sx={{ gridColumn: "span 6" }}>
                      <TextField
                        label="Remarks"
                        fullWidth
                        {...register("remarks")}
                        InputProps={{
                          startAdornment: (
                            <FaPenAlt style={{ marginRight: 8, color: "#757575" }} />
                          ),
                        }}
                      />
                    </FormGroup>
                  </div>

                  <Divider sx={{ my: 4 }} />

                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    mt={4}
                  >
                    <Link to="/IssuedBookList" style={{ textDecoration: "none" }}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<IoIosArrowRoundBack />}
                        sx={{ px: 3 }}
                      >
                        Cancel
                      </Button>
                    </Link>

                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      disabled={isSubmitting}
                      startIcon={<IoMdBook />}
                      sx={{ px: 4, py: 1 }}
                    >
                      {isSubmitting ? "Issuing Books..." : "Issue Books"}
                    </Button>
                  </Stack>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
    </>
  );
}