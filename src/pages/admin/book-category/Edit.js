import * as React from "react";
import { useEffect, useState } from "react";
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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { IoIosArrowRoundBack, IoMdBook } from "react-icons/io";
import { FaPenAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  editBookCategoryService,
  bookCategoryByIdService,
} from "../../../services/apiServices/book-category/bookCategoryServices";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MySpinner from "../../../components/ui/MySpinner";

const schema = yup.object().shape({
  name: yup.string().required("This field is required!"),
});

export default function EditBookCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await bookCategoryByIdService(id);
        if (response?.data) {
          const categoryData = response.data;
          reset(categoryData); 
        } else {
          navigate("/error");
        }
      } catch (error) {
        toast.error("Failed to load category data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [id]);
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: categoryData || {}, // Initialize with categoryData when available
  });

  const onSubmit = async (data) => {
    try {
      const response = await editBookCategoryService(id, data);
      if (response.status) {
        toast.success(response.message, {
          autoClose: 3000,
          icon: <IoMdBook style={{ color: "#4caf50" }} />,
        });
        navigate("/Admin/Book-Category");
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
              Update Category
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Modify the details of this book category
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
                <div className="grid grid-cols-6">
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControl>
                      <TextField
                        required
                        label="Name"
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                        InputProps={{
                          startAdornment: (
                            <FaPenAlt
                              style={{ marginRight: 8, color: "#757575" }}
                            />
                          ),
                        }}
                        {...register("name")}
                      />
                    </FormControl>
                  </FormGroup>
                </div>

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                  mt={4}
                >
                  <Link to="/Admin/Book-Category" style={{ textDecoration: "none" }}>
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
                  >
                    {isSubmitting ? "Updating..." : "Update Category"}
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
