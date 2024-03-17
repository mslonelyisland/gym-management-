const mongoose = require('mongoose')

// defining of schema
const AdminSchema = new mongoose.Schema({
    email: String,
    password: String
})

// create the model
const AdminModel = mongoose.model("Admin", AdminSchema, "admin"); 
module.exports = AdminModel;
