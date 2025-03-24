import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { SInputField } from '../../../components/styles/Styles';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createCategoryService } from '../../../services/apiServices/category/categoryServices';
import { toast } from 'react-toastify';

export default function CreateCategory() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (isSubmitting) return;

      const response = await createCategoryService(data);
      if (response.status) {
        toast.success(response.message, { autoclose: 3000 });
        navigate("/Admin/Category");
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
        <Typography variant="h5">+ Add Category</Typography>
      </div>

      <div className="bg-white p-5 mt-2 rounded">
        <Box
          component="form"
          sx={{ padding: "10px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
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
          </FormGroup>

          <Stack
            direction="row"
            spacing={2}
            sx={{ margin: "20px 20px 20px 5px" }}
          >
            <Link to="/Admin/Category">
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
        </Box>
      </div>
    </div>
  );
}
