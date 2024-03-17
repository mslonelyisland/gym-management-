const mongoose = require('mongoose')

// For Registered Member , defining of schema
const RegisteredMemberSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    gender: String,
    contactnumber : String,
    dor: {
        type: String,
        default: function() {
            // Function to format the current time and date
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
            const year = now.getFullYear();
            return `${day}/${month}/${year} `;
        }
    },
    membertype: String,
    plan: String,
    amount: Number,
    checkInTimestamp: {
        type: String, 
        default: function() {
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
            const year = now.getFullYear();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }
    },
    checkOutTimestamp:{
        type: String, 
        default: function() {
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
            const year = now.getFullYear();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }
    },
    isCheckedIn: Boolean, 
})


// create the model
// registeredmember is the database collection , RegisteredMember is the name of the mongoose model 
const RegisteredMemberModel = mongoose.model("RegisteredMember", RegisteredMemberSchema, "registeredmember"); 
module.exports = RegisteredMemberModel;
