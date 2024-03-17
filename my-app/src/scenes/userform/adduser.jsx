import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, InputLabel, FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { Select, MenuItem } from "@mui/material";

const AddUser = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [ setError] = useState(null);
    const [isSidebar, setIsSidebar] = useState(true);
    const handleSubmit = async (values) => {
        try {
          // Make HTTP POST request to the server endpoint to register a member
          const response = await axios.post("http://localhost:3001/registermember", values);
          console.log(response.data); // Log the response data
          navigate("/manageregisteredmembers"); // Redirect to the registered member page after successful registration
        } catch (err) {
          setError(err.message);
        }
      };
  return (
    <>
    <Box display="flex" minHeight="100vh"> 
    <Sidebar isSidebar={isSidebar} />
    <Box flexGrow={2} display="flex" flexDirection="column" > 
    <Topbar setIsSidebar={setIsSidebar} />
    <Box m="10px">
      <Header title="ADD USER" subtitle="Add New Member" />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
          
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullname}
                name="fullname"
                error={!!touched.fullname && !!errors.fullname}
                helperText={touched.fullname && errors.fullname}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    value={values.gender}
                    name="gender"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.gender && !!errors.gender}
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
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactnumber}
                name="contactnumber"
                error={!!touched.contactnumber && !!errors.contactnumber}
                helperText={touched.contactnumber && errors.contactnumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date of Registration"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dor}
                name="dor"
                error={!!touched.dor && !!errors.dor}
                helperText={touched.dor && errors.dor}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel>Member Type</InputLabel>
                <Select
                    value={values.membertype}
                    name="membertype"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.membertype && !!errors.membertype}
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.plan}
                name="plan"
                error={!!touched.plan && !!errors.plan}
                helperText={touched.plan && errors.plan}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </Box>
    </Box>
    </>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    fullname: yup.string().required(),
    username: yup.string().required(),
    gender: yup.string().required(),
    dor: yup.date().required(),
    membertype: yup.string().required(),
    plan: yup.string().required(),
    amount: yup.number().required(),
});
const initialValues = {
    fullname: '',
    username: '',
    contactnumber: '',
    gender: '', 
    dor: '',
    membertype: '',
    plan: '1 month',
    amount: '',
};

export default AddUser;