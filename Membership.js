const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import the Schema object from mongoose

const MembershipSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'RegisteredMember',
        required: true
    },
    membershipStatus: {
        type: String,
        required: true,
        enum: ['active', 'expired']
    }
}, { timestamps: true });

const MembershipModel = mongoose.model('Membership', MembershipSchema, 'membership');

module.exports = MembershipModel;

