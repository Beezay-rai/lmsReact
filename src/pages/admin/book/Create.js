import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { SInputField } from '../../../components/styles/Styles';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { createBook } from '../../../services/apiServices/book/bookServices';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { bookSchema } from '../../../schema/schema';
import { yupResolver } from "@hookform/resolvers/yup";
export default function CreateCategory() {
  const { register, handleSubmit, control,formState: { errors, isSubmitting } } = useForm({
    resolver:yupResolver(bookSchema)
  });
  const navigate = useNavigate();



  const handleDateChange = (date, onChange) => {
    const formattedDate = new Date(date).toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    onChange(formattedDate);
  };


  const onSubmit = async (data) => {
    try {
      if (isSubmitting) return;

      const response = await createBook(data);
      if (response.status) {
        toast.success(response.message, { autoclose: 3000 });
        navigate("/Admin/Book");
      } else {
        toast.error(response.message, { autoclose: 3000 });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage, { autoclose: 3000 });
    }
  };

  return (
    <div>
      <div className="bg-white p-5 rounded">
        <Typography variant="h5">+ Add Book</Typography>
      </div>

      <div className="bg-white p-5 mt-2 rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row">
            <SInputField>
              <FormControl>
                <TextField
                  required
                  label="Name"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  {...register("name", { required: "Name is required" })}
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
                    onChange={(date) => handleDateChange(date, onChange)}
                    label="Published Date"
                    disableFuture
                    format="YYYY/MM/DD"
                  />
                )}
              />
            </SInputField>
          </div>

          <Stack
            direction="row"
            spacing={2}
            sx={{ margin: "20px 20px 20px 5px" }}
          >
            <Link to="/Admin/Book">
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}
