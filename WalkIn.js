const mongoose = require('mongoose')

const WalkInSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    date: {
        type: String, 
        default: function() {
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
            const year = now.getFullYear();
            return `${day}/${month}/${year} `;
        }
    },
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

const WalkInModel = mongoose.model("WalkIn", WalkInSchema, "walkin"); 
module.exports = WalkInModel;
