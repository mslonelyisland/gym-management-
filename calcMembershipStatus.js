function calculateMembershipStatus(dor, plan) {
    const currentDate = new Date();
    const startDate = new Date(dor);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + parseInt(plan));
    return currentDate <= endDate ? 'active' : 'expired';
}

module.exports = {
    calculateMembershipStatus
};


// import using const { calculateMembershipStatus } = require('./membershipUtils');

