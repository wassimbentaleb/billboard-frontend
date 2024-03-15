import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Typography,
  TextField,
  Box,
  Card,
  Button,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import * as yup from "yup";

import {  toast } from "react-toastify";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { tokens } from "../../theme";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import api from "../../api/api";
import { Formik } from "formik";

import { HandleAddPlan } from "../../services/service";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [progress, setProgress] = useState({ stared: false, pc: 0 });
  const [imagePreview, setImagePreview] = useState([]);

  const notify = () =>
    toast.success("Plan Created", {
      position: "bottom-left",
      autoClose: 3000,
      theme: "dark",
    });

  const startDate = new Date(props.selected.startStr);
  const endDate = new Date(props.selected.endStr);

  const initialValues = {
    Title: "",
    Description: "",
    startTime: startDate,
    endTime: endDate,
    imageUrls: [],
  };

  const checkoutSchema = yup.object().shape({
    Title: yup.string().required("required"),
    Description: yup.string().required("required"),
  });

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length == 0) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    console.log("Uploading...");
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
        console.log("Upload successfull");
        console.log(res);
        setImagePreview(res.data.media);
      })
      .catch((err) => {
        console.log("Upload failed");
        console.error(err);
      });
  };

  const handleFormSubmit = async (values) => {
    values.imageUrls = imagePreview;
    console.log(values);
    await HandleAddPlan(values);
    notify();
    props.onCancel();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Card
          sx={{
            width: 600,
            height: 680,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography
              sx={{ marginTop: "20px", textAlign: "center" }}
              variant="h2"
              component="h5"
            >
              Add new plan
            </Typography>

            <TextField
              sx={{ width: "100%", marginTop: "30px" }}
              label="Title"
              name="Title"
              helperText="Enter your title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Title}
              error={!!touched.Title && !!errors.Title}
            />
            <Box marginTop={"20px"}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker", "TimePicker"]}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <TimePicker
                      name="startTime"
                      label="Start Time"
                      value={values.startTime}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <TimePicker
                      name="endTime"
                      label="End Time"
                      value={values.endTime}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Box>
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <TextField
              sx={{ width: "100%", marginTop: "30px" }}
              label="Description"
              name="Description"
              helperText="Enter a description"
              rows={2}
              multiline
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Description}
              error={!!touched.Description && !!errors.Description}
            />
            <Card
              style={{
                overflowY: "scroll",
                height: "180px",
                backgroundColor: colors.blueAccent[900],
              }}
            >
              <ImageList sx={{ marginTop: "30px" }} cols={3}>
                {imagePreview.map((item, index) => (
                  <ImageListItem
                    key={index}
                    sx={{ width: "100px", height: "100px" }}
                  >
                    <img src={item} alt="Image" loading="lazy" />
                  </ImageListItem>
                ))}
              </ImageList>
            </Card>
            <Box
              sx={{ display: "flex", justifyContent: "center", margin: "20px" }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                component="label"
                onChange={handleUpload}
              >
                Add Image
                <VisuallyHiddenInput type="file" multiple />
              </Button>
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
                  variant="contained"
                  color="primary"
                  type="submit"
                  onBlur={handleBlur}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </form>
        </Card>
      )}
    </Formik>
  );
};

export default ImageUpload;
