const Complaint = require("../models/Complaint");

exports.getDashboard = async (req, res) => {
    try {

        const totalComplaints = await Complaint.countDocuments();

        const openComplaints = await Complaint.countDocuments({
            status: "Open"
        });

        const progressComplaints = await Complaint.countDocuments({
            status: "In Progress"
        });

        const resolvedComplaints = await Complaint.countDocuments({
            status: "Resolved"
        });

        const highPriority = await Complaint.countDocuments({
            priority: "High"
        });

        const mediumPriority = await Complaint.countDocuments({
            priority: "Medium"
        });

        const lowPriority = await Complaint.countDocuments({
            priority: "Low"
        });

        res.json({
            success: true,
            dashboard: {
                totalComplaints,
                openComplaints,
                progressComplaints,
                resolvedComplaints,
                highPriority,
                mediumPriority,
                lowPriority
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};