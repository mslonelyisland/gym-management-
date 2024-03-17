import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const AddEquipment = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [ setError] = useState(null);
    const [isSidebar, setIsSidebar] = useState(true);

      const handleSubmit = async (values) => {
        try {
          // Make HTTP POST request to the server endpoint to register a member
          const response = await axios.post("http://localhost:3001/addgymequipments", values);
          console.log(response.data);
          navigate("/managegymequipments");
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
      <Header title="ADD" subtitle="New Equipments" />

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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
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
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date of Purchased"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.purchaseddate}
                name="purchaseddate"
                error={!!touched.purchaseddate && !!errors.purchaseddate}
                helperText={touched.purchaseddate && errors.purchaseddate}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add New Equipment
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
    name: yup.string().required(),
    description: yup.string().required(),
    quantity: yup.number().required(),
    amount: yup.number().required(),
    purchaseddate: yup.date().required(),
});
const initialValues = {
    name: '',
    description: '',
    quantity: '',
    amount: '', 
    purchaseddate: '',
};

export default AddEquipment;