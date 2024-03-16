const mongoose = require('mongoose')

// For gym equipments , defining of schema
const AdminSchema = new mongoose.Schema({
    email: String,
    password: String
})

// create the model
// gymequipments is the database collection , GymEquipments is the name of the mongoose model 
const AdminModel = mongoose.model("Admin", AdminSchema, "admin"); 
module.exports = AdminModel;
