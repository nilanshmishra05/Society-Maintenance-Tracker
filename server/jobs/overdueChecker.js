const Complaint = require("../models/Complaint");

const checkOverdueComplaints = async () => {

    try {

        const overdueDays = Number(process.env.OVERDUE_DAYS) || 5;

        const overdueDate = new Date();

        overdueDate.setDate(overdueDate.getDate() - overdueDays);

        const complaints = await Complaint.updateMany(
            {
                status: { $ne: "Resolved" },
                createdAt: { $lte: overdueDate },
                isOverdue: false
            },
            {
                $set: {
                    isOverdue: true
                }
            }
        );

        console.log(
            `Overdue Checker: ${complaints.modifiedCount} complaint(s) updated`
        );

    } catch (error) {

        console.log(error);

    }

};

module.exports = checkOverdueComplaints;