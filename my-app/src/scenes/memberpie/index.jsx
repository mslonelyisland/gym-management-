import { Box } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import MemberPieChart from "../../components/MemberPieChart";
import { useState } from "react";

const MemberPie = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <>
    <Box display="flex" minHeight="100vh"> 
    <Sidebar isSidebar={isSidebar} />
    <Box flexGrow={2} display="flex" flexDirection="column" > 
    <Topbar setIsSidebar={setIsSidebar} />
    <Box m="10px">
      <Header title="Member Type Chart" subtitle="Member Type Ratio" />
      {/* <Box height="75vh">
        <GenderPieChart />
      </Box> */}
      {/* <Header title="Demographics Pie Chart" subtitle="Member Type" /> */}
      <Box height="75vh">
        <MemberPieChart />
      </Box>
    </Box>
    </Box>
    </Box>
    </>
  );
};

export default MemberPie;
