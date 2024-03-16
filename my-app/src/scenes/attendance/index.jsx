import { Box, IconButton, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import axios from 'axios';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";

const Attendance = () => {
    // eslint-disable-next-line
    const { id: _ } = useParams();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = data.filter((item) =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
    );


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

    const handleCheckInOut = async (memberId, action) => {
        try {
            let time = '';
            if (action === 'checkin') {
                time = new Date().toLocaleTimeString();
            }
            const response = await axios.post(`http://localhost:3001/attendance/${action}`, { memberId, time });
            console.log("Check-in/out response:", response.data);
            
            // Update the state with the new check-in time for the corresponding row
            setData(prevData => prevData.map(item => {
                if (item.id === memberId) {
                    return { ...item, timestamp: action === 'checkin' ? time : '' };
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
        { field: "plan", headerName: "Plan", flex: 1 },
        // {
        //     field: "timestamp",
        //     headerName: "Check In Time",
        //     flex: 1,
        //     renderCell: (params) => (
        //         <span>{params.value}</span>
        //     ),
        // },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => (
                <Box>
                    {params.row.timestamp ? (
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
        <Box m="20px">
            <Header title="Registered Members" subtitle="All Gym Members" />
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

export default Attendance;
