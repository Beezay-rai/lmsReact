import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { FaFacebook, FaTwitter } from "react-icons/fa";

import img from "../../assests/img/asdf.png";
import { setIsLoading, setUserDetail } from "../../redux/appSlices";
import { loginUserService } from "../../services/apiServices/auth/loginService";
import { googleLoginService } from "../../services/apiServices/auth/googleService";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appState = useSelector((state) => state.appFeature);

  const handleCheckBox = () => setChecked((prev) => !prev);

  const googleResponse = async (response) => {
    try {
      const myApiResponse = await googleLoginService(response.credential);
      if (myApiResponse.status) {
        dispatch(setUserDetail(myApiResponse));
        toast.success("Logged in Successfully", {
          icon: "🚀",
          autoClose: 2000,
          position: "top-right",
        });
        navigate("/");
      } else {
        toast.error("Login Failure", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    debugger
    dispatch(setIsLoading(true));
    try {
      const loginResponse = await loginUserService(data);
      if (loginResponse.status) {
        dispatch(setUserDetail(loginResponse.data));

        toast.success(`${loginResponse.data.name} Logged in Successfully`, {
          icon: "🚀",
          autoClose: 2000,
          position: "top-right",
        });
        navigate("/");
      } else {
        toast.error("Login Failure", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Box className="flex justify-center mt-10 m-auto bg-white border w-4/5 shadow-2xl rounded-2xl">
      <div className="w-full">
        <img
          alt="picture"
          src={img}
          className="max-h-full max-w-full m-auto mt-12"
        />
      </div>
      <div className="w-full max-h-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="form-header p-5 text-center">
            <Typography component="h1" variant="h4" className="font-bold">
              Sign In
            </Typography>
          </Box>
          <Box className="form-body p-5">
            <FormGroup sx={{ alignContent: "space-around" }}>
              <div className="m-3 w-2/4">
                <FormControl fullWidth>
                  <TextField
                    label="email"
                    id="email"
                    size="small"
                    inputProps={{ style: { fontSize: "15px" } }}
                    {...register("email")}
                  />
                </FormControl>
              </div>
              <div className="m-3 w-2/4">
                <FormControl fullWidth>
                  <TextField
                    label="Password"
                    type="password"
                    id="password"
                    size="small"
                    inputProps={{ style: { fontSize: "15px" } }}
                    {...register("password")}
                  />
                </FormControl>
              </div>
              <div className="flex m-3">
                <FormControlLabel
                  label="Remember Me"
                  control={
                    <Checkbox checked={checked} onChange={handleCheckBox} />
                  }
                />
                <Link to="/forgot-password">
                  <Button
                    variant="text"
                    color="primary"
                    sx={{ textTransform: "none" }}
                  >
                    Forgot Password
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col mt-5">
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting || appState.isLoading
                    ? "Signing in.."
                    : "Sign In"}
                </Button>
                <Divider sx={{ margin: "10px" }} />
                <div className="social flex justify-center">
                  <FaFacebook size={30} color="#4267B2" className="m-2" />
                  <GoogleLogin
                    shape="circle"
                    type="icon"
                    size="large"
                    onSuccess={googleResponse}
                  />
                  <FaTwitter size={30} color="#1DA1F2" className="m-2" />
                </div>
                <div className="text-center font-thin font-sans mt-5">
                  Not a User?
                  <Link
                    to="/SignUp"
                    className="no-underline text-blue-500 font-bold"
                  >
                    Sign Up Now{" "}
                  </Link>
                </div>
              </div>
            </FormGroup>
          </Box>
        </form>
      </div>
    </Box>
  );
}
