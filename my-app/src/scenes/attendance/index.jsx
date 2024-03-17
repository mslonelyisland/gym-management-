import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { Box, IconButton, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import axios from 'axios';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const Attendance = () => {
     // eslint-disable-next-line
    const { id: _ } = useParams();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isSidebar, setIsSidebar] = useState(true);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter((item) =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetchData();
    }, []);

    // eslint-disable-next-line
    const isMembershipActive = (registrationDateString) => {
        const [day, month, year] = registrationDateString.split('/').map(Number);
        const registrationDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        const expirationDate = new Date(registrationDate);
        expirationDate.setMonth(expirationDate.getMonth() + 1); // Add one month
    
        return currentDate <= expirationDate;
      };
    
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/member");
            // Assume the response now includes checkInTimestamp, checkOutTimestamp, and isCheckedIn fields
            setData(response.data.map(item => ({ ...item, id: item._id })));
        } catch (error) {
            console.error("Axios Error:", error);
        }
    };

    const handleCheckInOut = async (memberId, action) => {
        try {
            const time = new Date();
            const response = await axios.post(`http://localhost:3001/attendance/${action}`, { memberId, time: time.toISOString() });
            console.log("Check-in/out response:", response.data);

            // Update the state to reflect check-in/out changes including setting timestamp and status
            setData(prevData => prevData.map(item => {
                if (item.id === memberId) {
                    if (action === 'checkin') {
                        return { ...item, checkInTimestamp: time, isCheckedIn: true };
                    } else {
                        return { ...item, checkOutTimestamp: time, isCheckedIn: false };
                    }
                }
                return item;
            }));
        } catch (error) {
            console.error("Check-in/out Error:", error);
        }
    };

    const columns = [
        { field: "fullname", headerName: "Full Name", flex: 1 },
        { field: "username", headerName: "Username", flex: 1 },
        { field: "dor", headerName: "Date of Last Payment", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => (
                <Box>
                    {params.row.isCheckedIn ? (
                        <Button onClick={() => handleCheckInOut(params.row.id, 'checkout')} color="primary" variant="contained">
                            Check Out
                        </Button>
                    ) : (
                        <Button onClick={() => handleCheckInOut(params.row.id, 'checkin')} color="secondary" variant="contained">
                            Check In
                        </Button>
                    )}
                </Box>
            ),
        },
    ];


    return (
            <>
        <Box display="flex" minHeight="100vh"> 
        <Sidebar isSidebar={isSidebar} />
        <Box flexGrow={2} display="flex" flexDirection="column" > 
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="10px">
            <Header title="Attendance Tracker" subtitle="for Registered Members" />
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
                        alignItems: "right",
                        backgroundColor: colors.primary[400],
                    }}
                >
                    <InputBase
                        sx={{ ml: 2 }}
                        placeholder="Search by username"
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
                <DataGrid rows={filteredData} columns={columns} components={{ Toolbar: DataGridCustomToolbar }} />
            </Box>
        </Box>
        </Box>
    </Box>
    </>
    );
};

export default Attendance;
