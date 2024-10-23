import { Box, Button, Divider, FormControl, FormGroup, Grid, TextField, Typography } from "@mui/material";
import img from '../../assests/img/signup.png'
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../../Services/apiServices/auth/signUpService";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUp() {
    const schema = yup.object().shape({
        firstName:yup.string().required("This field is required"),
        email:yup.string().email("Invalid Format").required("This field is required"),
        password:yup.string().required("This field is required"),
        confirmPassword:yup.string().required("This field is required")
    })
    const { register, handleSubmit, formState: { isSubmitting ,errors} } = useForm({
        resolver:yupResolver(schema),
        defaultValues:{
            role:"User"
        }
    }); 
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleHovered = () => {
        setIsHovered(!isHovered);
    }
    
    
    
    const onSubmit = async (data)=>{
        if(isSubmitting) return;
        signUp(data).then((response)=>{
            debugger
            if(response.status){
                toast.success(("Signed Up Sucessfully !!"),{
                    autoClose:3000
                })
                navigate("/Login")
            }
            else{
                toast.error("Sign up Failed")
            }
        })
    }
    return (
        <>
            <Box className=" flex flex-row">
                <div className="flex-1 w-3/5 ">
                    <img src={img} alt="Avatar" sx={{ width: "full", height: "full" }} />
                </div>
                <div className="w-2/5 p-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-5 w-auto" autoComplete="off">
                        <div className="header m-4">
                            <Typography variant="h4" className="text-center font-bold ">Welcome to LMS</Typography>
                            <div className="text-center font-thin font-sans">
                                Already signed up? <Link to="/login" className="no-underline text-blue-500 font-bold"> Login </Link>
                            </div>
                        </div>
                        <div className="form-body">
                            <FormGroup sx={{ display: `flex`, flexDirection: `row` }}>
                                <Grid container >

                                    <Grid item xs={6}>
                                        <div className="m-3">
                                            <FormControl>
                                                <TextField
                                                    error={errors?.firstName}
                                                    size="small"
                                                    label="First Name"
                                                    {...register("firstName")}
                                                    helperText={errors?.firstName && errors?.firstName?.message}
                                                ></TextField>
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className="m-3">
                                            <FormControl>
                                                <TextField
                                                    size="small"
                                                    label="Last Name"
                                                    {...register("lastName")}
                                                ></TextField>
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="m-3 ">
                                            <FormControl fullWidth>
                                                <TextField
                                                    error={errors?.email}
                                                    size="small"
                                                    label="Email"
                                                    type="email"
                                                    {...register("email")}
                                                    helperText={errors?.email && errors?.email?.message}
                                                ></TextField>
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="m-3 ">
                                            <FormControl fullWidth>
                                                <TextField
                                                    error={errors?.password}
                                                    size="small"
                                                    label="Password"
                                                    type="password"
                                                    {...register("password")}
                                                    helperText ={errors.password && errors.password.message}
                                                ></TextField>
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="m-3 ">
                                            <FormControl fullWidth>
                                                <TextField
                                                    error={errors?.confirmPassword}
                                                    size="small"
                                                    label="Confirm Password"
                                                    type="password"
                                                    {...register("confirmPassword")}
                                                    helperText ={errors.password && errors.password.message}
                                                ></TextField>
                                            </FormControl>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <div className="m-3 ">
                                            <FormControl fullWidth >
                                                <Button type="submit" variant={isHovered ? "outlined" : "contained"} onMouseEnter={handleHovered} onMouseLeave={handleHovered} >Sign Up</Button>
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider sx={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.12)" }}> Or</Divider>
                                        <div className="social flex justify-center">

                                            <FaFacebook size={30} color="#4267B2" className="m-2"></FaFacebook>
                                            <FcGoogle size={30} className="m-2"></FcGoogle>
                                            <FaTwitter size={30} color="#1DA1F2" className="m-2"></FaTwitter>
                                        </div>
                                    </Grid>
                                </Grid>
                            </FormGroup>
                        </div>
                    </form>
                </div>

            </Box>
        </>
    )
}