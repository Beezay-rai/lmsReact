import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  Chip,
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { SInputField } from "../../../components/styles/Styles";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
import { useTheme } from "@mui/material/styles";
const schema = yup.object({
  bookName: yup.string().required("This field is required"),
  authorName: yup.string().required("This field is required"),
  isbn: yup.string().required("This field is required"),
  quantity: yup.number().required("This field is required"),
  publicationDate: yup.date().required("This field is required"),
});

export default function CreateBook() {
  const theme = useTheme();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  ///test

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, test, theme) {
    return {
      fontWeight:
        test.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const navigate = useNavigate();

  // Category List
  const [categoryList, setCategoryList] = useState([]);
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

  const [bookCategoryDetailList, setbookCategoryDetailList] = useState([]);

  const handleSelectChange = (event) => {

    setbookCategoryDetailList(event.target.value)
    // const myList = [];
    // const noice=[];
    // event.target.value.forEach((element) => {
    //   let abc = {
    //     id: 0,
    //     bookId: 0,
    //     categoryId: element,
    //   };    
    //   myList.push(element);

    //   let cat = categoryList.find(obj=>obj.id===element)
    //   noice.push(cat.categoryName)


    // });    
    // setbookCategoryDetailList(myList);
    // setTest(noice)
  };

  //Post Form
  const onSubmit = async (data) => {
    data = {
      ...data,
      bookCategoryDetailList: bookCategoryDetailList,
    };
    try {
      if (isSubmitting) return;
      const response = await createBookService(data);
      if (response.status === true) {
        toast.success(response.message, {
          autoclose: 1000,
        });
        navigate("/Admin/Book");
      } else if (response.status === false) {
        toast.error(response.message, {
          autoclose: 1000,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
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
                    {...register("bookName")}
                    error={errors?.bookName}
                    helperText={errors?.bookName?.message}
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
                  <InputLabel id="demo-multiple-chip-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={bookCategoryDetailList}
                    onChange={handleSelectChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Category"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((option) => (

                          <Chip key={option} label={option} />
                        )
                            

                        
                        )}
                      </Box>
                    )}
                  >
                    {categoryList.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.categoryName}
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
                  {errors?.publicationDate?.message}
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
