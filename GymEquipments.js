const mongoose = require('mongoose')

// For gym equipments , defining of schema
const GymEquipmentsSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    amount : Number,
    purchaseddate:{
        type: String, // Change the type to String
        default: function() {
            // Function to format the current time and date
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
            const year = now.getFullYear();
            return `${day}/${month}/${year} `;
        }
    },
})

// create the model
// gymequipments is the database collection , GymEquipments is the name of the mongoose model 
const GymEquipmentsModel = mongoose.model("GymEquipments", GymEquipmentsSchema, "gymequipments"); 
module.exports = GymEquipmentsModel;
