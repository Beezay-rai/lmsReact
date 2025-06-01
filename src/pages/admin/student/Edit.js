import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
  InputAdornment,
  Stack,
  Avatar,
  Container,
  CssBaseline,
  Divider,
} from "@mui/material";
import {
  IoIosArrowRoundBack,
  IoMdPerson,
  IoMdCalendar,
  IoMdSchool,
  IoMdTransgender,
  IoMdMail,
  IoMdCall,
} from "react-icons/io";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  editStudentService,
  studentByIdService,
} from "../../../services/apiServices/student/studentService";
import { courseService } from "../../../services/apiServices/course/courseServices";
import { FaUserGraduate } from "react-icons/fa";
import dayjs from "dayjs";
import MySpinner from "../../../components/ui/MySpinner";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../../redux/appSlices";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required!"),
  last_name: yup.string().required("Last name is required!"),
  course_id: yup
    .number()
    .min(1, "Please select course!")
    .required("This field is required!")
    .typeError("Please select course!"),
  email_address: yup
    .string()
    .email("Invalid email")
    .required("Email is required!"),
  phone_number: yup
    .string()
    .min(10, "Minimum 10 digits")
    .max(15, "Maximum 15 digits")
    .required("Phone number is required"),
  dob: yup.date().required("Please select date of birth!"),
  gender_id: yup
    .number()
    .min(1, "Please select gender!")
    .required("This field is required!")
    .typeError("Please select gender!"),
});

export default function EditStudent() {
  const [studentData, setStudentData] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: studentData || {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentResponse, courseResponse] = await Promise.all([
          studentByIdService(id),
          courseService(),
        ]);
        if (studentResponse?.data) {
          setStudentData(studentResponse.data);
          reset(studentResponse.data);
        } else {
          navigate("/error");
        }

        if (courseResponse?.data) {
          setCourseList(courseResponse.data);
        }
      } catch (error) {
        toast.error("Failed to load student data");
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchData();
  }, [id, navigate, reset]);

  const onSubmit = async (data) => {
    try {
      if (isSubmitting) return;
      const response = await editStudentService(id, data);
      if (response.status) {
        toast.success(response.message, { autoclose: 1000 });
        navigate("/Admin/Student");
      } else {
        toast.error(response.message, { autoclose: 1000 });
      }
    } catch (error) {
      toast.error("Student update failed!", { autoClose: 3000 });
    }
  };

  return (
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
          <FaUserGraduate size={28} />
        </Avatar>
        <div>
          <Typography variant="h4" fontWeight="bold">
            Edit Student
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Update the details of the student
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
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-10">
              {/* First Name */}
              <FormControl fullWidth>
                <TextField
                  label="First Name"
                  variant="outlined"
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoMdPerson color="#1976d2" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("first_name")}
                />
              </FormControl>

              {/* Last Name */}
              <FormControl fullWidth>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoMdPerson color="#1976d2" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("last_name")}
                />
              </FormControl>

              {/* Date of Birth */}
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="dob"
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

              {/* Course */}
              <FormControl fullWidth error={!!errors.course_id}>
                <InputLabel id="course-label">Course</InputLabel>
                <Controller
                  name="course_id"
                  control={control}
                  defaultValue={studentData?.course_id || ""}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="course-label"
                      label="Course"
                      startAdornment={
                        <InputAdornment position="start">
                          <IoMdSchool color="#1976d2" />
                        </InputAdornment>
                      }
                    >
                      {courseList.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.course_id?.message}</FormHelperText>
              </FormControl>

              {/* Gender */}
              {/* <FormControl fullWidth error={!!errors.gender_id}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    label="Gender"
                    error={!!errors.gender_id}
                    {...register("gender_id")}
                  >
                    {genderList.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.gender_id?.message}</FormHelperText>
                </FormControl> */}

              {/* Phone Number */}
              <FormControl fullWidth>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  error={!!errors.phone_number}
                  helperText={errors.phone_number?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoMdCall color="#1976d2" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("phone_number")}
                />
              </FormControl>

              {/* Email */}
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  variant="outlined"
                  error={!!errors.email_address}
                  helperText={errors.email_address?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoMdMail color="#1976d2" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("email_address")}
                />
              </FormControl>
            </div>

            <Divider sx={{ my: 4 }} />
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
              <Link to="/Admin/Student" style={{ textDecoration: "none" }}>
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
                color="primary"
                disabled={isSubmitting}
                startIcon={<IoMdSchool />}
                sx={{ px: 4, py: 1 }}
              >
                {isSubmitting ? "Updating Student..." : "Update Student"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
