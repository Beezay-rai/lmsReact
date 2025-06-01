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
  Paper,
  Fade,
  Zoom,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import { IoIosArrowRoundBack, IoMdSchool } from "react-icons/io";
import { BsBookHalf, BsCalendar2Month } from "react-icons/bs";
import { FaCreditCard, FaPenAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createCourseService } from "../../../services/apiServices/course/courseServices";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";

// const schema = yup.object().shape({
//   name: yup.string("Cannot contain Number").required("This field is required!"),
//   semester: yup
//     .number()
//     .min(2, "Value should be greater or equal to 2")
//     .required("This field is required!")
//     .typeError("A number is required"),
//   credits: yup.string().required("This field is required!"),
//   description: yup.string().required("Description is required!"),
// });

const InputIcon = ({ icon: Icon, color = "primary" }) => (
  <Avatar
    sx={{
      width: 32,
      height: 32,
      mr: 1,
      bgcolor: `${color}.light`,
      color: `${color}.dark`,
    }}
  >
    <Icon size={16} />
  </Avatar>
);

export default function CreateCourse() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (isSubmitting) return;
      data.id = 0;
      const response = await createCourseService(data);
      if (response.status) {
        toast.success(response.message, {
          autoClose: 3000,
          icon: <IoMdSchool style={{ color: "#4caf50" }} />,
        });
        navigate("/Admin/Course");
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
            <IoMdSchool size={28} />
          </Avatar>
          <div>
            <Typography variant="h4" fontWeight="bold">
              Create New Course
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details to add a new course to the system
            </Typography>
          </div>
        </Stack>

        <Card
             elevation={4} 
          sx={{ 
            borderRadius: 4,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={3}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <FormGroup sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" mb={1}>
                      <InputIcon icon={BsBookHalf} />
                      <Typography variant="subtitle2">Course Name</Typography>
                    </Stack>
                    <FormControl fullWidth>
                      <TextField
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        variant="outlined"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <FaPenAlt
                              style={{ marginRight: 8, color: "#757575" }}
                            />
                          ),
                        }}
                      />
                    </FormControl>
                  </FormGroup>

                  <FormGroup sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" mb={1}>
                      <InputIcon icon={BsCalendar2Month} color="secondary" />
                      <Typography variant="subtitle2">
                        Total Semester
                      </Typography>
                    </Stack>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        {...register("semester")}
                        error={!!errors.semester}
                        helperText={errors.semester?.message}
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                  </FormGroup>
                </Stack>

                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={3}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <FormGroup sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" mb={1}>
                      <InputIcon icon={FaCreditCard} color="info" />
                      <Typography variant="subtitle2">
                        Credit Information
                      </Typography>
                    </Stack>
                    <FormControl fullWidth>
                      <TextField
                        {...register("credits")}
                        error={!!errors.credits}
                        helperText={errors.credits?.message}
                        variant="outlined"
                        type="number"
                        size="small"
                      />
                    </FormControl>
                  </FormGroup>

                  <FormGroup sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" mb={1}>
                      <InputIcon icon={FaPenAlt} color="warning" />
                      <Typography variant="subtitle2">Description</Typography>
                    </Stack>
                    <FormControl fullWidth>
                      <TextField
                        multiline
                        rows={4}
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                  </FormGroup>
                </Stack>
                
                 <Divider sx={{ my: 4 }} />

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                  mt={4}
                >
                  <Link to="/Admin/Course" style={{ textDecoration: "none" }}>
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
                    startIcon={<IoMdSchool />}
                    sx={{ px: 4, py: 1 }} 
                  >
                    {isSubmitting ? "Creating Course..." : "Create Course"}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
