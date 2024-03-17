import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import axios from "axios";

const SessionStatusStatBox = ({
  title,
  subtitle,
  icon,
  progress,
  increase,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sessionMembersCount, setSessionMembersCount] = useState(0);

  useEffect(() => {
    const fetchActiveSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/activewalkincount"
        );
        setSessionMembersCount(response.data.count);
      } catch (error) {
        console.error("Error fetching active members count:", error);
      }
    };
    fetchActiveSession();
  }, []);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
        Active Walk In Guests: {sessionMembersCount}{" "}
        {/* Display the count of active members */}
      </Typography>
    </Box>
  );
};

export default SessionStatusStatBox;
