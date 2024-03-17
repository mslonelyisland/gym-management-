import React, { useState, useEffect } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const ManageGymEquipments = () => {
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
      const response = await axios.get("http://localhost:3001/gymequipments");
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
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deletegymequipments/${id}`)
      .then((res) => {
        console.log(res);
        fetchData();
        navigate('/managegymequipments');
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = () => {
    navigate("/gymform");
  };

  const handleUpdate = (id) => {
    navigate(`/updategymequipments/${id}`);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "purchaseddate", headerName: "Purchased Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton onClick={() => handleUpdate(row.id)}>
              <EditIcon />
            </IconButton>
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
      <Header
        title="Manage Gym Equipments"
        subtitle="Update Gym Equipments"
      />
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
        <DataGrid rows={filteredData} columns={columns} components={{ Toolbar: DataGridCustomToolbar }} />
      </Box>
    </Box>
      </Box>
      </Box>
      </>
  );
};

export default ManageGymEquipments;
