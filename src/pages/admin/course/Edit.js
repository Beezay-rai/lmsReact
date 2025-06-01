import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
  Avatar,
  Stack,
  Divider,
  Paper,
  FormGroup,
} from "@mui/material";
import { IoIosArrowRoundBack, IoMdSchool } from "react-icons/io";
import { BsBookHalf, BsCalendar2Month } from "react-icons/bs";
import { FaCreditCard, FaPenAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MySpinner from "../../../components/ui/MySpinner";
import {
  editCourseService,
  courseByIdService,
} from "../../../services/apiServices/course/courseServices";

const schema = yup.object().shape({
  name: yup.string().required("This field is required!"),
  semester: yup
    .number()
    .min(2, "Value should be greater or equal to 2")
    .required("This field is required!")
    .typeError("A number is required"),
  credits: yup.string().required("This field is required!"),
  description: yup.string().required("Description is required!"),
});

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

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: courseData || {}, // Initialize with courseData when available
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courseByIdService(id);
        if (response?.data) {
          setCourseData(response.data);
        } else {
          navigate("/error");
        }
      } catch (error) {
        toast.error("Failed to load course data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    try {
      const response = await editCourseService(id, data);
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
        error.response?.data?.message ||
        error.message ||
        "Failed to update course";
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

  if (!courseData) {
    return <div>Error loading course data</div>;
  }

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
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
            Update Course
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Modify the details of this course
          </Typography>
        </div>
      </Stack>

      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
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
                      defaultValue={courseData.name}
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
                      Semester Details
                    </Typography>
                  </Stack>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      inputProps={{ min: 1 }}
                      {...register("semester")}
                      defaultValue={courseData.semester}
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
                      type="number"
                      inputProps={{ step: "0.5" }}
                      {...register("credits")}
                      defaultValue={courseData.credits}
                      error={!!errors.credits}
                      helperText={errors.credits?.message}
                      variant="outlined"
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
                      defaultValue={courseData.description}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      variant="outlined"
                      size="small"
                    />
                  </FormControl>
                </FormGroup>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                mt={4}
              >
                <Link to="/Admin/Course" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    color="secondary"
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
                  startIcon={<IoMdSchool />}
                  sx={{ px: 4, py: 1 }}
                >
                  {isSubmitting ? "Updating..." : "Update Course"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Paper>
  );
}
