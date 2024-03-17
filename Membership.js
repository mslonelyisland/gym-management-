const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MembershipSchema = new Schema({
    fullname: {
        type: Schema.Types.ObjectId,
        ref: 'RegisteredMember',
        required: true
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'RegisteredMember',
        required: true
    },
    dor: {
        type: Schema.Types.ObjectId,
        ref: 'RegisteredMember',
        required: true
    },
    membershipStatus: String
})

const MembershipModel = mongoose.model('Membership', MembershipSchema, 'membership');

module.exports = MembershipModel;

