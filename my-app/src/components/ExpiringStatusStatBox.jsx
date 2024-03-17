import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import axios from "axios";

const ExpiringStatusStatBox = ({
  title,
  subtitle,
  icon,
  progress,
  increase,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expiringMembersCount, setExpiringMembersCount] = useState(0);

  useEffect(() => {
    const fetchExpiringMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/expiredmemberstatus"
        );
        setExpiringMembersCount(response.data.count);
      } catch (error) {
        console.error("Error fetching active members count:", error);
      }
    };
    fetchExpiringMembers();
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
        <Typography variant="h5" sx={{ color: colors.redAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.redAccent[500] }}
        >
          {increase}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ color: colors.redAccent[500] }}>
        Expiring Members: {expiringMembersCount}{" "}
        {/* Display the count of expired members */}
      </Typography>
    </Box>
  );
};

export default ExpiringStatusStatBox;
