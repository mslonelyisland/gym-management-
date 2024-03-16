import { Box, Button, TextField, InputLabel, FormControl } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
// import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";

const UpdateRegisteredMembers = () => {
  // eslint-disable-next-line
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [dor, setDor] = useState("");
  const [membertype, setMembertype] = useState("");
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return; // If id is not defined, exit early

        const response = await axios.get(`http://localhost:3001/member/${id}`);

        console.log("Fetched Data:", response.data);
        const {
          fullname,
          username,
          gender,
          contactnumber,
          dor,
          membertype,
          plan,
          amount,
        } = response.data;

        // Format the purchaseddate to match the required format (YYYY-MM-DD)
        // const formattedDate = new Date(purchaseddate).toISOString().split('T')[0];

        setFullname(fullname);
        setUsername(username);
        setGender(gender);
        setContactnumber(contactnumber);
        setDor(dor); // Set the formatted date in the state
        setMembertype(membertype);
        setPlan(plan);
        setAmount(amount);
      } catch (err) {
        console.log("Error fetching gym equipment:", err);
        setError(err); // Set error state to display error message
      }
    };

    fetchData(); // Call the function to fetch data
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("ID:", id); // Check if id is in the correct format
    axios
      .put(`http://localhost:3001/updatemember/` + id, {
        fullname: fullname,
        username: username,
        gender: gender,
        contactnumber: contactnumber,
        dor: dor,
        membertype: membertype,
        plan: plan,
        amount: amount,
      })
      .then((res) => {
        console.log(res);
        navigate("/manageregisteredmembers");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box m="20px">
      <Header title="UPDATE" subtitle="Update Member Information" />
      <Formik
        initialValues={{
          fullname: fullname || "",
          username: username || "",
          gender: gender || "",
          contactnumber: contactnumber || "",
          dor: dor || "",
          membertype: membertype || "",
          plan: plan || "",
          amount: amount || "",
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
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                value={gender}
                onBlur={handleBlur}
                onChange={(e) => setGender(e.target.value)}
                name="gender"
                sx={{ gridColumn: "span 4" }}
              /> */}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  name="gender"
                  onBlur={handleBlur}
                  onChange={(e) => setGender(e.target.value)}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number "
                value={contactnumber}
                onBlur={handleBlur}
                onChange={(e) => setContactnumber(e.target.value)}
                name="contactnumber"
                sx={{ gridColumn: "span 2" }}
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
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Member Type"
                value={membertype}
                onBlur={handleBlur}
                onChange={(e) => setMembertype(e.target.value)}
                name="membertype"
                sx={{ gridColumn: "span 4" }}
              /> */}
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
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Amount"
                value={amount}
                onBlur={handleBlur}
                onChange={(e) => setAmount(e.target.value)}
                name="amount"
                // error={!!touched.amount && !!errors.amount}
                // helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Add other fields similarly */}
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
  );
};

export default UpdateRegisteredMembers;
