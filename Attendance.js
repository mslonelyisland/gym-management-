

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
//         type: String, // Change the type to String
//         default: function() {
//             // Function to format the current time to HH:MM:SS format
//             const now = new Date();
//             const hours = now.getHours().toString().padStart(2, '0');
//             const minutes = now.getMinutes().toString().padStart(2, '0');
//             const seconds = now.getSeconds().toString().padStart(2, '0');
//             return `${hours}:${minutes}:${seconds}`;
//         }
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
        ref: 'RegisteredMember', // Reference to the RegisteredMember collection
        required: true
    },
    action: {
        type: String,
        enum: ['check in', 'check out'],
        required: true
    },
    timestamp: {
        type: String, // Change the type to String
        default: function() {
            // Function to format the current time and date
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
            const year = now.getFullYear();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }
    }
});

// Attendance model
const AttendanceModel = mongoose.model('Attendance', AttendanceSchema, 'attendance');

module.exports = AttendanceModel;
