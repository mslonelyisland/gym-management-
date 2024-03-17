import { Box, useTheme, IconButton } from "@mui/material"; //Typography
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ManageWalkIn = () => {
  // eslint-disable-next-line
  const { id: _ } = useParams();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/walkin");
      const dataWithIds = response.data.map((item) => ({
        ...item,
        id: item._id,
      }));
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
        navigate('/managewalkin'); 
      })
      .catch((err) => console.log(err));
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "fullname", headerName: "Full Name", flex: 2 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "plan", headerName: "Plan", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "date", headerName: "Date", flex: 1},
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <IconButton onClick={() => handleUpdate(row.id)}>
              <EditIcon />
            </IconButton> */}
            <IconButton onClick={() => handleDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    // can adjust m for the datatable
    <>
    <Box display="flex" minHeight="100vh"> 
    <Sidebar isSidebar={isSidebar} />
    <Box flexGrow={2} display="flex" flexDirection="column" > 
    <Topbar setIsSidebar={setIsSidebar} />
    <Box m="10px">
      <Header
        title="Manage WalkIn Members"
        subtitle="Update and Delete Gym Members"
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderRadius="3px"
      >
        <Box>
          <IconButton onClick={handleAdd}>
            {/* <Typography variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}>
              Add User
            </Typography> */}
            <AddIcon />
          </IconButton>
        </Box>
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
    </Box>
    </Box>
    </>
  );
};

export default ManageWalkIn;
