const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../utils/upload");

const {
    createComplaint,
    getMyComplaints,
    getComplaint,
    getAllComplaints,
    updateComplaintStatus,
    updatePriority,
    getComplaintHistory
} = require("../controllers/ComplaintController");

// ==========================
// Resident Routes
// ==========================

// Create Complaint
router.post("/", protect, upload.single("photo"), createComplaint);

// View My Complaints
router.get("/my", protect, getMyComplaints);

router.get(
    "/:id/history",
    protect,
    getComplaintHistory
);


// View Complaint Details
router.get("/:id", protect, getComplaint);

// ==========================
// Admin Routes
// ==========================

// View All Complaints
router.get("/", protect, adminOnly, getAllComplaints);

// Update Complaint Status
router.put("/:id/status", protect, adminOnly, updateComplaintStatus);

// Update Complaint Priority
router.put("/:id/priority", protect, adminOnly, updatePriority);

module.exports = router;