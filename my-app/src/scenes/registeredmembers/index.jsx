import { Box,  useTheme, IconButton } from "@mui/material"; //Typography,
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from 'axios';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";


const RegisteredMembers = () => {
      // eslint-disable-next-line
    const { id: _ } = useParams();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/member");
          const dataWithIds = response.data.map(item => ({ ...item, id: item._id }));
          setData(dataWithIds);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };
      const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter((item) =>
        item.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "fullname", headerName: "Full Name", flex: 1 },
        { field: "username", headerName: "Username", flex: 1 },
        { field: "gender", headerName: "Gender", flex: 1 },
        { field: "contactnumber", headerName: "Contact Number", flex: 1 },
        { field: "dor", headerName: "Date of Registration", flex: 1 },
        { field: "membertype", headerName: "Member Type", flex: 1 },
        { field: "plan", headerName: "Plan", flex: 1 },
        { field: "amount", headerName: "Amount", flex: 1 },
    ];
  
    return (
        // can adjust m for the datatable 
      <Box m="20px"> 
        <Header title= "Registered Members" subtitle="All Gym Members" />
        <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderRadius="3px"
      >
        {/* SEARCH BAR */}
       <Box
          sx={{
            display: "flex",
            alignItems: "right",
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
             // can adjust m for the datatable 
          m="10px 0 0 0"
          height="75vh"
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
          <DataGrid rows={filteredData} columns={columns} />
        </Box>
        
      </Box>
    );
  };
  
  export default RegisteredMembers;