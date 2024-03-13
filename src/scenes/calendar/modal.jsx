import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Typography, TextField, Box, Card, Button ,CardMedia} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';

// Define a type for the form data

import api from "../../api/api";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImageUpload = (props) => {
  const [files, setFiles] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState({ stared: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [imagePreview, setImagePreview] = useState();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(name, description);
  };

  // Function to handle image preview
  const handleImageChangee = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    console.log(e.target.files);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    if (!files) {
      setMsg("No file selected");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    setMsg("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, stared: true };
    });
    await api
      .post("/handleFileUpload", formData, {
        onUploadProgress: (ProgressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: ProgressEvent.progress * 100 };
          });
        },
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setMsg("Upload successfull");
        console.log(res);
      })
      .catch((err) => {
        setMsg("Upload failed");
        console.error(err);
      });
  };

  /* const [imagePreview, setImagePreview] = useState();
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
      }
      return true;
    },
  };
   onSubmit={handleSubmit(onSubmit)}
*/
  return (
    <Card
      sx={{
        width: 600,
        height: 500,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
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

        <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            component="label"
            onChange={handleImageChange}
          >
            Upload image
            <VisuallyHiddenInput type="file" multiple />
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center",  }}>
        {imagePreview && (
          <Box sx={{ my: 2 }}>
            <Card  sx={{ maxWidth:80,maxHeight:80 }}>
              <CardMedia component="img" image={imagePreview} alt="Preview" />
            </Card>
          </Box>
        )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ m: 1, width: 120 }}
              variant="contained"
              color="primary"
              onClick={props.onCancel}
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
              onClick={handleUpload}
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
