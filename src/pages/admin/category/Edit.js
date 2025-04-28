import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SInputField, TextArea } from "../../../components/styles/Styles";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  editCategoryService,
  categoryByIdService,
} from "../../../services/apiServices/category/categoryServices";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("This field is required!"),
});

export default function EditCategory() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryByIdService(id);
        if (response?.data) {
          const { name, semester, credits, description } = response.data;
          setValue("name", name);
        }
      } catch (error) {
        toast.error("Failed to load category data.");
      }
    };

    fetchCategory();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    try {
      const response = await editCategoryService(id, data);
      if (response.status) {
        toast.success(response.message, { autoClose: 1000 });
        navigate("/Admin/Category");
      } else {
        toast.error(response.message, { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Failed to update category.");
    }
  };

  return (
    <div>
      <div className="bg-white p-5 rounded">
        <Typography variant="h5">Update Category</Typography>
      </div>

      <div className="bg-white p-5 mt-2 rounded">
        <Box
          component="form"
          sx={{ padding: "10px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup sx={{ flexDirection: "row" }}>
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
          </FormGroup>
          <Stack direction="row" spacing={2} sx={{ margin: "20px 5px" }}>
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
            >
              Submit A
            </Button>
          </Stack>
        </Box>
      </div>
    </div>
  );
}
