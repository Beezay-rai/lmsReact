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
} from "@mui/material";
import { IoIosArrowRoundBack, IoMdBook } from "react-icons/io";
import { FaPenAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createBookCategoryService } from "../../../services/apiServices/book-category/bookCategoryServices";
import { toast } from "react-toastify";


export default function CreateBookCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (isSubmitting) return;
      const response = await createBookCategoryService(data);
      if (response.status) {
        toast.success(response.message, {
          autoClose: 3000,
          icon: <IoMdBook style={{ color: "#4caf50" }} />,
        });
        navigate("/Admin/Category");
      } else {
        toast.error(response.message, { autoClose: 3000 });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage, { autoClose: 3000 });
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
              Create New Category
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details to add a new book category to the system
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
                        {...register("name", { required: "Name is required" })}
                      />
                    </FormControl>
                  </FormGroup>
                </div>
                 <Divider sx={{ my: 4 }} />

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
                    color="success"
                    disabled={isSubmitting}
                    startIcon={<IoMdBook />}
                    sx={{ px: 4, py: 1 }}
                  >
                    {isSubmitting ? "Creating Category..." : "Create Category"}
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
