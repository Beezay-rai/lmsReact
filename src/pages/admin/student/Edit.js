import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { SInputField } from "../../../components/styles/Styles";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  editStudentService,
  studentByIdService,
} from "../../../Services/apiServices/student/studentService";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { courseService } from "../../../Services/apiServices/course/courseServices";
import { genderService } from "../../../Services/apiServices/common/gender/genderService";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';



const schema = yup.object().shape({
  firstName: yup.string().required("Name is required !"),
  courseId: yup.number().min(1, "Please select course !").required("This Field is required !").typeError("Please select course !"),
  emailAddress: yup.string().email("Invalid").required("Email is required !"),
  phoneNumber: yup.string().min(10,"Minimum 10 digit").max(15,"Maximum 15 digit").required(),
  birthDate:yup.date().required("Please select birth date !"),
  genderId: yup.number().min(1, "Please select gender !").required("This Field is required !").typeError("Please select gender !"),

})

export default function EditStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema)

  });
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  //Fetch by Id
  const { id } = useParams();
  useEffect(() => {
    let fetchData = async () => {
      await studentByIdService(id).then((response) => {
        setApiData(response.data);
      });
    };
    fetchData();
  }, []);

  //Course List Fetch
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    let courseData = () => {
      courseService().then((response) => {
        setCourseList(response.data);
      });
    };
    courseData();
  }, [apiData]);

  //Gender list Fetch
  const [genderList, setGenderList] = useState([]);
  useEffect(() => {
    let genderData = () => {
      genderService().then((response) => {
        if (response.status) {
          setGenderList(response.data);
        }
      });
    };
    genderData();
  }, [apiData]);

  // to set the incoming value to the respective fields
  const [initialValue, setInitialValue] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    birthDate: "",
    courseId: 0,
    genderId: 0,
    emailAddress:"",
    phoneNumber:""
  });

  useEffect(() => {
    setInitialValue({
      id: apiData?.id,
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      birthDate: apiData?.birthDate || "",
      courseId: apiData?.courseId || "",
      genderId: apiData?.genderId || "",
      emailAddress: apiData?.emailAddress || "",
      phoneNumber: apiData?.phoneNumber || "",
    });
  }, [apiData]);
  useEffect(() => {
    // Use setValue to set values for each input field
    setValue("id", initialValue.id);
    setValue("firstName", initialValue.firstName);
    setValue("lastName", initialValue.lastName);
    setValue("genderId", initialValue.genderId);
    setValue("courseId", initialValue.courseId);
    setValue("birthDate", initialValue.birthDate);
  }, [initialValue]);

  const handleBirthDate = (data) => setValue("birthDate", data);

  const onSubmit = async (data) => {
    try {
      debugger;
      if (isSubmitting) return;
      const response = await editStudentService(data);
      if (response.status === true) {
        toast.success(response.message, {
          autoclose: 1000,
        });
        navigate("/Admin/Student");
      } else if (response.status === false) {
        toast.error(response.message, {
          autoclose: 1000,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            flexDirection: `row`,
            borderRadius: "20px",
            justifyContent: "space-between",
            padding: "10px",
            alignItems: "flex-start",
            background: "white",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h6"> Update</Typography>
        </Toolbar>
        <Box
          sx={{
            bgcolor: "white",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "20px",
          }}
        >
          <Box
            component="form"
            sx={{ padding: `10px` }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormGroup sx={{ display: `flex`, flexDirection: `row` }}>
              <SInputField>
                <FormControl>
                  <TextField
                    required
                    label="First Name"
                    {...register("firstName", { required: true })}
                    value={initialValue.firstName}
                    onChange={(e) =>
                      setInitialValue({
                        ...initialValue,
                        firstName: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </SInputField>

              <SInputField>
                <FormControl>
                  <TextField
                    label="Last Name"
                    {...register("lastName")}
                    value={initialValue.lastName}
                    onChange={(e) =>
                      setInitialValue({
                        ...initialValue,
                        lastName: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </SInputField>

              <SInputField>
                <DatePicker
                  label="Return Date"
                  disablePast
                  format="YYYY-MM-DD"
                  name="returnDate"
                  onChange={handleBirthDate}
                  value={
                    initialValue?.returnDate
                      ? dayjs(initialValue?.returnDate)
                      : dayjs()
                  }
                />
              </SInputField>

              <SInputField>
                <FormControl fullWidth>
                  <InputLabel id="Course">Course</InputLabel>
                  <Select
                    labelId="Course"
                    id="Course-select"
                    label="Course"
                    {...register("courseId")}
                    value={initialValue.courseId}
                    onChange={(e) =>
                      setInitialValue({
                        ...initialValue,
                        courseId: e.target.value,
                      })
                    }
                  >
                    {courseList.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.courseName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SInputField>

              <SInputField>
                <FormControl fullWidth>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender-select"
                    label="Gender"
                    {...register("genderId")}
                    value={initialValue.genderId}
                    onChange={(e) =>
                      setInitialValue({
                        ...initialValue,
                        genderId: e.target.value,
                      })
                    }
                  >
                    {genderList.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SInputField>
              <SInputField>
                <FormControl>
                  <TextField
                    label="Email"
                    {...register("emailAddress")}
                    value={initialValue.emailAddress}
                    onChange={(e) =>
                      setInitialValue({
                        ...initialValue,
                        emailAddress: e.target.value,
                      })
                    }
                    error={errors?.emailAddress}
                    helperText={errors?.emailAddress?.message}
                  />
                </FormControl>
              </SInputField>
              <SInputField>
                <FormControl>
                  <TextField
                    type="text"
                    InputProps={{
                      endAdornment: null,
                    }}
                    label="Phone No."
                    {...register("phoneNumber")}
                    value={initialValue.phoneNumber}
                    onChange={(e) =>
                      setInitialValue({
                        ...initialValue,
                        phoneNumber: e.target.value,
                      })
                    }
                    error={errors?.phoneNumber}
                    helperText={errors?.phoneNumber?.message}
                  />
                </FormControl>
              </SInputField>
            </FormGroup>

            <Stack
              direction="row"
              spacing={2}
              sx={{ margin: `20px 20px 20px 5px` }}
            >
              <Link to={"/Admin/Student"}>
                <Button
                  variant="outlined"
                  color="error"
                  endIcon={<IoIosArrowRoundBack />}
                >
                  Back
                </Button>
              </Link>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="small"
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
}
