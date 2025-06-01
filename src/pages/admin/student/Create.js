// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   FormHelperText,
//   IconButton,
//   Paper,
//   Divider,
//   Avatar,
//   InputAdornment,
//   Stack
// } from "@mui/material";
// import {
//   IoIosArrowRoundBack,
//   IoMdPerson,
//   IoMdCalendar,
//   IoMdSchool,
//   IoMdTransgender,
//   IoMdMail,
//   IoMdCall
// } from "react-icons/io";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { createStudentService } from "../../../services/apiServices/student/studentService";
// import { courseService } from "../../../services/apiServices/course/courseServices";
// import { FaUserGraduate } from "react-icons/fa";

// const schema = yup.object().shape({
//   first_name: yup.string().required("Name is required!"),
//   course_id: yup
//     .number()
//     .min(1, "Please select course!")
//     .required("This field is required!")
//     .typeError("Please select course!"),
//   email_address: yup.string().email("Invalid email").required("Email is required!"),
//   phoneNumber: yup
//     .string()
//     .min(10, "Minimum 10 digits")
//     .max(15, "Maximum 15 digits")
//     .required("Phone number is required"),
//   birthDate: yup.date().required("Please select birth date!"),
//   genderId: yup
//     .number()
//     .min(1, "Please select gender!")
//     .required("This field is required!")
//     .typeError("Please select gender!"),
// });

// const fadeIn = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
// };

// export default function CreateStudent() {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const navigate = useNavigate();
//   const [courseList, setCourseList] = useState([]);
//   const [isHovered, setIsHovered] = useState(false);

//   const onSubmit = async (data) => {
//     try {
//       if (isSubmitting) return;
//       const response = await createStudentService(data);
//       if (response.status) {
//         toast.success(response.message, {
//           autoclose: 1000,
//         });
//         navigate("/Admin/Student");
//       } else {
//         toast.error(response.message, {
//           autoclose: 1000,
//         });
//       }
//     } catch (error) {
//       toast.error("Student creation failed!", {
//         autoClose: 3000,
//       });
//     }
//   };
//    const fetchCourses = async () => {
//       try {
//         const response = await courseService();
//         console.log(response,"category");
//         if (response.status) {
//           setCourseList(response.data);
//         }
//       } catch (error) {
//         toast.error("Failed to load courses", {
//           autoClose: 2000,
//         });
//       }
//     };

//   useEffect( () => {

//      fetchCourses();
//   }, []);

//   return (
//     <Box sx={{ p: 3 }}>
//       <motion.div initial="hidden" animate="visible" variants={fadeIn}>
//          <Stack direction="row" alignItems="center" spacing={2} mb={4}>
//           <Avatar
//             sx={{
//               bgcolor: "primary.light",
//               color: "primary.dark",
//               width: 56,
//               height: 56,
//             }}
//           >
//             <FaUserGraduate size={28} />
//           </Avatar>
//           <div>
//             <Typography variant="h4" fontWeight="bold">
//               Add New Student
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Fill in the details to add a new student to the system
//             </Typography>
//           </div>
//         </Stack>

//         <Card
//           elevation={4}
//           sx={{
//             borderRadius: 4,
//             boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
//           }}
//         >
//           <CardContent sx={{ p: 4 }}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Box sx={{
//                 display: 'grid',
//                 gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
//                 gap: 3,
//                 mb: 4
//               }}>
//                 {/* First Name */}
//                 <FormControl fullWidth>
//                   <TextField
//                     label="First Name"
//                     variant="outlined"
//                     error={!!errors.first_name}
//                     helperText={errors.first_name?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <IoMdPerson color="#1976d2" />
//                         </InputAdornment>
//                       ),
//                     }}
//                     {...register("first_name")}

//                   />
//                 </FormControl>

//                 {/* Last Name */}
//                 <FormControl fullWidth>
//                   <TextField
//                     label="Last Name"
//                     variant="outlined"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <IoMdPerson color="#1976d2" />
//                         </InputAdornment>
//                       ),
//                     }}
//                     {...register("last_name")}

//                   />
//                 </FormControl>

//                 {/* Birth Date */}
//                 <FormControl fullWidth>
//                   <Controller
//                     control={control}
//                     name="birthDate"
//                     render={({ field: { onChange } }) => (
//                       <DatePicker
//                         onChange={(data) => onChange(new Date(data).toLocaleDateString('fr-CA', {
//                           year: 'numeric',
//                           month: 'numeric',
//                           day: 'numeric'
//                         }))}
//                         label="Birth Date"
//                         disableFuture
//                         slotProps={{
//                           textField: {
//                             variant: 'outlined',
//                             error: !!errors.birthDate,
//                             helperText: errors.birthDate?.message,
//                             InputProps: {
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <IoMdCalendar color="#1976d2" />
//                                 </InputAdornment>
//                               ),
//                             },

//                           }
//                         }}
//                       />
//                     )}
//                   />
//                 </FormControl>

