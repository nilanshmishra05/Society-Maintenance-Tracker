const Complaint = require("../models/Complaint");
const ComplaintHistory = require("../models/ComplaintHistory");
const sendEmail = require("../utils/sendEmail");
const mongoose = require("mongoose");
// ======================================
// Resident Create Complaint
// ======================================

exports.createComplaint = async (req, res) => {

    try {

        const { category, description } = req.body;

        const complaint = await Complaint.create({

            resident: req.user._id,

            category,

            description,

            photo: req.file ? req.file.filename : ""

        });

        await ComplaintHistory.create({

            complaint: complaint._id,

            status: "Open",

            actor: req.user._id,

            note: "Complaint Created"

        });

        await sendEmail(
    req.user.email,
    "Complaint Registered Successfully",
    `
    <h2>Hello ${req.user.name}</h2>

    <p>Your complaint has been registered successfully.</p>

    <hr>

    <b>Category:</b> ${complaint.category}<br>

    <b>Description:</b> ${complaint.description}<br>

    <b>Status:</b> ${complaint.status}<br>

    <b>Priority:</b> ${complaint.priority}

    <hr>

    <p>Thank you.</p>
    `
);

        res.status(201).json({

            success: true,

            message: "Complaint Created Successfully",

            complaint

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// Resident View Own Complaints
// ======================================

exports.getMyComplaints = async (req, res) => {

    try {

        const complaints = await Complaint.find({

            resident: req.user._id

        }).sort({

            createdAt: -1

        });

        res.json({

            success: true,

            complaints

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// Complaint Details
// ======================================

exports.getComplaint = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Complaint ID",
            });
        }

        const complaint = await Complaint.findById(req.params.id)
            .populate("resident", "name email");

        const history = await ComplaintHistory.find({

            complaint: req.params.id

        }).populate("actor", "name role");

        res.json({

            success: true,

            complaint,

            history

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==============================
// Admin - Get All Complaints
// ==============================

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("resident", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Admin - Update Complaint Status
// ==============================

exports.updateComplaintStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Complaint ID",
      });
    }
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint Not Found",
      });
    }

    complaint.status = req.body.status;

    await complaint.save();

    await ComplaintHistory.create({
      complaint: complaint._id,
      status: complaint.status,
      actor: req.user._id,
      note: "Status Updated",
    });

    res.json({
      success: true,
      message: "Status Updated Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Admin - Update Priority
// ==============================

exports.updatePriority = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Complaint ID",
      });
    }
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint Not Found",
      });
    }

    complaint.priority = req.body.priority;

    await complaint.save();

    res.json({
      success: true,
      message: "Priority Updated Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Complaint History
// ==============================

exports.getComplaintHistory = async (req, res) => {

    try {

        const history = await ComplaintHistory.find({

            complaint: req.params.id

        })
        .populate("actor", "name email role")
        .sort({ createdAt: 1 });

        res.json({

            success: true,

            history

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
