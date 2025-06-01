import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, FormControl, FormGroup, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { SInputField } from '../../../components/styles/Styles';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createTransactionService } from '../../../services/apiServices/transaction/transactionServices';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { getAllBooks } from '../../../services/apiServices/book/bookServices';
import { studentService } from '../../../services/apiServices/student/studentService';
import { DatePicker } from '@mui/x-date-pickers';

export default function CreateRentBook() {
    const { register, handleSubmit, formState: { errors, isSubmitting },setValue } = useForm();
    
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const [studentList, setStudentList] = useState([]);

    //Student List
    useEffect(() => {
        let studentData = () => {
            studentService().then((response) => {
                setStudentList(response.data)
            })
        }
        studentData();
    }, [])

    //Book List
    useEffect(() => {
        let bookData = () => {
            getAllBooks().then((response) => {
                setBookList(response.data)
            })
        }
        bookData();
    },[])

    const handleReturnDate=(data)=>(
        setValue("returnDate", data)
    )

    const onSubmit = async (data) => {
        try {
            if (isSubmitting) return;
            const response = await createTransactionService(data);
            if (response.status === true) {
                toast.success(response.message, {
                    autoclose: 1000,
                })
                navigate("/Transaction")
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
                <h2>Add Transaction</h2>
                <Box sx={{ bgcolor: 'white', padding: '10px', marginTop: '15px', borderRadius: '20px' }}>
                    <Box component="form" sx={{ padding: `10px` }} onSubmit={handleSubmit(onSubmit)} >
                        <FormGroup sx={{ display: `flex`, flexDirection: `row` }}>
                            <SInputField>
                                <FormControl fullWidth>
                                    <InputLabel id="book">Book</InputLabel>
                                    <Select
                                        labelId="book"
                                        id="book-select"
                                        label="Book"
                                        {...register("bookId")}
                                    >
                                        {bookList.map((item, index) => (
                                            <MenuItem key={index} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </SInputField>

                            <SInputField>
                                <FormControl fullWidth>
                                    <InputLabel id="student">Student</InputLabel>
                                    <Select
                                        labelId="student"
                                        id="student-select"
                                        label="Student"
                                        {...register("studentId")}
                                    >
                                        {studentList.map((item, index) => (
                                            <MenuItem key={index} value={item.id}>
                                                {item.firstName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </SInputField>
                            <SInputField>
                                <DatePicker
                                    label='Return Date'
                                    disablePast
                                    format='YYYY-MM-DD'
                                    onChange={handleReturnDate}
                                />
                            </SInputField>
                            <SInputField>
                                <FormControl>
                                <TextField
                                    label="Remarks"
                                    {...register('remarks')}
                                />
                                </FormControl>
                            </SInputField>
                        </FormGroup>

                        <Stack direction="row" spacing={2} sx={{ margin: `20px 20px 20px 5px` }}>
                            <Link to={"/Transaction"}>
                                <Button variant="outlined" color='error' endIcon={<IoIosArrowRoundBack />}>
                                    Back
                                </Button>
                            </Link>
                            <Button type="submit" variant="contained" color="success" size='small'>
                                {isSubmitting?"Submitting":"Submit"}
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </>
    );
}