//                 {/* Course */}
//                 <FormControl fullWidth error={!!errors.course_id}>
//                   <InputLabel id="course-label">Course</InputLabel>
//                   <Select
//                     labelId="course-label"
//                     label="Course"
//                     {...register("course_id")}
//                     defaultValue ={""}
//                     startAdornment={
//                       <InputAdornment position="start">
//                         <IoMdSchool color="#1976d2" />
//                       </InputAdornment>
//                     }
//                   >
//                     <MenuItem value={""} selected={true}>
//                      -- Select Course --
//                     </MenuItem>
//                     {courseList.map((item) => (
//                       <MenuItem key={item.id} value={item.id}>
//                         {item.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   <FormHelperText>{errors.course_id?.message}</FormHelperText>
//                 </FormControl>

//                 {/* Gender */}
//                 <FormControl fullWidth error={!!errors.genderId}>
//                   <InputLabel id="gender-label">Gender</InputLabel>
//                   <Select
//                     labelId="gender-label"
//                     label="Gender"
//                     {...register("genderId")}
//                     sx={{
//                       borderRadius: 3,
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: errors.genderId ? 'error.main' : undefined,
//                       }
//                     }}
//                     startAdornment={
//                       <InputAdornment position="start">
//                         <IoMdTransgender color="#1976d2" />
//                       </InputAdornment>
//                     }
//                   >
//                     <MenuItem value={1}>Male</MenuItem>
//                     <MenuItem value={2}>Female</MenuItem>
//                     <MenuItem value={3}>Other</MenuItem>
//                   </Select>
//                   <FormHelperText>{errors.genderId?.message}</FormHelperText>
//                 </FormControl>

//                 {/* Email */}
//                 <FormControl fullWidth>
//                   <TextField
//                     label="Email"
//                     variant="outlined"
//                     error={!!errors.email_address}
//                     helperText={errors.email_address?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <IoMdMail color="#1976d2" />
//                         </InputAdornment>
//                       ),
//                     }}
//                     {...register("email_address")}

//                   />
//                 </FormControl>

//                 {/* Phone Number */}
//                 <FormControl fullWidth>
//                   <TextField
//                     label="Phone Number"
//                     variant="outlined"
//                     error={!!errors.phoneNumber}
//                     helperText={errors.phoneNumber?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <IoMdCall color="#1976d2" />
//                         </InputAdornment>
//                       ),
//                     }}
//                     {...register("phoneNumber")}

//                   />
//                 </FormControl>
//               </Box>

//                 <Stack
//                   direction="row"
//                   spacing={2}
//                   justifyContent="flex-end"
//                   mt={4}
//                 >
//                   <Link to="/Admin/Student" style={{ textDecoration: "none" }}>
//                     <Button
//                       variant="outlined"
//                       color="error"
//                       startIcon={<IoIosArrowRoundBack />}
//                       sx={{ px: 3 }}
//                     >
//                       Cancel
//                     </Button>
//                   </Link>

//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="success"
//                     disabled={isSubmitting}
//                     startIcon={<IoMdSchool />}
//                     sx={{ px: 4, py: 1 }}
//                   >
//                     {isSubmitting ? "Creating Student..." : "Create Student"}
//                   </Button>
//                 </Stack>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </Box>
//   );
// }

import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Divider,
} from "@mui/material";
import {
  IoIosArrowRoundBack,
  IoMdPerson,
  IoMdCalendar,
  IoMdSchool,
  IoMdMail,
  IoMdCall,
} from "react-icons/io";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createStudentService } from "../../../services/apiServices/student/studentService";
import { courseService } from "../../../services/apiServices/course/courseServices";
import { FaUserGraduate } from "react-icons/fa";

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
  phoneNumber: yup
    .string()
    .min(10, "Minimum 10 digits")
    .max(15, "Maximum 15 digits")
    .required("Phone number is required"),
  dob: yup.date().required("Please select date of birth!"),
});

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CreateStudent() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);

  const onSubmit = async (data) => {
    try {
      if (isSubmitting) return;

      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        course_id: data.course_id,
        email_address: data.email_address,
        phone_number: data.phoneNumber,
        dob: data.dob,
      };

      const response = await createStudentService(payload);
      if (response.status) {
        toast.success(response.message, { autoclose: 1000 });
        navigate("/Admin/Student");
      } else {
        toast.error(response.message, { autoclose: 1000 });
      }
    } catch (error) {
      toast.error("Student creation failed!", { autoClose: 3000 });
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService();
        if (response.status) {
          setCourseList(response.data);
        }
      } catch (error) {
        toast.error("Failed to load courses", { autoClose: 2000 });
      }
    };
    fetchCourses();
  }, []);

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
            Add New Student
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in the details to add a new student to the system
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
                  render={({ field: { onChange } }) => (
                    <DatePicker
                      onChange={(data) =>
                        onChange(
                          new Date(data).toLocaleDateString("fr-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        )
                      }
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
                <Select
                  labelId="course-label"
                  label="Course"
                  error={!!errors.course_id}
                  {...register("course_id")}
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
                <FormHelperText>{errors.course_id?.message}</FormHelperText>
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

              {/* Phone Number */}
              <FormControl fullWidth>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoMdCall color="#1976d2" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("phoneNumber")}
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
                color="success"
                disabled={isSubmitting}
                startIcon={<IoMdSchool />}
                sx={{ px: 4, py: 1 }}
              >
                {isSubmitting ? "Creating Student..." : "Create Student"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
