import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, FormControl, FormGroup, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { SInputField } from '../../../components/styles/Styles';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { createStudentService } from '../../../services/apiServices/student/studentService';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { courseService } from '../../../services/apiServices/course/courseServices';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { SFormCover } from '../style/style';
const schema = yup.object().shape({
    firstName: yup.string().required("Name is required !"),
    courseId: yup.number().min(1, "Please select course !").required("This Field is required !").typeError("Please select course !"),
    emailAddress: yup.string().email("Invalid").required("Email is required !"),
    phoneNumber: yup.string().min(10,"Minimum 10 digit").max(15,"Maximum 15 digit").required(),
    birthDate:yup.date().required("Please select birth date !"),
    genderId: yup.number().min(1, "Please select gender !").required("This Field is required !").typeError("Please select gender !"),

})

export default function CreateStudent() {
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();
    const [courseList, setCourseList] = useState([]);

    const onSubmit = async (data) => {
        try {
            if (isSubmitting) return;
            const response = await createStudentService(data);
            if (response.status) {
                toast.success(response.message, {
                    autoclose: 1000,
                })
                navigate("/Admin/Student")
            } else {
                toast.error(response.message, {
                    autoclose: 1000,
                })
            }

        }
        catch (error) {
            toast.error("Student Not Created !!", {
                autoClose: 3000
            })
        }


    }

    //Fetch Course List
    useEffect(() => {
        let courseData = () => {
            courseService().then((response) => {
                if(response.status){

                    setCourseList(response.data)
                }
            })
        }
        courseData()
    }, [])




    return (
        <>
            <Container maxWidth="xl">
                <Toolbar sx={{ flexDirection: `row`, borderRadius: '20px', justifyContent: "space-between", padding: '10px', alignItems: 'flex-start', background: 'white', marginBottom: '10px' }}>
                    <Typography variant='h6' > + Add Student</Typography>
                </Toolbar >
                <SFormCover>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <FormGroup sx={{ display: `flex`, flexDirection: `row` }}>
                            <SInputField>
                                <FormControl>
                                    <TextField
                                        label="First Name"
                                        {...register('firstName')}
                                        error={errors?.firstName}
                                        helperText={errors?.firstName?.message}
                                    />
                                </FormControl>
                            </SInputField>
                            <SInputField>
                                <FormControl>
                                    <TextField
                                        label="Last Name"
                                        {...register('lastName')}
                                    />
                                </FormControl>
                            </SInputField>
                            <SInputField>
                                <Controller
                                    control={control}
                                    name='birthDate'
                                    render={({ field: { onChange } }) => (
                                        <DatePicker
                                            onChange={(data) => onChange(new Date(data).toLocaleDateString('fr-CA', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric'
                                            }))
                                            }
                                            label='Birth Date'
                                            disableFuture
                                            format='YYYY/MM/DD'
                                            

                                        ></DatePicker>
                                        
                                    )} />

                                <FormHelperText error>{errors?.birthDate?.message} </FormHelperText>

                            </SInputField>
                            <SInputField>
                                <FormControl fullWidth>
                                    <InputLabel id="course" error={errors?.courseId}>Course</InputLabel>
                                    <Select
                                        labelId="course"
                                        id="course-select"
                                        label="Course"
                                        error={errors?.courseId}
                                        {...register("courseId")}
                                    >

                                        {courseList.map((item, index) => (
                                            <MenuItem key={index} value={item.id}>
                                                {item.courseName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error> {errors?.courseId?.message}</FormHelperText>
                                </FormControl>
                            </SInputField>

                            <SInputField>
                                <FormControl fullWidth>
                                    <InputLabel    error={errors?.courseId} id="gender">Gender</InputLabel>
                                    <Select
                                        labelId="gender"
                                        id="gender-select"
                                        label="Gender"
                                        error={errors?.genderId}
                                        {...register("genderId")}
                                    >

                                        <MenuItem key={1} value={1}>Male</MenuItem>
                                        <MenuItem key={2} value={2}>Female</MenuItem>

                                    </Select>
                                    <FormHelperText error> {errors?.genderId?.message}</FormHelperText>
                                </FormControl>
                            </SInputField>

                            <SInputField>
                                <FormControl>
                                    <TextField
                                        label="Email"
                                        {...register('emailAddress')}
                                        error={errors?.emailAddress}
                                        helperText={errors?.emailAddress?.message}
                                    />
                                </FormControl>
                            </SInputField>
                            <SInputField>
                                <FormControl>
                                    <TextField
                                        type='text'
                                        InputProps={{
                                            endAdornment: null,
                                        }}
                                        label="Phone No."
                                        {...register('phoneNumber')}
                                        error={errors?.phoneNumber}
                                        helperText={errors?.phoneNumber?.message}
                                    />
                                </FormControl>
                            </SInputField>
                        </FormGroup>

                        <div className='flex flex-row m-2 gap-3'>
                            <Link to={"/Admin/Student"}>
                                <Button variant="outlined" color='error' endIcon={<IoIosArrowRoundBack />}>
                                    Back
                                </Button>
                            </Link>
                            <Button type="submit" variant="contained" color="success" size='small'>
                                {isSubmitting ? "Submitting" : "Submit"}
                            </Button>
                        </div>
                    </form>
                </SFormCover>
            </Container>
        </>
    );
}