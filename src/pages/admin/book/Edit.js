import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
  Stack,
  Avatar,
  Divider,
  InputAdornment,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  MenuItem,
  Chip,
} from "@mui/material";
import { IoIosArrowRoundBack, IoMdBook, IoMdCalendar } from "react-icons/io";
import { FaPenAlt, FaUserEdit, FaBarcode, FaBoxes } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  createBook,
  getBookById,
  updateBook,
} from "../../../services/apiServices/book/bookServices";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useEffect } from "react";
import { getAllBookCategoryService } from "../../../services/apiServices/book-category/bookCategoryServices";
import { useDispatch } from "react-redux";
import MySpinner from "../../../components/ui/MySpinner";
import dayjs from "dayjs";

export default function EditBook() {
  const [bookData, setBookData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await getBookById(id);
        if (response.status) {
          debugger;
          reset(response.data);
        }
      } catch {
      } finally {
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getAllBookCategoryService();
        if (data.status) {
          setCategories(data.data);
        } else {
          console.error("Failed to fetch categories:", data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
    fetchBookData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      if (isSubmitting) return;
      const response = await updateBook(id, data);
      if (response.status) {
        toast.success(response.message, {
          autoClose: 3000,
          icon: <IoMdBook style={{ color: "#4caf50" }} />,
        });
        navigate("/Admin/Book");
      } else {
        toast.error(response.message, { autoClose: 3000 });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage, { autoClose: 3000 });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <MySpinner />
      </div>
    );
  }

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
              Update Book
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details to add a new book to the system
            </Typography>
          </div>
        </Stack>

        <Card
          // elevation={4}
          variant="outlined"
          sx={{
            borderRadius: 4,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <div className="form-cover">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-10">
                  <FormControl fullWidth>
                    <TextField
                      required
                      label="Book Name"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                      InputProps={{
                        startAdornment: (
                          <FaPenAlt
                            style={{ marginRight: 8, color: "#1976d2" }}
                          />
                        ),
                      }}
                      {...register("name", { required: "Name is required" })}
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <TextField
                      label="Author Name"
                      error={!!errors.authorName}
                      helperText={
                        errors.authorName ? errors.authorName.message : ""
                      }
                      InputProps={{
                        startAdornment: (
                          <FaUserEdit
                            style={{ marginRight: 8, color: "#1976d2" }}
                          />
                        ),
                      }}
                      {...register("author_name")}
                    />
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={!!errors.book_categories}
                    required
                  >
                    <InputLabel id="categories-label">Category</InputLabel>
                    <Controller
                      name="book_categories"
                      control={control}
                      rules={{ required: "At least one category is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          multiple
                          value={field.value || []}
                          onChange={(event) =>
                            field.onChange(event.target.value)
                          }
                          input={<OutlinedInput label="Category" />}
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => {
                                const category = categories.find(
                                  (cat) => cat.id === value
                                );
                                return (
                                  <Chip
                                    key={value}
                                    label={category ? category.name : value}
                                  />
                                );
                              })}
                            </Box>
                          )}
                        >
                          {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.book_categories && (
                      <Typography variant="caption" color="error">
                        {errors.book_categories.message}
                      </Typography>
                    )}
                  </FormControl>

                  <FormControl fullWidth>
                    <TextField
                      label="ISBN"
                      error={!!errors.isbn}
                      helperText={errors.isbn ? errors.isbn.message : ""}
                      InputProps={{
                        startAdornment: (
                          <FaBarcode
                            style={{ marginRight: 8, color: "#1976d2" }}
                          />
                        ),
                      }}
                      {...register("isbn")}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name="publication_date"
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          onChange={onChange}
                          value={value ? dayjs(value) : null}
                          label="Date of Birth"
                          disableFuture
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              error: !!errors.dob,
                              helperText: errors.dob?.message,
                              InputProps: {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IoMdCalendar color="#1976d2" />
                                  </InputAdornment>
                                ),
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </div>

                <Divider sx={{ my: 4 }} />

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Link to="/Admin/Book" style={{ textDecoration: "none" }}>
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
                    color="info"
                    disabled={isSubmitting}
                    startIcon={<IoMdBook />}
                    sx={{ px: 4, py: 1 }}
                  >
                    {isSubmitting ? "Updating Book..." : "Update Book"}
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
