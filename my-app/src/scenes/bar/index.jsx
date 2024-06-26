import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { useState } from "react";
const Bar = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <>
    <Box display="flex" minHeight="100vh"> 
    <Sidebar isSidebar={isSidebar} />
    <Box flexGrow={2} display="flex" flexDirection="column" > 
    <Topbar setIsSidebar={setIsSidebar} />
    <Box m="10px">
      <Header title="Monthly Earnings" subtitle="Total Earnings per month" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
    </Box>
    </Box>
    </>
  );
};

export default Bar;