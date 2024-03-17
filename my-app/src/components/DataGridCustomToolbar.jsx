import React from "react";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          
          {/* <GridToolbarColumnsButton sx={{ color: colors.primary[100] }}/> */}
          {/* <GridToolbarDensitySelector sx={{ color: colors.primary[100] }}/> */}
          <GridToolbarExport sx={{ color: colors.primary[100] }}/>
        </FlexBetween>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;