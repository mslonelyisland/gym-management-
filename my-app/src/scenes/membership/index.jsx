import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { Box, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const Membership = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/membership");
      const dataWithIdsAndStatus = response.data.map((item, _id) => {
        const isActive = isMembershipActive(item.dor); // Calculate active status
        return {
          ...item,
          _id: item._id,
          isActive: isActive ? "Active" : "Expired", // Add 'Active' or 'Expired' string
        };
      });
      setData(dataWithIdsAndStatus);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // function to check if membership is active
  const isMembershipActive = (registrationDateString) => {
    const [day, month, year] = registrationDateString.split("/").map(Number);
    const registrationDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    const expirationDate = new Date(registrationDate);
    expirationDate.setMonth(expirationDate.getMonth() + 1); // Add one month

    return currentDate <= expirationDate;
  };

  // search function
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = data.filter((item) =>
    item.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdate = (_id) => {
    navigate(`/paymentform/${_id}`);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID", flex: 0 },
    { field: "fullname", headerName: "Full Name", flex: 2 },
    { field: "dor", headerName: "Date of Last Payment", flex: 1 },
    { field: "membertype", headerName: "Member Type", flex: 1 },
    { field: "plan", headerName: "Plan", flex: 1 },
    {
      field: "membershipStatus",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => (
        <span style={{ color: value === "Active" ? "green" : "red" }}>
          {value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Button
              onClick={() => handleUpdate(row._id)}
              color="secondary"
              variant="contained"
            >
              Update Payment
            </Button>
          </Box>
        );
      },
    },
  ];


  console.log(filteredData);

  return (
    // can adjust m for the datatable
    <>
    <Box display="flex" minHeight="100vh"> 
    <Sidebar isSidebar={isSidebar} />
    <Box flexGrow={2} display="flex" flexDirection="column" > 
    <Topbar setIsSidebar={setIsSidebar} />
    <Box m="10px">
      <Header
        title="Track Membership Status"
        subtitle="Update Payment Details"
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderRadius="3px"
        mb="-30px"
        mt="8px"
      >
        {/* SEARCH BAR */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: colors.primary[400],
          }}
        >
          <InputBase
            sx={{ ml: 2 }}
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        m="10px 0 0 0"
        height="78vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ Toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
    </Box>
    </Box>
    </>
  );
};
export default Membership;
