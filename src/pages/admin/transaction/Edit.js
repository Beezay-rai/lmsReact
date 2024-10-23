import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, FormControl, FormGroup, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { SInputField } from '../../../components/styles/Styles';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createTransactionService, editTransactionService, transactionByIdService } from '../../../Services/apiServices/transaction/transactionServices';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { bookService } from '../../../Services/apiServices/book/bookServices';
import { studentService } from '../../../Services/apiServices/student/studentService';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';




export default function EditTransaction() {

    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [apiData, setApiData] = useState([]);
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();

    //Fetch By Id
    const { id } = useParams();
    useEffect(() => {
        let fetchData = async () => {
            await transactionByIdService(id)
                .then((response) => {
                    setApiData(response.data);
                })
        }
        fetchData()
    }, [])

    //Student List
    useEffect(() => {
        if (apiData.id > 0) {
            let studentData = async () => {
                await studentService().then((response) => {
                    setStudentList(response.data)
                })
            }
            studentData();
        }

    }, [apiData])

    //Book List
    useEffect(() => {
        if (apiData.id > 0) {
            let bookData = async () => {
                await bookService().then((response) => {
                    setBookList(response.data)
                })
            }
            bookData();
        }
    }, [apiData])



    // to set the incoming value to the respective fields
    const [initialValue, setInitialValue] = useState({
        id:0,
        bookId: 0,
        studentId: 0,
        returnDate: "", 
        remarks: ""
    });

    useEffect(() => {
        setInitialValue({
            id:apiData?.id,
            bookId: apiData?.bookId || 0,
            studentId: apiData?.studentId || 0,
            returnDate: apiData?.returnDate || "", 
            remarks: apiData?.remarks || ""
        });
    }, [apiData]);
    
    useEffect(() => {
        // Use setValue to set values for each input field
        setValue("id",initialValue.id)
        setValue("bookId", initialValue.bookId);
        setValue("studentId", initialValue.studentId);
        setValue("returnDate", initialValue.returnDate);
        setValue("remarks", initialValue.remarks);
    }, [initialValue]);
 
    const handleReturnDate = (data) => (
        setValue("returnDate", data)

    )

    const onSubmit = async (data) => {
        try {
            if (isSubmitting) return;
            const response = await editTransactionService(data);
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
                <Typography variant='h4'>Edit </Typography>
                <Box sx={{ bgcolor: 'white', padding: '10px', marginTop: '15px', borderRadius: '20px' }}>
                    <Box component="form" sx={{ padding: `10px` }} onSubmit={handleSubmit(onSubmit)} >
                        <FormGroup sx={{ display: `flex`, flexDirection: `row` }}>
                            <SInputField>
                                <FormControl fullWidth>
                                    <TextField  sx={{display:'none'}} type='hidden' {...register("id")}/>
                                    <InputLabel id="book">Book</InputLabel>
                                    <Select
                                        labelId="book"
                                        id="book-select"
                                        label="Book"
                                        {...register("bookId")}
                                        value={initialValue.bookId} 
                                        onChange={(e)=>setInitialValue({...initialValue,bookId:e.target.value})}

                                    >
                                        {bookList.map((item, index) => (
                                            <MenuItem key={index} value={item.id} selected={item.id === apiData.bookId} >
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
                                        value={initialValue.studentId}
                                        onChange={(e)=>setInitialValue({...initialValue,studentId:e.target.value})}
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
                                    name="returnDate"
                                    onChange={handleReturnDate}
                                    value={initialValue?.returnDate ? dayjs(initialValue?.returnDate) : dayjs()}
                                />
                            </SInputField>
                            <SInputField>
                                <FormControl>
                                    <TextField
                                        label="Remarks"
                                        {...register('remarks')}
                                        value={initialValue.remarks}
                                        onChange={(e)=>setInitialValue({...initialValue,remarks:e.target.value})}

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
                                {isSubmitting ? "Submitting" : "Submit"}
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </>
    );
}