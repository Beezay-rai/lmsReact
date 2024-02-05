import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { SInputField } from "../../../Components/styles/Styles";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SFormCover } from "../style/style";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  bookService,
  createBookService,
} from "../../../Services/apiServices/book/bookServices";
import { categoryService } from "../../../Services/apiServices/category/categoryServices";
const schema = yup.object({
  name: yup.string().required("This field is required"),
  authorName: yup.string().required("This field is required"),
  isbn: yup.string().required("This field is required"),
  quantity: yup.number().required("This field is required"),
  publicationDate: yup.date().required("This field is required"),
});

export default function CreateBook() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // Category List
  const [categoryList, setCategoryList] = useState([]);
  const [test, setTest] = useState([]);
  useEffect(() => {
    let categoryData = () => {
      categoryService().then((response) => {
        try {
          if (response.status === true) {
            setCategoryList(response.data);
          }
        } catch (error) {}
      });
    };
    categoryData();
  }, []);

  const handleSelectChange = (event) => {
    setTest(event.target.value);
  };
  const testing =  test.forEach((item)=>{
    return ({
      id:0,
      bookId:0,
      categoryId:item
    })
   })
  //Post Form
  const onSubmit = async (data) => {
    data = {
      ...data,
      testing
    }
    console.log(data,'response')
    // try {
    //   if (isSubmitting) return;
    //   const response = await createBookService(data);
    //   if (response.status === true) {
    //     toast.success(response.message, {
    //       autoclose: 1000,
    //     });
    //     navigate("/Book");
    //   } else if (response.status === false) {
    //     toast.error(response.message, {
    //       autoclose: 1000,
    //     });
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };
  return (
    <>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            flexDirection: `row`,
            borderRadius: "20px",
            justifyContent: "space-between",
            padding: "10px",
            alignItems: "flex-start",
            background: "white",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h5"> + Add Book</Typography>
        </Toolbar>
        <SFormCover>
          <Box
            component="form"
            sx={{ padding: `10px` }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormGroup sx={{ display: `flex`, flexDirection: `row` }}>
              <SInputField>
                <FormControl>
                  <TextField
                    label="Name"
                    {...register("name")}
                    error={errors?.name}
                    helperText={errors?.name?.message}
                  />
                </FormControl>
              </SInputField>

              <SInputField>
                <FormControl>
                  <TextField
                    label="Author Name"
                    {...register("authorName")}
                    error={errors?.authorName}
                    helperText={errors?.authorName?.message}
                  />
                </FormControl>
              </SInputField>
              <SInputField>
                <FormControl fullWidth>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category"
                    id="category-select"
                    label="Category"
                    multiple
                    value={test}
                    onChange={handleSelectChange}
                   
                  >
                    {categoryList.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SInputField>
              <SInputField>
                <FormControl>
                  <TextField
                    label="ISBN"
                    {...register("isbn")}
                    error={errors?.isbn}
                    helperText={errors?.isbn?.message}
                  />
                </FormControl>
              </SInputField>
              <SInputField>
                <FormControl>
                  <TextField
                    type="number"
                    label="Quantity"
                    {...register("quantity")}
                    error={errors?.quantity}
                    helperText={errors?.quantity?.message}
                  />
                </FormControl>
              </SInputField>

           

              <SInputField>
                <Controller
                  control={control}
                  name="publicationDate"
                  render={({ field: { onChange } }) => (
                    <DatePicker
                      onChange={(data) =>
                        onChange(
                          new Date(data).toLocaleDateString("fr-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        )
                      }
                      label="Published Date"
                      disableFuture
                      format="YYYY/MM/DD"
                    ></DatePicker>
                  )}
                />

                <FormHelperText error>
                  {errors?.birthDate?.message}{" "}
                </FormHelperText>
              </SInputField>
            </FormGroup>

            <Stack
              direction="row"
              spacing={2}
              sx={{ margin: `20px 20px 20px 5px` }}
            >
              <Link to={"/Admin/Book"}>
                <Button
                  variant="outlined"
                  color="error"
                  endIcon={<IoIosArrowRoundBack />}
                >
                  Back
                </Button>
              </Link>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="small"
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </SFormCover>
      </Container>
    </>
  );
}
