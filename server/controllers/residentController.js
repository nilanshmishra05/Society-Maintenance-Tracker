const Complaint = require("../models/Complaint");

exports.getResidentDashboard = async (req, res) => {
    try {

        const residentId = req.user._id;

        const total = await Complaint.countDocuments({
            resident: residentId
        });

        const open = await Complaint.countDocuments({
            resident: residentId,
            status: "Open"
        });

        const progress = await Complaint.countDocuments({
            resident: residentId,
            status: "In Progress"
        });

        const resolved = await Complaint.countDocuments({
            resident: residentId,
            status: "Resolved"
        });

        res.json({
            success: true,
            dashboard: {
                total,
                open,
                progress,
                resolved
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};