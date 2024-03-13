import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Typography,
  TextField,
  Box,
  Card,
  Button,

} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from '@mui/material/styles';
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';

// Define a type for the form data

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImageUpload = (props) => {
  const [imagePreview, setImagePreview] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle the form data
    console.log(data);
  };

  // Function to handle image preview
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Validation rule for image files
  const imageValidation = {
    required: "An image file is required",
    validate: (fileList) => {
      if (fileList.length === 0) {
        return "An image file is required";
      }
      const file = fileList[0];
      /* const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        return 'Invalid file type. Please select an image (jpeg, png, gif, svg, jpg).';
      }*/
      return true;
    },
  };

  return (
    <Card
      sx={{
        width: 600,
        height: 500,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{ margin: "20px", textAlign: "center" }}
          variant="h5"
          component="h2"
        >
          Add new liste to list of images
        </Typography>

        <TextField
          sx={{ width: "100%", margin: "10px" }}
          label="Name"
          name="name"
          helperText="Enter your full name"
        />

        <TextField
          sx={{ width: "100%", margin: "10px" }}
          label="Description"
          name="description"
          helperText="Enter a description"
          multiline
        />

        <Box sx={{ display: "flex", justifyContent: "center" ,margin:"20px"}}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            component="label"
          >
            Upload image
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ m: 1, width: 120 }}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ m: 1, width: 120 }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
        </Box>
        {/* <Controller
          name="image"
          control={control}
          rules={imageValidation}
          defaultValue=""
          render={({ field }) => (
            <TextField
            label="Name"
            name="name"
            />,
            <TextField
              {...field}
              type="file"
              onChange={(e) => {
                field.onChange(e);
                handleImageChange(e);
              }}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.image}
              helperText={errors.image ? errors.image.message : ""}
            />
          )}
        />
        {imagePreview && (
          <Box sx={{ my: 2 }}>
            <Card  sx={{ maxWidth: 200 }}>
              <CardMedia component="img" image={imagePreview} alt="Preview" />
            </Card>
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          type="submit"
          sx={{ mt: 2 }}
        >
          Upload
        </Button>
        <Button onClick={props.onCancel}>
            Cancel
        </Button> */}
      </form>
    </Card>
  );
};

export default ImageUpload;
