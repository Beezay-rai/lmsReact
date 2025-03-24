import React from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormGroup, 
  FormLabel, 
  Stack, 
  TextField, 
  Typography 
} from '@mui/material';
import { SInputField, TextArea } from '../../../components/styles/Styles';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createCourseService } from '../../../services/apiServices/course/courseServices';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string("Cannot contain Number").required("This field is required!"),
  semester: yup
    .number()
    .min(2, "Value should be greater or equal to 2")
    .required("This field is required!")
    .typeError('A number is required'),
  credits: yup.string().required("This field is required!"),
  description: yup.string().required("Description is required!")
});

export default function CreateCourse() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    try {
      data.id = 0;
      const response = await createCourseService(data);

      if (response.status) {
        toast.success(response.message, { autoClose: 1000 });
        navigate("/Admin/Course");
      } else {
        toast.error(response.message, { autoClose: 1000 });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div>
        <div className="bg-white p-5 rounded">
          <Typography variant="h5">+ Add Course</Typography>
        </div>

        <div className="bg-white p-5 mt-2 rounded">
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormGroup sx={{ flexDirection: 'row' }}>
              <SInputField>
                <FormControl>
                  <TextField
                    label="Name"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </FormControl>
              </SInputField>

              <SInputField>
                <FormControl>
                  <TextField
                    label="Semester"
                    type="number"
                    {...register("semester")}
                    error={!!errors.semester}
                    helperText={errors.semester?.message}
                  />
                </FormControl>
              </SInputField>

              <SInputField>
                <FormControl>
                  <TextField
                    label="Credits"
                    {...register("credits")}
                    error={!!errors.credits}
                    helperText={errors.credits?.message}
                  />
                </FormControl>
              </SInputField>
            </FormGroup>

            <FormGroup>
              <SInputField>
                <FormControl>
                  <FormLabel className="m-1">Description</FormLabel>
                  <TextArea
                    rows={4}
                    cols={50}
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </FormControl>
              </SInputField>
            </FormGroup>

            <Stack direction="row" spacing={2} sx={{ margin: '20px 5px' }}>
              <Link to="/Admin/Course">
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
          </form>
        </div>
      </div>
    </>
  );
}
