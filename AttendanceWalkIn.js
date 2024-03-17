const mongoose = require('mongoose');

// Attendance schema
const AttendanceWalkInSchema = new mongoose.Schema({
    walkinId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WalkIn', 
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
const AttendanceWalkInModel = mongoose.model('AttendanceWalkIn', AttendanceWalkInSchema, 'attendancewalkin');

module.exports = AttendanceWalkInModel;
