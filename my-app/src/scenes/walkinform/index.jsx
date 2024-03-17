import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const AddWalkIn = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [ setError] = useState(null);
    const [isSidebar, setIsSidebar] = useState(true);

    const handleSubmit = async (values) => {
        try {
          // Make HTTP POST request to the server endpoint to register a member
          const response = await axios.post("http://localhost:3001/addwalkin", values);
          console.log(response.data); // Log the response data
          navigate("/attendancewalkin"); // Redirect to the registered member page after successful registration
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
      <Header title="ADD" subtitle="User" />

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
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date of Registration"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 2" }}
              />
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
                type="text"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.plan && !!errors.plan}
                helperText={touched.plan && errors.plan}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Session
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
    plan: yup.string().required(),
    date: yup.string().required(),
});
const initialValues = {
    fullname: '',
    username: '',
    plan: 'Session',
    date: ''
};

export default AddWalkIn;