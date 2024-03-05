import { Box } from "@mui/material";
import Header from "../../components/Header";
import Tabb from "../../components/Tabb/Tab";

const Team = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <Tabb />
      </Box>
    </Box>
  );
};

export default Team;
