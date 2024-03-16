const mongoose = require('mongoose')

// For Registered Member , defining of schema
const RegisteredMemberSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    gender: String,
    contactnumber : String,
    dor: {
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
    membertype: String,
    plan: String,
    amount: Number,
    // checkInTimestamp: Date, // Stores the last check-in timestamp
    // checkOutTimestamp: Date, // Stores the last check-out timestamp (optional)
    // isCheckedIn: Boolean, // Indicates whether the member is currently checked in (optional)
})

// create the model
// registeredmember is the database collection , RegisteredMember is the name of the mongoose model 
const RegisteredMemberModel = mongoose.model("RegisteredMember", RegisteredMemberSchema, "registeredmember"); 
module.exports = RegisteredMemberModel;
