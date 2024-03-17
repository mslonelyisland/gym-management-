import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";import { Box, IconButton, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const AttendanceWalkIn = () => {
  // eslint-disable-next-line
  const { id: _ } = useParams();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [isSidebar, setIsSidebar] = useState(true);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/walkinform");
  };

  // to delete a member and refresh
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deletewalkin/${id}`)
      .then((res) => {
        console.log(res);
        fetchData(); 
        navigate("/attendancewalkin"); 
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/walkin");
      //includes checkInTimestamp, checkOutTimestamp, and isCheckedIn fields
      setData(response.data.map((item) => ({ ...item, id: item._id })));
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const handleCheckInOut = async (walkinId, action) => {
    try {
      const time = new Date();
      const response = await axios.post(
        `http://localhost:3001/attendance_walkin/${action}`,
        { walkinId, time: time.toISOString() }
      );
      console.log("Check-in/out response:", response.data);

      // Update the state to reflect check-in/out changes including timestamp and status
      setData((prevData) =>
        prevData.map((item) => {
          if (item.id === walkinId) {
            if (action === "checkin") {
              return { ...item, checkInTimestamp: time, isCheckedIn: true };
            } else {
              return { ...item, checkOutTimestamp: time, isCheckedIn: false };
            }
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Check-in/out Error:", error);
    }
  };

  const columns = [
    { field: "fullname", headerName: "Full Name", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "plan", headerName: "Plan", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "action",
      headerName: "Attendance",
      flex: 1,
      renderCell: (params) => (
        <Box>
          {params.row.isCheckedIn ? (
            <Button
              onClick={() => handleCheckInOut(params.row.id, "checkout")}
              color="primary"
              variant="contained"
            >
              Check Out
            </Button>
          ) : (
            <Button
              onClick={() => handleCheckInOut(params.row.id, "checkin")}
              color="secondary"
              variant="contained"
            >
              Check In
            </Button>
          )}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton onClick={() => handleDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <>
    <Box display="flex" minHeight="100vh"> 
    <Sidebar isSidebar={isSidebar} />
    <Box flexGrow={2} display="flex" flexDirection="column" > 
    <Topbar setIsSidebar={setIsSidebar} />
    <Box m="10px">
      <Header title="Attendance Tracker " subtitle="for Walk In Guest" />
      <Box
        display="flex"
        alignItems="center"
        // justifyContent="space-between"
        borderRadius="3px"
        mb="-30px"
        mt="8px"
      >
        <Box>
          <IconButton onClick={handleAdd}>
            
            <AddIcon />
          </IconButton>
        </Box>
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
        <DataGrid rows={filteredData} columns={columns} 
components={{ Toolbar: DataGridCustomToolbar }}/>
      </Box>
    </Box>
     </Box>
     </Box>
     </>
  );
};

export default AttendanceWalkIn;
