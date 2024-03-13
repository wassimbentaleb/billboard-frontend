import { Box, Card, useTheme } from "@mui/material";

import { Typography, TextField } from "@mui/material";

import { tokens } from "../../theme";
import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
];

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [svalue, setSvalue] = useState(dayjs("2022-04-17T15:30"));
  const [evalue, setEvalue] = useState(dayjs("2022-04-17T15:30"));
  return (
    <Card
      sx={{
        width: 600,
        height: 600,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form>
        <Typography
          sx={{ margin: "20px", textAlign: "center" }}
          variant="h2"
          component="h5"
        >
          Plan
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker", "TimePicker"]}>
              <TimePicker
                label="Start Time"
                value={svalue}
                onChange={(newValue) => setSvalue(newValue)}
              />
              <TimePicker
                label="End Time"
                value={evalue}
                onChange={(newValue) => setEvalue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <TextField
            sx={{ width: "100%", margin: "10px" }}
            label="Name"
            name="name"
            helperText="Enter your full name"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <ImageList sx={{ width: 500, height: 450 }}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={<span>by: {item.author}</span>}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </form>
    </Card>
  );
};

export default FAQ;
