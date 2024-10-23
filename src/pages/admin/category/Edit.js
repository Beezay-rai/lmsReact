import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, FormControl, FormGroup, Stack, TextField } from '@mui/material';
import { SInputField } from '../../../components/styles/Styles';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { editCategoryService, categoryByIdService } from '../../../Services/apiServices/category/categoryServices';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

export default function EditCategory() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([])

    //Fetch by Id
    const { id } = useParams();
    useEffect(() => {
        let fetchData = async () => {
            await categoryByIdService(id)
                .then((response) => {
                    setApiData(response.data);
                })
        }
        fetchData()
    }, [])


    // to set the incoming value to the respective fields
    const [initialValue, setInitialValue] = useState({
        id: 0,
        name: "",
    });

    useEffect(() => {
        setInitialValue({
            id: apiData?.id,
            name: apiData?.name || "",
        });
    }, [apiData]);
    useEffect(() => {
        // Use setValue to set values for each input field
        setValue("id", initialValue.id)
        setValue("name", initialValue.name);
    }, [initialValue]);


    const onSubmit = async (data) => {
        try {
            debugger;
            if (isSubmitting) return;
            const response = await editCategoryService(data);
            if (response.status === true) {
                toast.success(response.message, {
                    autoclose: 1000,
                })
                navigate("/Category")
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
            <CssBaseline />
            <Container maxWidth="xl">
                <h2>Edit</h2>
                <Box sx={{ bgcolor: 'white', padding: '10px', marginTop: '15px', borderRadius: '20px' }}>
                    <Box component="form" sx={{ padding: `10px` }} onSubmit={handleSubmit(onSubmit)} >
                        <FormGroup sx={{ display: `flex`, flexDirection: `row` }}>
                            <SInputField>
                                <FormControl>
                                    <TextField
                                        required
                                        label="Name"
                                        {...register('name', { required: true })}
                                        value={initialValue.name}
                                        onChange={(e) => setInitialValue({ ...initialValue, name: e.target.value })}
                                    />
                                </FormControl>
                            </SInputField>
                        </FormGroup>

                        <Stack direction="row" spacing={2} sx={{ margin: `20px 20px 20px 5px` }}>
                            <Link to={"/Category"}>
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