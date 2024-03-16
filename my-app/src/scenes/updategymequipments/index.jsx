import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
// import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";

const UpdateGymEquipments = () => {
   // eslint-disable-next-line
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState([]);
  const [purchaseddate, setPurchasedDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return; // If id is not defined, exit early
  
        const response = await axios.get(
          `http://localhost:3001/gymequipments/${id}`
        );
  
        console.log("Fetched Data:", response.data);
        const { name, description, quantity, amount, purchaseddate } = response.data;
  
        // Format the purchaseddate to match the required format (YYYY-MM-DD)
        const formattedDate = new Date(purchaseddate).toISOString().split('T')[0];
  
        setName(name);
        setDescription(description);
        setQuantity(quantity);
        setAmount(amount);
        setPurchasedDate(formattedDate); // Set the formatted date in the state
      } catch (err) {
        console.log("Error fetching gym equipment:", err);
        setError(err); // Set error state to display error message
      }
    };
  
    fetchData(); // Call the function to fetch data
  }, [id]); 
  

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updategymequipments/` + id , {
      name: name,
      description: description,
      quantity: quantity,
      amount:amount,
      purchaseddate: purchaseddate,
    })
        .then(res => {
            console.log(res);
            navigate('/managegymequipments');
        })
        .catch(err => console.log(err));
};
  
  return (
    <Box m="20px">
      <Header title="UPDATE" subtitle="Update Gym Equipments" />
      <Formik
        initialValues={{
          name: name || "",
          description: description || "",
          quantity: quantity || "",
          amount: amount || "",
          purchaseddate: purchaseddate || "",
        }}
      >
        {({
          handleBlur,
        }) => (
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
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlur}
                // error={touched.name && Boolean(errors.name)}
                // helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                // error={!!touched.description && !!errors.description}
                // helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                value={quantity}
                onBlur={handleBlur}
                onChange={(e) => setQuantity(e.target.value)}
                name="quantity"
                sx={{ gridColumn: "span 4" }}
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
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
              fullWidth
              variant="filled"
              type="date"
              label="Date of Purchased"
              value={purchaseddate} // Use state variable here
              onBlur={handleBlur}
              onChange={(e) => setPurchasedDate(e.target.value)} // Update to use setPurchasedDate directly
              name="purchaseddate"
              sx={{ gridColumn: "span 4" }}
            />
              {/* Add other fields similarly */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button  type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {error && <div>Error: {error}</div>}
    </Box>
  );
};


export default UpdateGymEquipments;
