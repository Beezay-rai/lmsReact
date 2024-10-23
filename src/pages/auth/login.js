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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { googleLogin } from "../../Services/apiServices/auth/googleService";
import { loginUser } from "../../Services/apiServices/auth/loginService";
import img from "../../assests/img/asdf.png";
import { setIsLoading, setUserDetail } from "../../redux/appSlices";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCheckBox = () => {
    setChecked(!checked);
  };
  const appState = useSelector((state) => state.appFeature);

  const googleResponse = async (response) => {
    googleLogin(response.credential)
      .then((apiResponse) => {
        if (apiResponse.status === true) {
          dispatch(setIsLoading(false));
          dispatch(setUserDetail(apiResponse));
          toast.success(`${apiResponse.data.name} Logged in Successfully`, {
            icon: "🚀",
            autoClose: 2000,
            position: "top-right",
          });
          navigate("/");
        } else {
          toast.error(apiResponse.message, {
            autoClose: 1000,
          });
        }
      })
      .catch(() => {
        toast.error("Login Failure", {
          autoClose: 3000,
        });
      });
  };

  const onSubmit = async (data) => {
    dispatch(setIsLoading(true));
    if (isSubmitting) return;
    loginUser(data)
      .then((response) => {
        if (response.status === true) {
         
          dispatch(setUserDetail(response));
          toast.success(`${response.data.name} Logged in Successfully`, {
            icon: "🚀",
            autoClose: 2000,
            position: "top-right",
          });
          navigate("/");
        } else {
          toast.error(response.message, {
            autoClose: 1000,
          });
        }
      })
      .catch(() => {
        toast.error("Login Failure", {
          autoClose: 3000,
        });
      });
    dispatch(setIsLoading(false));
  };

  return (
    <Box className="flex justify-center mt-10 m-auto   bg-white border  w-4/5   shadow-2xl rounded-2xl">
      <div className="w-full ">
        <img
          alt="picture"
          src={img}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            margin: "auto",
            marginTop: "50px",
          }}
        ></img>
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
                    fullWidth
                    id="username"
                    label="Username"
                    size="small"
                    inputProps={{
                      style: { fontSize: "15px" },
                    }}
                    {...register("username")}
                  />
                </FormControl>
              </div>
              <div className="m-3 w-2/4">
                <FormControl fullWidth>
                  <TextField
                    label="Password"
                    type="password"
                    inputProps={{
                      style: { fontSize: "15px" },
                    }}
                    id="password"
                    size="small"
                    {...register("password")}
                  />
                </FormControl>
              </div>
              <div className="flex m-3">
                <FormControlLabel
                  sx={{ alignItems: `center` }}
                  label="Remember Me"
                  onChange={handleCheckBox}
                  control={<Checkbox value="remember" />}
                />
                <Link>
                  <Button
                    type="button"
                    variant="text"
                    color="primary"
                    sx={{ textTransform: `none`, outlineColor: `white` }}
                  >
                    Forgot Password
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col  mt-5">
                <div>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ textTransform: `none` }}
                  >
                    {isSubmitting || appState.isLoading
                      ? "Signing in.."
                      : "Sign In"}
                  </Button>
                </div>
                <div className="mt-5">
                  <Divider
                    sx={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.12)" }}
                  />

                  <div className="social flex justify-center">
                    <FaFacebook
                      size={30}
                      color="#4267B2"
                      className="m-2"
                    ></FaFacebook>

                    <GoogleLogin
                      shape="circle"
                      type="icon"
                      size="large"
                      onSuccess={googleResponse}
                    ></GoogleLogin>
                    <FaTwitter
                      size={30}
                      color="#1DA1F2"
                      className="m-2"
                    ></FaTwitter>
                  </div>

                  <div className="text-center font-thin font-sans mt-5">
                    Not a User?
                    <Link
                      to="/SignUp"
                      className="no-underline text-blue-500 font-bold"
                    >
                      Sign Up Now
                    </Link>
                  </div>
                </div>
              </div>
            </FormGroup>
          </Box>
        </form>
      </div>
    </Box>
  );
}
