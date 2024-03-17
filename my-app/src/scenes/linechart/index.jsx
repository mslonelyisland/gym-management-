import { Box } from "@mui/material";
import Header from "../../components/Header";
import MonthlyLineChart from "../../components/MonthlyLineChart";

const MonthlyLine = () => {
  return (
    <Box m="20px">
      <Header title="MONTHLY SALES" subtitle="Total Earnings per month" />
      <Box height="75vh">
        <MonthlyLineChart />
      </Box>
    </Box>
  );
};

export default MonthlyLine;