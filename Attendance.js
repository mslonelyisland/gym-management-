// const mongoose = require('mongoose');

// // Attendance schema
// const AttendanceSchema = new mongoose.Schema({
//     memberId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'RegisteredMember', // Reference to the RegisteredMember collection
//         required: true
//     },
//     action: {
//         type: String,
//         enum: ['check in', 'check out'],
//         required: true
//     },
//     timestamp: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Attendance model
// const AttendanceModel = mongoose.model('Attendance', AttendanceSchema, 'attendance');

// module.exports = AttendanceModel;

const mongoose = require('mongoose');

// Attendance schema
const AttendanceSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RegisteredMember', 
        required: true
    },
    action: {
        type: String,
        enum: ['check in', 'check out'],
        required: true
    },
    timestamp: {
        type: String, 
        default: function() {
            // Function to format the current time to HH:MM:SS format
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }
    }
});

// Attendance model
const AttendanceModel = mongoose.model('Attendance', AttendanceSchema, 'attendance');

module.exports = AttendanceModel;
