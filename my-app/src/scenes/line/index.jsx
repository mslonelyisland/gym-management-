import { Box } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Line from "../../components/Line";
import { useState } from "react";

const LineChart = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
    <Box display="flex" minHeight="100vh"> 
    <Sidebar isSidebar={isSidebar} />
    <Box flexGrow={2} display="flex" flexDirection="column" > 
    <Topbar setIsSidebar={setIsSidebar} />

    <Box m="10px">
      <Header title="Attendance Trends" subtitle="Number of people checked in" />
      <Box height="75vh">
        <Line/>
      </Box>
    </Box>
    </Box>
    </Box>
    </>
  );
};

export default LineChart;