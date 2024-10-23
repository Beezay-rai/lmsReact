import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, FormControl, FormGroup, FormLabel, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { SInputField, TextArea } from '../../../components/styles/Styles';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { editCourseService, courseByIdService } from '../../../Services/apiServices/course/courseServices';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    courseName: yup.string().required("This field is required !"),
    semester: yup.number().min(2, "Value should be greater or equal to 2").required("This field is required !").typeError('A number is required'),
    credits: yup.string().required("This field is required !"),
    description: yup.string().required("This field is required !")

})

export default function EditCourse() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([])

    //Fetch by Id
    const { id } = useParams();
    useEffect(() => {
        let fetchData = async () => {
            courseByIdService(id)
                .then((response) => {
                    setApiData(response.data);
                })
        }
        fetchData()
    }, [])


    // to set the incoming value to the respective fields
    const [initialValue, setInitialValue] = useState({
        id: 0,
        courseName: "",
        semester: 0,
        description: "",
        credits: ""
    });

    useEffect(() => {
        setInitialValue({
            id: apiData?.id,
            courseName: apiData?.courseName || "",
            semester: apiData?.semester || 0,
            description: apiData?.description || "",
            credits: apiData?.credits || "",
        });
    }, [apiData]);
    useEffect(() => {
        // Use setValue to set values for each input field
        setValue("id", initialValue.id)
        setValue("courseName", initialValue.courseName);
        setValue("semester", initialValue.semester);
        setValue("credits", initialValue.credits);
        setValue("description", initialValue.description);
    }, [initialValue]);


    const onSubmit = async (data) => {
        try {
            debugger;
            if (isSubmitting) return;
            const response = await editCourseService(data);
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
                    <Typography variant='h5' >Update Course</Typography>

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
                                        value={initialValue.courseName}
                                        onChange={(e) => setInitialValue({ ...initialValue, courseName: e.target.value })}
                                    />

                                </FormControl>
                            </SInputField>
                            <SInputField>
                                <FormControl>
                                    <TextField
                                        label="Semester"
                                        type='number'
                                        {...register('semester')}
                                        value={initialValue.semester}
                                        onChange={(e) => setInitialValue({ ...initialValue, semester: e.target.value })}
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
                                        value={initialValue.credits}
                                        onChange={(e) => setInitialValue({ ...initialValue, credits: e.target.value })}
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
                                        value={initialValue.description}
                                        onChange={(e) => setInitialValue({ ...initialValue, description: e.target.value })}
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