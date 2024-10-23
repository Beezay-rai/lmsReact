import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Formhelpertext,
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
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { roleService } from "../../../Services/apiServices/common/role/roleService";
import {
  SignUpService,
  signUp,
} from "../../../Services/apiServices/auth/signUpService";
import * as yup from "yup";
export default function CreateUser() {
  const schema = yup.object().shape({
    firstName: yup.string().required("Name field is required !"),
    email: yup
      .string()
      .email("Invalid email !")
      .required("Email is required !"),
    password: yup
      .string()
      .required("Password is required !")
      .min(8, "Minimum 8 character is required !"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match !")
      .required("Confirm password is required "),
    role: yup.string().required("Select one"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  //For Role Selectlist
  const [roleList, SetRoleList] = useState([]);
  useEffect(() => {
    roleService().then((response) => {
      SetRoleList(response.data);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
        debugger
      if (isSubmitting) return;
      const response = await signUp(data);
      if (response.status === true) {
        toast.success(response.message, {
          autoclose: 1000,
        });
        navigate("/Admin/UserList");
      } else if (response.status === false) {
        toast.error(response.message, {
          autoclose: 1000,
        });
      }
    } catch (error) {
      toast.error("Error Occured !!", {
        autoClose: 3000,
      });
    }
  };

  return (
    <>
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
          <Typography variant="h5">Add User</Typography>
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
            autoCapitalize="off"
          >
            <FormGroup sx={{ display: `flex`, flexDirection: `row` }}>
              <SInputField>
                <FormControl>
                  <TextField
                    label="First Name"
                    {...register("firstName")}
                    error={errors?.firstName}
                  />
                  <FormHelperText error={errors?.firstName}>
                    {" "}
                    {errors?.firstName?.message}
                  </FormHelperText>
                </FormControl>
              </SInputField>
              <SInputField>
                <FormControl>
                  <TextField
                    label="Last Name"
                    {...register("lastName")}
                    error={errors?.lastName}
                  />
                  <FormHelperText error={errors?.lastName}>
                    {errors?.lastName?.message}
                  </FormHelperText>
                </FormControl>
              </SInputField>
              <SInputField>
                <FormControl>
                  <TextField
                    label="Email"
                    {...register("email")}
                    error={errors?.email}
                  />
                  <FormHelperText error={errors?.email}>
                    {errors?.email?.message}
                  </FormHelperText>
                </FormControl>
              </SInputField>
              <SInputField>
                <FormControl>
                  <TextField
                    label="Password"
                    {...register("password")}
                    type="password"
                    error={errors?.password}
                  />
                  <FormHelperText error={errors?.password}>
                    {" "}
                    {errors?.password?.message}
                  </FormHelperText>
                </FormControl>
              </SInputField>
              <SInputField>
                <FormControl>
                  <TextField
                    label="Confirm Password"
                    {...register("confirmPassword")}
                    type="password"
                    error={errors?.confirmPassword}
                  />
                  <FormHelperText error={errors?.confirmPassword}>
                    {" "}
                    {errors?.confirmPassword?.message}
                  </FormHelperText>
                </FormControl>
              </SInputField>
              <SInputField>
                <FormControl fullWidth>
                  <InputLabel id="Role" error={errors?.role}>
                    {" "}
                    Role{" "}
                  </InputLabel>
                  <Select
                    labelId="Role"
                    id="role-select"
                    label="Role"
                    {...register("role")}
                    error={errors?.role}
                  >
                    {roleList.map((item, index) => (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={errors?.role}>
                    {" "}
                    {errors?.role?.message}
                  </FormHelperText>
                </FormControl>
              </SInputField>
            </FormGroup>

            <Stack
              direction="row"
              spacing={2}
              sx={{ margin: `20px 20px 20px 5px` }}
            >
              <Link to={"/Admin/UserList"}>
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
