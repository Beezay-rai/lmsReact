import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../Services/apiServices/auth/loginService";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail, userSlicev2 ,setIsLoading, initialStatev2} from "../../redux/userDetail";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import img from "../../assests/img/asdf.png";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { store } from "../../redux/store";
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
  const currentState = useSelector((state) => state.userDetailv2);

  const onSubmit = async (data) => {
    debugger
    dispatch(setIsLoading(true))
    if (isSubmitting) return;
    loginUser(data)
      .then((response) => {
      

        if (response.status === true) {
          dispatch(setIsLoading(false))
          dispatch(setUserDetail(response));
          toast.success(`${response.data.name} Logged in Successfully`, {
            icon: "🚀",
            autoClose: 2000,
            position: "top-right",
          });
          // navigate("/");
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
  };

  return (
    <Box className="flex justify-center mt-10 m-auto   bg-white border  w-4/5   shadow-2xl rounded-2xl">
      <div className="w-full ">
        <img
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
                    id="email"
                    label="Email"
                    size="small"
                    inputProps={{
                      style: { fontSize: "15px" },
                    }}
                    {...register("email")}
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
                    
                    {isSubmitting || currentState.features.isLoading ? "Signing in.." : "Sign In"}
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
                    <FcGoogle size={30} className="m-2"></FcGoogle>
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
