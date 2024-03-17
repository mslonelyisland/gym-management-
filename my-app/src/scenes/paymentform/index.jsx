import { Box, Button, TextField, InputLabel, FormControl } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import React, { useState, useEffect } from "react";

const UpdatePayment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSidebar, setIsSidebar] = useState(true);
    const [error, setError] = useState(null);
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [dor, setDor] = useState("");
    const [membertype, setMembertype] = useState("");
    const [plan, setPlan] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!id) return;
          const response = await axios.get(`http://localhost:3001/membership/${id}`);
          const { fullname, username, dor, membertype, plan } = response.data;
          setFullname(fullname);
          setUsername(username);
          setDor(dor);
          setMembertype(membertype);
          setPlan(plan);
        } catch (err) {
          setError(err); 
        }
      };
  
      fetchData();
    }, [id]);
  
    const handleUpdate = (e) => {
      e.preventDefault();
      axios
        .put(`http://localhost:3001/updatepayment/${id}`, {
          
          dor: dor,
          plan: plan,
        })
        .then((res) => {
          console.log(res);
          navigate("/membership");
        })
        .catch((err) => console.log(err));
    };
  return (
    <>
    <Box display="flex" minHeight="100vh"> 
    <Sidebar isSidebar={isSidebar} />
    <Box flexGrow={2} display="flex" flexDirection="column" > 
    <Topbar setIsSidebar={setIsSidebar} />
    <Box m="10px">
      <Header title="UPDATE" subtitle="Update Member Information" />
      <Formik
        initialValues={{
          fullname: fullname || "",
          username: username || "",
          dor: dor || "",
          membertype: membertype || "",
          plan: plan || "",
        }}
      >
        {({ handleBlur }) => (
          <form onSubmit={handleUpdate}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                onBlur={handleBlur}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date"
                value={dor}
                onBlur={handleBlur}
                onChange={(e) => setDor(e.target.value)}
                name="dor"
                sx={{ gridColumn: "span 2" }}
              />
              
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="membertype-label">Member Type</InputLabel>
                <Select
                  labelId="membertype-label"
                  value={membertype}
                  name="membertype"
                  onBlur={handleBlur}
                  onChange={(e) => setMembertype(e.target.value)}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Regular">Regular</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Plan"
                value={plan}
                onBlur={handleBlur}
                onChange={(e) => setPlan(e.target.value)}
                name="plan"
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {error && <div>Error: {error.message}</div>}
    </Box>
    </Box>
    </Box>
    </>
  );
};

export default UpdatePayment;
