const mongoose = require('mongoose')

// For Registered Member , defining of schema
const RegisteredMemberSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    gender: String,
    contactnumber : String,
    dor: Date,
    membertype: String,
    plan: String,
    amount: Number,
})

// create the model
// registeredmember is the database collection , RegisteredMember is the name of the mongoose model 
const RegisteredMemberModel = mongoose.model("RegisteredMember", RegisteredMemberSchema, "registeredmember"); 
module.exports = RegisteredMemberModel;
