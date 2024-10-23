import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, FormControl, FormGroup, FormHelperText, FormLabel, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { SInputField, TextArea } from '../../../components/styles/Styles';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createCourseService } from '../../../Services/apiServices/course/courseServices';
import { toast } from 'react-toastify';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';


const schema = yup.object().shape({
    courseName: yup.string("Cannot contain Number").required("This field is required !"),
    semester: yup.number().min(2, "Value should be greater or equal to 2").required("This field is required !").typeError('A number is required'),
    credits: yup.string().required("This field is required !"),

})


export default function CreateCourse() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            if (isSubmitting) return;
            const response = await createCourseService(data);
            if (response.status === true) {
                toast.success(response.message, {
                    autoclose: 1000,
                })
                navigate("/Admin/Course")
            } else if (response.status === false) {
                toast.error(response.message, {
                    autoclose: 1000,
                })
            }

        }
        catch (error) {
            toast.error(error.message)
        }

    }
    return (
        <>

            <Container maxWidth="xl">
                <Toolbar sx={{ flexDirection: `row`, borderRadius: '20px', justifyContent: "space-between", padding: '10px', alignItems: 'flex-start', background: 'white', marginBottom: '10px' }}>
                    <Typography variant='h5' > + Add Course</Typography>

                </Toolbar >
                <Box sx={{ bgcolor: 'white', padding: '10px', marginTop: '15px', borderRadius: '20px' }}>
                    <Box component="form" sx={{ padding: `10px` }} onSubmit={handleSubmit(onSubmit)} >
                        <FormGroup sx={{ display: `flex`, flexDirection: `row` }}>
                            <SInputField>
                                <FormControl>
                                    <TextField
                                        label="Name"
                                        {...register('courseName')}
                                        error={errors?.courseName}
                                        helperText={errors?.courseName?.message}
                                    />

                                </FormControl>
                            </SInputField>
                            <SInputField>
                                <FormControl>
                                    <TextField
                                        label="Semester"
                                        type='number'
                                        {...register('semester')}
                                        error={errors?.semester}
                                        helperText={errors?.semester?.message}
                                    />

                                </FormControl>
                            </SInputField>
                            <SInputField>
                                <FormControl>
                                    <TextField
                                        label="Credits"
                                        {...register('credits')}
                                        error={errors?.credits}
                                        helperText={errors?.credits?.message}
                                    />

                                </FormControl>
                            </SInputField>
                          
                        </FormGroup>
                        <FormGroup>
                            <SInputField >
                                <FormControl>
                                    <FormLabel className='m-1'>Description</FormLabel>
                                    <TextArea
                                        rows={4}
                                        cols={50}
                                        label="Description"
                                        {...register('description')}
                                        error={errors?.description}
                                        helperText={errors?.description?.message}
                                    />

                                </FormControl>
                            </SInputField>
                        </FormGroup>

                        <Stack direction="row" spacing={2} sx={{ margin: `20px 20px 20px 5px` }}>
                            <Link to={"/Admin/Course"}>
                                <Button variant="outlined" color='error' endIcon={<IoIosArrowRoundBack />}>
                                    Back
                                </Button>
                            </Link>
                            <Button type="submit" variant="contained" color="success" size='small'>
                                Submit
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </>
    );
}